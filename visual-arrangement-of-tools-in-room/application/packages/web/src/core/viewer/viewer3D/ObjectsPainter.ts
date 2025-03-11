/*
Here let's put "business" logic of events and so on,
that not to store it in Scene class
*/
import toast from 'react-hot-toast';
import * as THREE from 'three';
import { type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { Converter } from '@/core/services/Converter';
import type { OnInstalledCallback } from '@/core/types/utility/callbacks';
import { getUserDataForProductsMesh } from '@/core/viewer/utils/utilsThree';
import { AssetLoader } from './AssetsLoader';
import { ProductOnScene } from './sceneEntites/ProductOnScene';

type GetPointerPosition = (pointer: MouseEvent | PointerEvent) => THREE.Vector2;

export type FloorIntersectionResult = THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>;
type GetIntersectWithFloor = (pointer: THREE.Vector2) => FloorIntersectionResult;
type AddToScene = (scene: THREE.Object3D) => void;
type RemoveFromScene = (mesh: THREE.Object3D) => void;

export class ObjectsPainter {
  public static readonly rotationDelta = Converter.toRadians(5);
  private draftObject: ProductOnScene | null = null;

  public onInstalledCallback: OnInstalledCallback | null | undefined = null;

  public constructor(
    public readonly getPointerPosition: GetPointerPosition,
    public readonly getIntersectWithFloor: GetIntersectWithFloor,
    public readonly addProductToScene: AddToScene,
    public readonly removeProductFromScene: RemoveFromScene,
    public readonly canvasElement: Readonly<HTMLCanvasElement>
  ) {}

  public async mountProduct(view: string, onMounted?: VoidFunction, onInstalled?: OnInstalledCallback): Promise<void> {
    const gltf: GLTF = await AssetLoader.loadModel(view);

    if (!gltf) {
      console.error(`No gltf model for ${view}`);
      return;
    }

    onMounted?.();
    this.onInstalledCallback = onInstalled;

    const gltfClone = gltf.scenes[0].clone(true);

    this.draftObject = new ProductOnScene(gltfClone);
    this.draftObject.setOpacity(0.25);

    this.addProductToScene(this.draftObject.mesh);

    this.canvasElement.addEventListener('mousemove', this.handleMouseMove);
    this.canvasElement.addEventListener('dblclick', this.handleMouseClick);
    this.canvasElement.addEventListener('wheel', this.handleWheel);
  }

  private readonly handleMouseMove = (event: MouseEvent | PointerEvent): void => {
    if (!this.draftObject) {
      return;
    }

    const pointer = this.getPointerPosition(event);

    const intersect = this.getIntersectWithFloor(pointer);

    this.draftObject.moveTo(intersect.point);
  };

  private async installProduct(): Promise<void> {
    if (!this.draftObject) {
      return;
    }

    this.draftObject?.setOpacity(1);

    const positionedProduct = await this.onInstalledCallback?.({
      coordinate: { x: this.draftObject.position.x, y: this.draftObject.position.z },
      angle: this.draftObject.rotationY
    });
    if (positionedProduct) {
      this.draftObject.mesh.userData = getUserDataForProductsMesh(positionedProduct);
    }

    this.draftObject = null;
    this.canvasElement.removeEventListener('mousemove', this.handleMouseMove);
    this.canvasElement.removeEventListener('click', this.handleMouseClick);
    this.canvasElement.removeEventListener('wheel', this.handleWheel);
    this.onInstalledCallback = null;
  }

  private readonly handleMouseClick = (): void => {
    this.installProduct();
    //this.rerenderScene();
  };

  private readonly handleWheel = (event: WheelEvent): void => {
    if (this.draftObject) {
      if (event.deltaX <= 0 && event.deltaY <= 0) {
        this.draftObject.rotate(this.draftObject.mesh.rotation.y - ObjectsPainter.rotationDelta);
      } else if (event.deltaX >= 0 && event.deltaY >= 0) {
        this.draftObject.rotate(this.draftObject.mesh.rotation.y + ObjectsPainter.rotationDelta);
      }
    }
  };

  public cancelInstallation(): void {
    if (this.draftObject) {
      toast.dismiss();
      this.removeProductFromScene(this.draftObject.mesh);
      this.draftObject = null;
      this.canvasElement.removeEventListener('mousemove', this.handleMouseMove);
      this.canvasElement.removeEventListener('click', this.handleMouseClick);
      this.canvasElement.removeEventListener('wheel', this.handleWheel);
      this.onInstalledCallback = null;
    }
  }
}
