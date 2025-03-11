import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export interface ISharableConfigurationScene {
  readonly canvas: HTMLCanvasElement;
  readonly scene: THREE.Scene;
  readonly camera: THREE.Camera;
  readonly renderer: THREE.WebGLRenderer;
  readonly orbitControls: OrbitControls;

  lookAtRootFromSide(node: THREE.Object3D): void;
  getScreenShot(): string;
}
