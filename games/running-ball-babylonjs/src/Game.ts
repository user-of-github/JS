import {
  Engine,
  Scene,
  type Camera,
  Vector3,
  Color4,
  PointLight,
  MeshBuilder,
  StandardMaterial,
  type Mesh,
  Texture,
  ShadowGenerator,
     PhysicsImpostor,
  CannonJSPlugin,
  ArcRotateCamera,
  FreeCamera
}    from '@babylonjs/core';
//@ts-ignore
import * as CANNON from 'cannon';


export class Game {
  private static readonly ZeroVector = new Vector3(0, 0, 0);
  private static readonly SpeedOfMovingStraight = 5;
  private static readonly SpeedOfMovingAside = 2;
  private static readonly MoveVectorStraight = new Vector3(0, 0, Game.SpeedOfMovingStraight);
  private static readonly MoveVectorLeft = new Vector3(-Game.SpeedOfMovingAside, 0, 0);
  private static readonly MoveVectorRight = new Vector3(Game.SpeedOfMovingAside, 0, 0);

  private readonly engine: Engine;
  private readonly scene: Scene;
  private readonly camera: Camera;
  private readonly light: PointLight;
  private readonly platform: Mesh;
  private readonly ball: Mesh;
  private readonly shadowGenerator: ShadowGenerator;


  public constructor(private readonly canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas);
    this.scene = this.configureScene();
    this.light = this.configureLight();
    this.camera = this.configureCamera();
    this.shadowGenerator = new ShadowGenerator(1024, this.light);

    this.platform = this.configurePlatform();
    this.ball = this.configureBall();

    this.shrinkCanvas();
    window.addEventListener('resize', this.shrinkCanvas.bind(this));
    
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  public async init() {
    await this.initPhysics();
    this.initControls();
  }

  private async initPhysics() {
    this.scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, CANNON)
    );

    this.ball.physicsImpostor = new PhysicsImpostor(
      this.ball,
      PhysicsImpostor.SphereImpostor, {
        mass: 1,
        restitution: 2.5,
        friction: 5
      },
      this.scene
    );

    this.platform.physicsImpostor = new PhysicsImpostor(
      this.platform,
      PhysicsImpostor.BoxImpostor,
      { mass: 0 },
      this.scene
    );
  }

  public initControls() {
    window.addEventListener('keydown', (event) => {
      switch (true) {
        case event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a':
          this.pushBall(Game.MoveVectorLeft);
          break;
        case event.key === 'ArrowRight' || event.key.toLocaleLowerCase() === 'd':
          this.pushBall(Game.MoveVectorRight);
          break;
      }
    });


    window.addEventListener('keyup', (event) => {
      switch (true) {
        case event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a':
          this.stopBallSmoothly();
          break;
        case event.key === 'ArrowRight' || event.key.toLocaleLowerCase() === 'd':
          this.stopBallSmoothly();
          break;
      }
    });
  }

  private pushBall(impuls: Vector3): void {
    this.ball.physicsImpostor?.applyImpulse(
      impuls,
      this.ball.getAbsolutePosition()
    );
  }

  private stopBallSmoothly(): void {
    this.ball.physicsImpostor?.setLinearVelocity(Game.ZeroVector);
    this.ball.physicsImpostor?.setAngularVelocity(Game.ZeroVector);
  }

  private shrinkCanvas() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.engine.resize();
  }

  private configureScene(): Scene {
    const scene = new Scene(this.engine);
    scene.clearColor = new Color4(1.0, 0.898, 0.706); // Color4(1.0, 0.819, 0.863) / Color4(1.0, 0.898, 0.706) / Color4(0.902, 0.902, 0.980);
    return scene;
  }

  private configureLight(): PointLight {
    const light = new PointLight('light', new Vector3(10, 10, 10), this.scene);
    light.intensity = 0.3;
    return light;
  }

  private configureCamera(): Camera {
    const camera = new FreeCamera('camera', new Vector3(0, 10, -10), this.scene);
    camera.setTarget(Game.ZeroVector);

    return camera;
  }

  private configurePlatform(): Mesh {
    const platform = MeshBuilder.CreateBox('platform', {
      width: 8,
      height: 0.1,
      depth: 60000,
      wrap: true
    }, this.scene);

    const platformMaterial = new StandardMaterial('platform-material', this.scene);
    platformMaterial.emissiveTexture = new Texture('assets/textures/floor.png');
    platform.material = platformMaterial;

    platform.receiveShadows = true;

    return platform;
  }

  private configureBall(): Mesh {
    const ball = MeshBuilder.CreateSphere('ball', {
      diameter: 1
    }, this.scene);

    ball.position.y = 3.6; // to put on floor

    const ballMaterial = new StandardMaterial('ball-material', this.scene);
    ballMaterial.emissiveTexture = new Texture('assets/textures/football.png');
    ball.material = ballMaterial;

    this.shadowGenerator.getShadowMap()?.renderList?.push(ball);

    return ball;
  }
}