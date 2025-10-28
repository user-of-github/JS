import {
  Engine,
  Mesh,
  Scene,
  type Camera,
  Vector3,
  Color4,
  PointLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  ShadowGenerator,
  PhysicsImpostor,
  CannonJSPlugin,
  FreeCamera,
  type Material,
  Color3,
  type BoundingBox,
  SceneLoader,
  CubeTexture
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { WaterMaterial } from '@babylonjs/materials';
//@ts-ignore
import * as CANNON from 'cannon';
import { GameStatus, type GameHTMLElementsRefs, type Size3D } from './types';
import { notRepeatedRandomFreeSpacePositionGenerator } from './utils';
import { GameStorage, StoredDataType } from './GameStorage';
import { GameUiElementsManager } from './UiManager';

export class Game {
  private static readonly SinglePlatformSize: Size3D = Object.freeze({
    height: 0.6,
    depth: 6,
    width: 8
  });
  private static readonly SingleWallSize: Size3D = Object.freeze({
    height: Game.SinglePlatformSize.width / 3,
    depth: Game.SinglePlatformSize.width / 8,
    width: Game.SinglePlatformSize.width / 3 - 0.075
  });
  private static readonly ZeroVector = new Vector3(0, 0, 0);
  private static readonly StartSpeedOfMovingStraight = 6;
  private static readonly SpeedOfMovingAside = 2;
  private static readonly MoveVectorLeft = new Vector3(-Game.SpeedOfMovingAside, 0, 0);
  private static readonly MoveVectorRight = new Vector3(Game.SpeedOfMovingAside, 0, 0);
  private static readonly BallRadius = 0.75;
  private readonly MoveVectorStraight = new Vector3(0, 0, Game.StartSpeedOfMovingStraight);

  private readonly platformMaterial: Material;
  private readonly wallMaterial: Material;
  private readonly wallTouchedMaterial: Material;

  private readonly engine: Engine;
  private readonly scene: Scene;
  private readonly sky: Mesh;
  private readonly water: Mesh;
  private readonly ground: Mesh;
  private readonly camera: Camera;
  private readonly light: PointLight;
  private platforms: Mesh[] = [];
  private walls: Mesh[] = [];
  private ball: Mesh = {} as Mesh;
  private coins: Mesh[] = [];
  private readonly shadowGenerator: ShadowGenerator;
  private readonly storage = new GameStorage();
  private readonly uiElementsManager: GameUiElementsManager;
  private coinScore: number = 0;
  private bestScore: number = 0;
  private gameStatus = GameStatus.Playing;

  public constructor(private readonly elementsRefs: GameHTMLElementsRefs) {
    this.uiElementsManager = new GameUiElementsManager(elementsRefs);

    this.engine = new Engine(elementsRefs.canvas);
    this.scene = this.configureScene();
    this.light = this.configureLight();
    this.camera = this.configureCamera();
    this.sky = this.configureSky();
    [this.water, this.ground] = this.configureGround();
    void this.water;
    void this.ground;
    this.shadowGenerator = new ShadowGenerator(1024, this.light);

    [this.wallMaterial, this.wallTouchedMaterial] = this.createWallMaterial();
    this.platformMaterial = this.createPlatformMaterial();
  }

  public init(): void {
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize.bind(this));

    this.initControls();

    this.createGameObjects();

    this.coinScore = this.storage.loadScore(StoredDataType.CurrentScore);
    this.bestScore = this.storage.loadScore(StoredDataType.BestScore);
    this.uiElementsManager.updateScore(this.coinScore);

    this.gameStatus = GameStatus.Playing;

    this.scene.registerBeforeRender(() => {
      this.checkIfGameOver();
      this.checkCoinEarned();
    });

    this.engine.runRenderLoop(() => {
      this.updateCameraAndLight();
      this.scene.render();
    });
  }

  private createGameObjects(): void {
    this.platforms = this.configurePlatform();
    this.ball = this.configureBall();
    this.walls = this.createAllWalls();
  }

  private createCoin(position: Vector3) {
    // I see, that deprecated, but Babylon is so strange, that the fastest way to load this
    // is just to use deprecated SceneLoader sync import
    SceneLoader.ImportMesh(null, 'assets/models/', 'scene.gltf', this.scene, (m) => {
      const meshArray = m as unknown as Mesh[];
      const coin = meshArray[0];
      coin.scaling = new Vector3(0.05, 0.05, 0.05);
      coin.position = position;

      this.coins.push(coin);

      this.shadowGenerator.addShadowCaster(coin);
      coin.receiveShadows = true;
    });
  }

  private createPlatformMaterial(): Material {
    const platformMaterial = new StandardMaterial('platform-material', this.scene);
    platformMaterial.emissiveTexture = new Texture('assets/textures/floor.png');
    return platformMaterial;
  }

  private createWallMaterial(): [Material, Material] {
    const wallMaterial = new StandardMaterial('wall-material', this.scene);
    // wallMaterial.emissiveColor = new Color3(0.5, 0.5, 0.5);
    wallMaterial.emissiveTexture = new Texture('assets/textures/brick.jpg');

    const wallTouchedMaterial = new StandardMaterial('wall-material-touched', this.scene);
    wallTouchedMaterial.emissiveColor = new Color3(0.5, 0, 0);

    return [wallMaterial, wallTouchedMaterial];
  }

  private initControls() {
    for (const element of this.elementsRefs.restartButtons) {
      (element as HTMLButtonElement).onclick = this.restart.bind(this);
    }

    window.addEventListener('keydown', (event) => {
      if (this.gameStatus === GameStatus.GameOver && event.key === 'Enter') {
        this.restart();
        return;
      }

      if (this.ball.position.y < 2) {
        switch (true) {
          case event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a':
            this.pushBall(Game.MoveVectorLeft);
            break;
          case event.key === 'ArrowRight' || event.key.toLocaleLowerCase() === 'd':
            this.pushBall(Game.MoveVectorRight);
            break;
        }
      }
    });

    window.addEventListener('keyup', (event) => {
      if (this.gameStatus !== GameStatus.Playing) return;

      switch (true) {
        case event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a':
          this.stopBallMovingAside();
          break;
        case event.key === 'ArrowRight' || event.key.toLocaleLowerCase() === 'd':
          this.stopBallMovingAside();
          break;
      }
    });
  }

  private configureScene(): Scene {
    const scene = new Scene(this.engine);
    scene.clearColor = new Color4(1.0, 0.898, 0.706); // Color4(1.0, 0.819, 0.863) / Color4(1.0, 0.898, 0.706) / Color4(0.902, 0.902, 0.980);

    scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin(true, 10, CANNON));

    scene.createDefaultEnvironment({
      createSkybox: false,
      cameraContrast: 2.5,
      cameraExposure: 1
    });

    return scene;
  }

  private configureLight(): PointLight {
    const light = new PointLight('light', new Vector3(10, 10, 10), this.scene);
    light.intensity = 0.4;
    return light;
  }

  private configureCamera(): Camera {
    const camera = new FreeCamera('camera', new Vector3(-2, 5, -10), this.scene);
    camera.setTarget(Game.ZeroVector);
    ///camera.attachControl(this.canvas)

    return camera;
  }

  private configurePlatform(): Mesh[] {
    const platformDepth = 6;
    const platformsCount = 50;

    const generatePlatform = (z: number): Mesh => {
      const platform = MeshBuilder.CreateBox(
        'platform',
        {
          ...Game.SinglePlatformSize,
          wrap: true
        },
        this.scene
      );

      platform.material = this.platformMaterial;

      platform.receiveShadows = true;

      platform.physicsImpostor = new PhysicsImpostor(platform, PhysicsImpostor.BoxImpostor, { mass: 0 }, this.scene);

      platform.position.z = z;

      return platform;
    };

    for (let counter = 0; counter <= platformsCount; ++counter) {
      generatePlatform(counter * platformDepth);
    }

    return [];
  }

  private configureBall(): Mesh {
    const ball = MeshBuilder.CreateSphere(
      'ball',
      {
        diameter: Game.BallRadius * 2
      },
      this.scene
    );

    ball.position.y = 7.5;

    const ballMaterial = new StandardMaterial('ball-material', this.scene);
    ballMaterial.emissiveTexture = new Texture('assets/textures/football.png');
    ball.material = ballMaterial;

    this.shadowGenerator.getShadowMap()?.renderList?.push(ball);

    ball.physicsImpostor = new PhysicsImpostor(
      ball,
      PhysicsImpostor.SphereImpostor,
      {
        mass: 1,
        restitution: 2.5,
        friction: 5
      },
      this.scene
    );

    return ball;
  }

  private configureSky() {
    const skyBox = MeshBuilder.CreateBox('skyBox', { size: 1000 }, this.scene);
    const skyBoxMaterial = new StandardMaterial('skyBox', this.scene);
    skyBoxMaterial.reflectionTexture = new CubeTexture(
      '/assets/environments/TropicalSunnyDay/TropicalSunnyDay',
      this.scene
    );
    skyBoxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyBoxMaterial.backFaceCulling = false;
    skyBox.material = skyBoxMaterial;
    return skyBox;
  }

  private configureGround(): [Mesh, Mesh] {
    const water = MeshBuilder.CreateGround('water', { width: 512, height: 512 }, this.scene);
    water.position = new Vector3(0, -5, 0);
    const waterMaterial = new WaterMaterial('water', this.scene);
    waterMaterial.bumpTexture = new Texture('/assets/environments/waterbump.png', this.scene);
    waterMaterial.addToRenderList(this.sky);
    water.material = waterMaterial;

    const ground = MeshBuilder.CreateGround('ground', { width: 512, height: 512 }, this.scene);
    ground.position = new Vector3(0, -10, 0);
    const groundMaterial = new StandardMaterial('ground', this.scene);
    groundMaterial.emissiveTexture = new Texture('/assets/environments/ground.jpg', this.scene);
    ground.material = groundMaterial;

    waterMaterial.addToRenderList(this.sky);
    waterMaterial.addToRenderList(ground);

    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, this.scene);

    return [water, ground];
  }

  private createWall(x: number, z: number): Mesh {
    const wall = MeshBuilder.CreateBox(
      `wall (${x};${z})`,
      {
        ...Game.SingleWallSize
      },
      this.scene
    );

    wall.position = new Vector3(x, Game.SinglePlatformSize.height, 3 + z);

    wall.material = this.wallMaterial;

    wall.physicsImpostor = new PhysicsImpostor(wall, PhysicsImpostor.BoxImpostor, { mass: 0 }, this.scene);
    this.shadowGenerator.getShadowMap()?.renderList?.push(wall);
    wall.receiveShadows = true;

    return wall;
  }

  private createWallRow(z: number, skipPartIndex: number): Mesh[] {
    const oneThirdOfWidth = Game.SinglePlatformSize.width / 3;
    const walls: Mesh[] = [];
    for (let counter = 0; counter < 3; ++counter) {
      if (counter === skipPartIndex) {
        // here probably must be coin with probability of ~70%
        if (Math.random() < 0.6) {
          this.createCoin(new Vector3(counter * oneThirdOfWidth - oneThirdOfWidth, 1, 3 + z));
        }
        continue;
      }

      const wall = this.createWall(counter * oneThirdOfWidth - oneThirdOfWidth, z);
      walls.push(wall);
    }

    return walls;
  }

  private createAllWalls(): Mesh[] {
    const notRepeatedFreeSpaceGenerator = notRepeatedRandomFreeSpacePositionGenerator(3);
    const offset = 7;
    const rowsCount = 20;

    const walls = new Array<Mesh>(rowsCount);

    for (let counter = 0; counter < 20; ++counter) {
      const skippingPart = notRepeatedFreeSpaceGenerator();
      const row = this.createWallRow(counter * (Game.SingleWallSize.depth * 10) + offset, skippingPart);
      walls.push(...row);
    }

    return walls;
  }

  private checkIfGameOver(): void {
    if (this.ball.getAbsolutePosition().y <= 0) {
      this.gameOver();
    }

    const check = (spherePos: Vector3, box: BoundingBox): boolean => {
      const min = box.minimumWorld;
      const max = box.maximumWorld;

      const closestX = Math.max(min.x, Math.min(spherePos.x, max.x));
      const closestY = Math.max(min.y, Math.min(spherePos.y, max.y));
      const closestZ = Math.max(min.z, Math.min(spherePos.z, max.z));

      const distance = Vector3.Distance(spherePos, new Vector3(closestX, closestY, closestZ));

      return distance < Game.BallRadius;
    };

    for (let i = 0; i < this.walls.length; ++i) {
      if (this.walls[i] && this.ball) {
        const ballPos = this.ball.position;
        const wallBounds = this.walls[i].getBoundingInfo().boundingBox;

        if (check(ballPos, wallBounds)) {
          this.walls[i].material = this.wallTouchedMaterial;
          this.gameOver();
          break;
        }
      }
    }
  }

  private pushBall(impuls: Vector3): void {
    this.ball.physicsImpostor?.applyImpulse(impuls, this.ball.getAbsolutePosition());
  }

  private stopBallMovingAside(): void {
    this.MoveVectorStraight.z += this.MoveVectorStraight.z * 0.01;
    this.ball.physicsImpostor?.setLinearVelocity(this.MoveVectorStraight);
    this.ball.physicsImpostor?.setAngularVelocity(Game.ZeroVector);
  }

  private updateCameraAndLight(): void {
    this.camera.position.z = this.ball.getAbsolutePosition().z - 12;
    this.camera.position.y = this.ball.getAbsolutePosition().y + 6;
    //this.camera.setTarget(this.ball.getAbsolutePosition());

    this.light.position.z = this.ball.getAbsolutePosition().z + 10;
    this.light.position.y = this.ball.getAbsolutePosition().y + 10;
    this.light.position.z = this.ball.getAbsolutePosition().z + 10;
  }

  private onWindowResize() {
    this.uiElementsManager.shrinkCanvas();
    this.engine.resize();
  }

  private checkCoinEarned(): void {
    for (let i = 0; i < this.coins.length; ++i) {
      if (this.ball.intersectsMesh(this.coins[i], true)) {
        ++this.coinScore;
        this.uiElementsManager.updateScore(this.coinScore);
        this.scene.removeMesh(this.coins[i]);
        this.coins[i].dispose();
        this.coins.splice(i, 1);
        this.storage.saveScore(StoredDataType.CurrentScore, this.coinScore);
        break;
      }
    }
  }

  private gameOver(): void {
    this.gameStatus = GameStatus.GameOver;

    const bestScore = this.storage.loadScore(StoredDataType.BestScore);

    if (this.coinScore > bestScore) {
      this.storage.saveScore(StoredDataType.BestScore, this.coinScore);
      this.bestScore = this.coinScore;
    }

    this.storage.saveScore(StoredDataType.CurrentScore, 0);

    this.uiElementsManager.hideUiElements();
    this.uiElementsManager.showGameOverScreen(this.coinScore, this.bestScore);
  }

  private resetGameObjects() {
    this.platforms.forEach((platform) => {
      this.scene.removeMesh(platform);
      platform.dispose();
    });

    this.coins.forEach((coin) => {
      this.scene.removeMesh(coin);
      coin.dispose();
    });

    this.walls.forEach((wall) => {
      this.scene.removeMesh(wall);
      wall.dispose();
    });

    this.ball.dispose();
    this.scene.removeMesh(this.ball);

    this.coinScore = 0;
    this.uiElementsManager.updateScore(this.coinScore);
    this.storage.saveScore(StoredDataType.CurrentScore, 0);
  }

  private restart() {
    this.gameStatus = GameStatus.Playing;
    this.resetGameObjects();
    this.createGameObjects();
    this.uiElementsManager.hideGameOverScreen();
    this.uiElementsManager.showUiElements();
  }
}
