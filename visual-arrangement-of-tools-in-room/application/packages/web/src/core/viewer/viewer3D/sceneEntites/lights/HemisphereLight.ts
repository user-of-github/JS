import * as THREE from 'three';

export class HemisphereLight extends THREE.HemisphereLight {
  private static readonly skyColor = 0xffffff;
  private static readonly groundColor = 0x444444;
  private static readonly lightIntensity = 1.5;

  public constructor() {
    super(HemisphereLight.skyColor, HemisphereLight.groundColor, HemisphereLight.lightIntensity);
    this.position.set(0, 50, 0);
  }
}
