import * as THREE from 'three';
import { Floor } from './Floor';

export class Grid extends THREE.GridHelper {
  private static readonly divisions = 50;
  public static readonly defaultOpacity = 0.15;

  public constructor() {
    super(Floor.defaultSize, Grid.divisions, 0x000000, 0x000000);

    if (!Array.isArray(this.material)) {
      this.material.opacity = Grid.defaultOpacity;
      this.material.transparent = true;
    }
  }

  public setOpacity(opacity: number) {
    if (!Array.isArray(this.material)) {
      this.material.opacity = opacity;
    }
  }
}
