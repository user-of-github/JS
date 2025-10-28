import {
  Engine,
  Scene,
  Mesh,
  Camera,
  PointLight,
  CannonJSPlugin,
  Color4,
  FreeCamera,
  Vector3,
  ShadowGenerator,
  CubeTexture,
  MeshBuilder,
  PhysicsImpostor,
  StandardMaterial,
  Texture,
  type Material,
  Color3,
  SceneLoader,
  ArcRotateCamera
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
//@ts-ignore
import * as CANNON from 'cannon';
import { WaterMaterial } from '@babylonjs/materials';
import { GameConstants } from '../constants';
import { isMobileDevice, notRepeatedRandomFreeSpacePositionGenerator } from '../utils';

export class GameSceneService {
  public readonly platformMaterial: Material;
  public readonly wallMaterial: Material;
  public readonly wallTouchedMaterial: Material;
  public readonly ballMaterial: Material;

  private readonly engine: Engine;
  private readonly scene: Scene;
  private readonly sky: Mesh;
  private readonly water: Mesh;
  private readonly ground: Mesh;
  public readonly camera: Camera;
  public readonly light: PointLight;
  public readonly shadowGenerator: ShadowGenerator;

  private readonly isMobile = isMobileDevice();

  private platforms: Mesh[] = [];
  private _walls: Mesh[] = [];
  private _ball: Mesh = {} as Mesh;
  private _coins: Mesh[] = [];

  public constructor(canvasRef: HTMLCanvasElement) {
    this.engine = new Engine(canvasRef);
    this.scene = this.configureScene();
    this.light = this.configureLight();
    this.camera = this.configureCamera();
    this.sky = this.configureSky();
    [this.water, this.ground] = this.configureGround();
    void this.water;
    void this.ground;
    this.shadowGenerator = new ShadowGenerator(1024, this.light);

    [this.wallMaterial, this.wallTouchedMaterial, this.platformMaterial, this.ballMaterial] = this.configureMaterials();
  }

  public runRenderLoop(): void {
    this.engine.runRenderLoop(() => {
      this.updateCameraAndLight();
      this.scene.render();
    });
  }

  public setBeforeRenderCallback(callback: VoidFunction) {
    this.scene.registerBeforeRender(callback);
  }

  public createGameObjects(): void {
    this.platforms = this.configurePlatform();
    this._ball = this.configureBall();
    this._walls = this.createAllWalls();
  }

  public resetGameObjects() {
    [this.platforms, this._coins, this._walls].forEach((collection) => {
      collection.forEach((item) => {
        this.scene.removeMesh(item);
        item.dispose();
      });

      collection.length = 0;
    });

    this._ball.dispose();
    this.scene.removeMesh(this._ball);
  }

  public get ball(): Readonly<Mesh> {
    return this._ball;
  }

  public get walls(): ReadonlyArray<Mesh> {
    return this._walls;
  }

  public get coins(): ReadonlyArray<Mesh> {
    return this._coins;
  }

  public removeCoinByIndex(index: number): void {
    this.scene.removeMesh(this._coins[index]);
    this._coins[index].dispose();
    this._coins.splice(index, 1);
  }

  public resizeEngine(): void {
    this.engine.resize();
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
    let camera: Camera;

    if (this.isMobile) {
      camera = new ArcRotateCamera("arcCamera", Math.PI / 4, Math.PI / 3, 9, new Vector3(0, 0, 6), this.scene);
      camera.position = new Vector3(0, 7, -15)
    } else {
      camera = new FreeCamera('camera', new Vector3(-2, 5, -10), this.scene);
      (camera as FreeCamera).setTarget(GameConstants.ZeroVector);
    }

    return camera;
  }

  private updateCameraAndLight(): void {
    const ballPosition = this._ball.getAbsolutePosition();

    if (this.isMobile) {
      (this.camera as ArcRotateCamera).target.z = ballPosition.z + 5;
      (this.camera as ArcRotateCamera).target.y = ballPosition.y;
      this.camera.position.z = ballPosition.z - 20;
      this.camera.position.y = ballPosition.y + 7;
    } else {
      this.camera.position.z = this._ball.getAbsolutePosition().z - 12;
      this.camera.position.y = this._ball.getAbsolutePosition().y + 6;
    }

    this.light.position.z = ballPosition.z + 10;
    this.light.position.y = ballPosition.y + 10;
    this.light.position.z = ballPosition.z + 10;
  }

  private configureSky() {
    const skyBox = MeshBuilder.CreateBox('skyBox', { size: 1000 }, this.scene);
    const skyBoxMaterial = new StandardMaterial('skyBox', this.scene);
    skyBoxMaterial.reflectionTexture = new CubeTexture('/assets/environments/TropicalSunnyDay/TropicalSunnyDay', this.scene);
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

  private configureMaterials(): [Material, Material, Material, Material] {
    const wallMaterial = new StandardMaterial('wall-material', this.scene);
    // wallMaterial.emissiveColor = new Color3(0.5, 0.5, 0.5);
    wallMaterial.emissiveTexture = new Texture('assets/textures/brick.jpg');

    const wallTouchedMaterial = new StandardMaterial('wall-material-touched', this.scene);
    wallTouchedMaterial.emissiveColor = new Color3(0.5, 0, 0);

    const platformMaterial = new StandardMaterial('platform-material', this.scene);
    platformMaterial.emissiveTexture = new Texture('assets/textures/floor.png');

    const ballMaterial = new StandardMaterial('ball-material', this.scene);
    ballMaterial.emissiveTexture = new Texture('assets/textures/football.png');

    return [wallMaterial, wallTouchedMaterial, platformMaterial, ballMaterial];
  }

  private createCoin(position: Vector3) {
    // I see, that deprecated, but Babylon is so strange, that the fastest way to load this
    // is just to use deprecated SceneLoader sync import
    SceneLoader.ImportMesh(null, 'assets/models/', 'scene.gltf', this.scene, (m) => {
      const meshArray = m as unknown as Mesh[];
      const coin = meshArray[0];
      coin.scaling = new Vector3(0.05, 0.05, 0.05);
      coin.position = position;

      this._coins.push(coin);

      this.shadowGenerator.addShadowCaster(coin);
      coin.receiveShadows = true;
    });
  }

  private configurePlatform(): Mesh[] {
    const platformDepth = 6;
    const platformsCount = 50;

    const generatePlatform = (z: number): Mesh => {
      const platform = MeshBuilder.CreateBox(
        'platform',
        {
          ...GameConstants.SinglePlatformSize,
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
        diameter: GameConstants.BallRadius * 2
      },
      this.scene
    );

    ball.position.y = 7.5;
    ball.material = this.ballMaterial;

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

  private createWall(x: number, z: number): Mesh {
    const wall = MeshBuilder.CreateBox(
      `wall (${x};${z})`,
      {
        ...GameConstants.SingleWallSize
      },
      this.scene
    );

    wall.position = new Vector3(x, GameConstants.SinglePlatformSize.height, 3 + z);

    wall.material = this.wallMaterial;

    wall.physicsImpostor = new PhysicsImpostor(wall, PhysicsImpostor.BoxImpostor, { mass: 0 }, this.scene);
    this.shadowGenerator.getShadowMap()?.renderList?.push(wall);
    wall.receiveShadows = true;

    return wall;
  }

  private createWallRow(z: number, skipPartIndex: number): Mesh[] {
    const oneThirdOfWidth = GameConstants.SinglePlatformSize.width / 3;
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
      const row = this.createWallRow(counter * (GameConstants.SingleWallSize.depth * 10) + offset, skippingPart);
      walls.push(...row);
    }

    return walls;
  }
}
