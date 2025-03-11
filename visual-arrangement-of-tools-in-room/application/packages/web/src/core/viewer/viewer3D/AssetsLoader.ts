import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class AssetsLoader {
  private readonly assetMap: Map<string, GLTF> = new Map<string, GLTF>();
  private readonly texturesMap: Map<string, THREE.Texture> = new Map<string, THREE.Texture>();

  private readonly gltfLoader: GLTFLoader = new GLTFLoader();
  private readonly texturesLoader: THREE.TextureLoader = new THREE.TextureLoader();

  public constructor() {}

  public start(): void {}

  public async loadModel(path: string): Promise<GLTF> {
    if (this.assetMap.has(path)) {
      return this.assetMap.get(path) as GLTF;
    }

    return await this.gltfLoader.loadAsync(path);

    return new Promise<GLTF>((resolve, reject) => {
      this.gltfLoader.load(
        path,
        (model) => {
          this.assetMap.set(path, model);
          resolve(model);
        },
        () => null,
        reject
      );
    });
  }

  public async loadTexture(path: string): Promise<THREE.Texture> {
    if (this.texturesMap.has(path)) {
      return this.texturesMap.get(path) as THREE.Texture;
    }

    return new Promise((resolve, reject) => {
      this.texturesLoader.load(
        path,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.flipY = false;
          this.texturesMap.set(path, texture);
          resolve(texture);
        },
        () => null,
        reject
      );
    });
  }
}

export const AssetLoader = new AssetsLoader();
