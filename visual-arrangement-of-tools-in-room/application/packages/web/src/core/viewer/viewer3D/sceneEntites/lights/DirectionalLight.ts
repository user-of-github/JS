import * as THREE from 'three';

export class DirectionalLight extends THREE.DirectionalLight {
  private static readonly lightColor = 0xffffff;
  private static readonly lightIntensity = 3;

  public constructor() {
    super(DirectionalLight.lightColor, DirectionalLight.lightIntensity);

    this.position.set(0, 20, 10);
    //this.position.set(0, 15, 3);

    this.castShadow = true;
    //this.shadow.mapSize.width = 128;
    //this.shadow.mapSize.height = 128;
    //this.shadow.bias = -0.00195;

    //this.shadow.camera.near = 0.5;
    //this.shadow.camera.far = 100;

    this.shadow.camera.top = 2;
    this.shadow.camera.bottom = -2;
    this.shadow.camera.left = -2;
    this.shadow.camera.right = 2;
  }
}
