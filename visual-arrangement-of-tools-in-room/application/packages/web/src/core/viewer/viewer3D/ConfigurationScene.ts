import * as TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Converter } from '@/core/services/Converter';
import type { ISharableConfigurationScene } from '@/core/viewer/viewer3D/ConfigurationScene.i';
import { getNodeCenter } from '../utils/utilsThree';
import { DirectionalLight } from './sceneEntites/lights/DirectionalLight';
import { HemisphereLight } from './sceneEntites/lights/HemisphereLight';

export const rootNodeName = 'VisualArrangementOfObjectsConfigurationSceneRootNode';

export class ConfigurationScene implements ISharableConfigurationScene {
  private readonly DEBUG: boolean = false;

  private static readonly RENDERER_BACKGROUND_COLOR = 0xececec; //0xd1d1d1;
  private static readonly backgroundColor = new THREE.Color(0xf9f9f9);

  public _canvasElement!: HTMLCanvasElement;
  private canvasContainerElement!: HTMLDivElement;

  public scene!: THREE.Scene;
  private rootNode!: THREE.Object3D;

  private _renderer!: THREE.WebGLRenderer;
  private _orbitControls!: OrbitControls;
  private lookAt = new THREE.Vector3(0, 0, 0);
  private _camera!: THREE.PerspectiveCamera;

  public constructor() {}

  public get camera(): Readonly<THREE.Camera> {
    return this._camera;
  }

  public get canvas(): Readonly<HTMLCanvasElement> {
    return this._canvasElement;
  }

  public get renderer(): Readonly<THREE.WebGLRenderer> {
    return this._renderer;
  }

  public get orbitControls(): OrbitControls {
    return this._orbitControls;
  }

  public initWithCanvas(canvasHtmlElement: HTMLCanvasElement, canvasContainer: HTMLDivElement): void {
    this._canvasElement = canvasHtmlElement;
    this.canvasContainerElement = canvasContainer; // @TODO: no need to store them actually ?
    this.init();
  }

  private init(): void {
    this.initScene();
    this.initRenderer();

    this.initCamera();
    this.initControls();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = ConfigurationScene.backgroundColor;

    this.rootNode = new THREE.Group();
    this.rootNode.name = rootNodeName;
    this.rootNode.position.y = 0;
    this.scene.add(this.rootNode);

    if (this.DEBUG) {
      const axesHelper = new THREE.AxesHelper(1);
      this.scene.add(axesHelper);

      // @ts-ignore
      window.scene = this.scene;
    }

    const hemisphereLight = new HemisphereLight();
    const directionalLight = new DirectionalLight();

    this.scene.add(hemisphereLight);
    this.scene.add(directionalLight);
  }

  private initRenderer(): void {
    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvasElement,
      preserveDrawingBuffer: true
    });

    this._renderer.setClearColor(ConfigurationScene.RENDERER_BACKGROUND_COLOR);
    this._renderer.debug.checkShaderErrors = window.location.hostname === 'localhost';
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // this.renderer.shadowMap.autoUpdate = false;
    // this.renderer.shadowMap.needsUpdate = true;
    this._renderer.toneMapping = THREE.LinearToneMapping;
    this._renderer.setSize(this.canvasContainerElement.clientWidth, this.canvasContainerElement.clientHeight);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.toneMappingExposure = 1;
    this._renderer.autoClear = false;

    const pMREMGenerator = new THREE.PMREMGenerator(this._renderer);
    pMREMGenerator.compileEquirectangularShader();
  }

  private initCamera(): void {
    const { offsetHeight: height, offsetWidth: width } = this.canvasContainerElement;
    this._camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 180);
    this.lookAt = getNodeCenter(this.rootNode);
    this._camera.position.set(0, 10, 10);
    this._camera.lookAt(this.lookAt);
  }

  private initControls() {
    this._orbitControls = new OrbitControls(this._camera, this._canvasElement);
    this._orbitControls.enabled = true;
    this._orbitControls.enableZoom = true;

    this._orbitControls.minDistance = 2.5;
    this._orbitControls.maxDistance = 30;
    if (this.DEBUG) {
      this._orbitControls.maxDistance = 30;
    }
    //this.controls.enablePan = true;
    this._orbitControls.minPolarAngle = Converter.toRadians(0);
    this._orbitControls.maxPolarAngle = Converter.toRadians(80);

    this._orbitControls.target = this.lookAt.clone();
    this._orbitControls.zoomSpeed = 1;

    this._orbitControls.addEventListener('change', () => {
      if (!this._orbitControls) {
        return;
      }
      this._renderer.render(this.scene, this._camera);
    });

    this._orbitControls.update();
  }

  public lookAtRootFromSide(node: THREE.Object3D): void {
    this.lookAt = getNodeCenter(node);
    this._camera.lookAt(this.lookAt);

    this._camera.position.x = this.lookAt.x - 10;
    this._camera.position.z = this.lookAt.z + 10;
    //this.animateCameraToPoint(this.lookAt)
    this._orbitControls.target = this.lookAt.clone();
    this._orbitControls.update();
  }

  private animateCameraToPoint(position: THREE.Vector3): void {
    const coords = { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z };

    new TWEEN.Tween(coords)
      .to({ x: position.x, y: position.y, z: position.z }, 10000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => this._camera.position.set(coords.x, coords.y, coords.z))
      .start();
  }

  public start(): void {
    this.animate();
  }

  public getScreenShot(): string {
    return this._renderer.domElement.toDataURL('image/png'); // .split(';base64,')[1]
  }

  private render(): void {
    this._renderer.render(this.scene, this._camera);
    this._orbitControls.update();
  }

  private readonly animate = (): void => {
    window.requestAnimationFrame(this.animate);
    this.render();
  };
}
