import * as THREE from 'three';
import { Converter } from '@/core/services/Converter';
import type { Material } from '@/core/types/domain/Material';
import { AssetLoader } from '../AssetsLoader';

export class Floor extends THREE.Mesh {
  public static readonly defaultSize = 50;
  private static readonly defaultColor = 0xbbbbbb;

  public constructor() {
    const plane = new THREE.PlaneGeometry(Floor.defaultSize, Floor.defaultSize);
    const material = new THREE.MeshPhongMaterial({
      color: Floor.defaultColor,
      depthWrite: false,
      side: THREE.FrontSide
    });

    super(plane, material);

    this.rotation.x = -Math.PI / 2;
    this.position.set(0, 0, 0);
  }

  public async switchMaterial(selectedMaterial: Material): Promise<void> {
    if (selectedMaterial.type === 'color') {
      const [r, g, b] = Converter.hexToRgb(selectedMaterial.color);
      const color: THREE.Color = new THREE.Color(r / 255, g / 255, b / 255);
      this.material = new THREE.MeshPhongMaterial({ color });
    } else if (selectedMaterial.type === 'texture') {
      const texture: THREE.Texture = (await AssetLoader.loadTexture(selectedMaterial.view)).clone();
      texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(15, 15);
      texture.needsUpdate = true;
      this.material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
    }
  }
}
