import * as THREE from 'three';

export interface IScene {
  scene: THREE.Scene;
  start(): void;
}
