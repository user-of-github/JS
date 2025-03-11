import toast from 'react-hot-toast';
import * as THREE from 'three';
import { type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Converter } from '@/core/services/Converter';
import type { Coordinate } from '@/core/types/domain/Coordinate';
import type { Material } from '@/core/types/domain/Material';
import type { Position } from '@/core/types/domain/Position';
import type { PositionedProduct } from '@/core/types/domain/PositionedProduct';
import type { Wall } from '@/core/types/domain/Wall';
import type { OnInstalledCallback } from '@/core/types/utility/callbacks';
import { ProductOnScene } from '@/core/viewer/viewer3D/sceneEntites/ProductOnScene';
import type { SceneSettingsStore } from '@/stores/scene3D/SceneSettingsStore';
import { getUserDataForProductsMesh, getWallCenter, setMeshOpacity, toThreeCoord } from '../utils/utilsThree';
import { getMouseCoordinateTowardsElement } from './../utils/utilsCanvas';
import { AssetLoader } from './AssetsLoader';
import { rootNodeName } from './ConfigurationScene';
import type { ISharableConfigurationScene } from './ConfigurationScene.i';
import { type FloorIntersectionResult, ObjectsPainter } from './ObjectsPainter';
import { Floor } from './sceneEntites/Floor';
import { Grid } from './sceneEntites/Grid';
import { type CallbacksForObjFlowScene, MeshUserDataType, ObjectsFlowSceneMode } from './types';

export class ObjectsFlowScene {
  private mode: ObjectsFlowSceneMode = { type: 'overview' };
  private objectsPainter!: ObjectsPainter;
  private readonly rayCaster: THREE.Raycaster;
  private readonly rootNode: THREE.Object3D;
  private hoveredMesh: THREE.Object3D | null = null;
  private highlightedMesh: THREE.Object3D | null = null;

  private readonly wallsMeshes: Array<THREE.Mesh> = [];
  private readonly productsMeshes: Array<THREE.Object3D> = [];

  private readonly floor: Floor;
  private readonly grid: Grid;

  private callbacks!: CallbacksForObjFlowScene;

  public constructor(
    private readonly mainScene: ISharableConfigurationScene,
    private readonly sceneSettingsStore: SceneSettingsStore
  ) {
    const rootNode = this.mainScene.scene.getObjectByName(rootNodeName);
    if (!rootNode) {
      throw Error('ObjectsFlowScene(): Root node is not found by such name');
    }

    this.rootNode = rootNode;

    this.floor = new Floor();
    this.mainScene.scene.add(this.floor);

    this.grid = new Grid();
    this.mainScene.scene.add(this.grid);

    this.rayCaster = new THREE.Raycaster();
  }

  // must be called after "parent's" ConfigurationScene::initWithCanvas
  public init(cb: CallbacksForObjFlowScene): void {
    this.objectsPainter = new ObjectsPainter(
      this.getPointerPosition.bind(this),
      this.getIntersectWithFloor.bind(this),
      this.addInstalledProductToScene.bind(this),
      this.removeProductFromScene.bind(this),
      this.mainScene.canvas
    );

    this.callbacks = cb;

    this.mainScene.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.mainScene.canvas.addEventListener('dblclick', this.handleDoubleMouseClick);
    this.mainScene.canvas.addEventListener('click', this.handleMouseClick);
  }

  public async mountProduct(view: string, onMounted?: VoidFunction, onInstalled?: OnInstalledCallback): Promise<void> {
    await this.objectsPainter.mountProduct(view, onMounted, onInstalled);
  }

  public async renderData(walls: ReadonlyArray<Wall>, products: ReadonlyArray<PositionedProduct>): Promise<void> {
    await this.renderWalls(walls);
    await this.renderProducts(products);

    this.lookAtRootFromSide();
  }

  public lookAtRootFromSide(): void {
    this.mainScene.lookAtRootFromSide(this.rootNode);
  }

  private async renderProducts(products: ReadonlyArray<PositionedProduct>): Promise<void> {
    this.productsMeshes.forEach((mesh) => mesh.remove());
    this.productsMeshes.length = 0;

    const promises = products.map((product) => {
      return new Promise<void>(async (resolve) => {
        const gltf: GLTF = await AssetLoader.loadModel(product.view);

        if (!gltf) {
          console.error(`No gltf model for ${product.view}`);
          resolve();
          return;
        }

        const gltfClone = gltf.scene.clone(true);

        const productObject = new ProductOnScene(gltfClone);

        productObject.moveTo(new THREE.Vector3(product.position.coordinate.x, 0, product.position.coordinate.y));
        productObject.rotate(product.position.angle);
        productObject.mesh.userData = getUserDataForProductsMesh(product);

        this.productsMeshes.push(productObject.mesh);
        this.rootNode.add(productObject.mesh);

        resolve();
      });
    });

    await Promise.all(promises);
  }

  private async renderWalls(walls: ReadonlyArray<Wall>): Promise<void> {
    this.wallsMeshes.forEach((mesh) => mesh.remove());
    this.wallsMeshes.length = 0;

    const wallMaterial = await this.getWallMaterial(this.sceneSettingsStore.selectedWallMaterial);

    for (const wall of walls) {
      const geometry = new RoundedBoxGeometry(
        toThreeCoord(wall.dimensions.length),
        toThreeCoord(wall.dimensions.height),
        toThreeCoord(wall.dimensions.width),
        6,
        0.05
      );

      const wallMesh = new THREE.Mesh(geometry, wallMaterial);

      wallMesh.rotation.y = -Math.atan((wall.end.y - wall.start.y) / (wall.end.x - wall.start.x));

      const wallCenter = getWallCenter(wall);
      wallMesh.position.x = toThreeCoord(wallCenter.x);
      wallMesh.position.z = toThreeCoord(wallCenter.y);
      wallMesh.position.y = toThreeCoord(wall.dimensions.height) * 0.5;

      wallMesh.userData = { type: MeshUserDataType.Wall, id: wall.id };

      this.rootNode.add(wallMesh);
      this.wallsMeshes.push(wallMesh);
    }
  }

  public async switchWallMaterial(selectedMaterial: Material): Promise<void> {
    const threeMaterial = await this.getWallMaterial(selectedMaterial);

    this.wallsMeshes.forEach((mesh) => {
      mesh.material = threeMaterial;
    });
  }

  public async switchFloorMaterial(selectedMaterial: Material): Promise<void> {
    await this.floor.switchMaterial(selectedMaterial);
  }

  private async getWallMaterial(material: Readonly<Material>): Promise<THREE.Material> {
    if (material.type === 'color') {
      const [r, g, b] = Converter.hexToRgb(material.color);
      const color = new THREE.Color(r / 255, g / 255, b / 255);
      return new THREE.MeshBasicMaterial({ color, shadowSide: THREE.FrontSide });
    } else if (material.type === 'texture') {
      const texture = await AssetLoader.loadTexture(material.view);
      texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(2, 1);
      texture.needsUpdate = true;

      return new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: texture
      });
    } else {
      throw new Error('switchWallMaterial(): Unsupported material type');
    }
  }

  public cancelInstallation(): void {
    this.objectsPainter.cancelInstallation();
  }

  public cancelMoving(originalPosition: Readonly<Position>): void {
    if (this.mode.type !== 'moving') {
      return;
    }

    this.mode.selected.position.x = originalPosition.coordinate.x;
    this.mode.selected.position.z = originalPosition.coordinate.y;
    this.mode.selected.rotation.y = originalPosition.angle;

    this.mainScene.orbitControls.enableZoom = true;
    this.mainScene.orbitControls.update();

    setMeshOpacity(this.mode.selected, 1);
  }

  public removeProduct(positionedProductId: string): void {
    const index = this.productsMeshes.findIndex((mesh) => {
      return mesh.userData.type === MeshUserDataType.Product && mesh.userData.id === positionedProductId;
    });

    if (index < 0) {
      toast.error('Product can not be found on scene. Please reload page');
      return;
    }
    this.productsMeshes[index].removeFromParent();
    this.productsMeshes.splice(index, 1);
  }

  public enterOverviewMode(): void {
    this.resetHighlightedMesh();
    this.callbacks.enterOverviewMode();
    this.mode = { type: 'overview' };
  }

  public enterInstallationMode(): void {
    this.mode = { type: 'installation' };
  }

  public enterOverviewModeNoRecursion(): void {
    this.resetHighlightedMesh();
    this.mode = { type: 'overview' };
  }

  public enterMovingMode(): void {
    if (this.mode.type === 'selected') {
      this.mainScene.orbitControls.enableZoom = false;
      this.mainScene.orbitControls.update();
      this.mode = { type: 'moving', selected: this.mode.selected };
      this.mainScene.canvas.addEventListener('wheel', this.handleWheel);
    }
  }

  private getPointerPosition(event: PointerEvent | MouseEvent): THREE.Vector2 {
    const coordinates: Coordinate = getMouseCoordinateTowardsElement(event, this.mainScene.canvas);

    const pointer = new THREE.Vector2();
    pointer.x = (coordinates.x / this.mainScene.renderer.domElement.clientWidth) * 2 - 1;
    pointer.y = -(coordinates.y / this.mainScene.renderer.domElement.clientHeight) * 2 + 1;

    return pointer;
  }

  private getIntersectWithFloor(pointer: THREE.Vector2): FloorIntersectionResult {
    this.rayCaster.setFromCamera(pointer, this.mainScene.camera);
    return this.rayCaster.intersectObject(this.floor)[0];
  }

  private addInstalledProductToScene(element: THREE.Object3D): void {
    this.rootNode.add(element);
    this.productsMeshes.push(element);
    this.lookAtRootFromSide();
  }

  private removeProductFromScene(element: THREE.Object3D): void {
    const index = this.productsMeshes.indexOf(element);
    this.productsMeshes.splice(index, 1);
    element.removeFromParent();
    this.lookAtRootFromSide();
  }

  private getNearestParentOfProductType(mesh: THREE.Object3D, objectType: string): THREE.Object3D | null {
    let element: THREE.Object3D | null = mesh;
    while (element && element.name !== rootNodeName && element.userData.type !== objectType) {
      element = element.parent;
    }

    if (element && element.userData.type === objectType) {
      return element;
    } else {
      return null;
    }
  }

  private readonly handleMouseMove = (event: MouseEvent | PointerEvent): void => {
    switch (this.mode.type) {
      case 'overview':
      case 'selected':
        this.hoverElement(event);
        break;
      case 'moving':
        this.dragElement(event);
        break;
    }
  };

  private readonly handleDoubleMouseClick = (event: MouseEvent | PointerEvent): void => {
    if (event.detail !== 2) {
      return;
    }

    if (this.mode.type === 'overview' || this.mode.type === 'selected') {
      this.highlightElement(event);
    } else if (this.mode.type === 'moving') {
      this.mainScene.canvas.removeEventListener('wheel', this.handleWheel);
      this.mainScene.orbitControls.enableZoom = true;
      this.mainScene.orbitControls.update();
      this.resetHighlightedMesh();
      const mesh = this.mode.selected;
      this.callbacks.saveDraggedProduct({
        coordinate: { x: mesh.position.x, y: mesh.position.z },
        angle: mesh.rotation.y
      });

      setMeshOpacity(this.mode.selected, 1);

      this.enterOverviewMode();
    }
  };

  private readonly handleMouseClick = (event: MouseEvent | PointerEvent): void => {
    if (event.detail !== 1) {
      return;
    }

    if (this.mode.type === 'selected') {
      const intersectionObject = this.getIntersectionObject(event);

      if (!intersectionObject) {
        this.resetHighlightedMesh();
        this.mode = { type: 'overview' };
        this.callbacks.enterOverviewMode();
      }
    }
  };

  private readonly handleWheel = (event: WheelEvent): void => {
    if (this.mode.type === 'moving') {
      if (event.deltaX <= 0 && event.deltaY <= 0) {
        this.mode.selected.rotation.y = this.mode.selected.rotation.y - ObjectsPainter.rotationDelta;
      } else if (event.deltaX >= 0 && event.deltaY >= 0) {
        this.mode.selected.rotation.y = this.mode.selected.rotation.y + ObjectsPainter.rotationDelta;
      }
    }
  };

  private highlightElement(event: MouseEvent | PointerEvent): void {
    const intersectionObject = this.getIntersectionObject(event);

    if (intersectionObject) {
      if (intersectionObject.userData.id && intersectionObject.userData.id === this.highlightedMesh?.userData.id) {
        return;
      }
      const parentObjectProduct = this.getNearestParentOfProductType(intersectionObject, MeshUserDataType.Product);

      this.resetHighlightedMesh();
      if (parentObjectProduct) {
        this.highlightedMesh = parentObjectProduct;

        setMeshOpacity(parentObjectProduct, 0.5);
        this.mode = { type: 'selected', selected: parentObjectProduct };
        this.callbacks.enterSelectedMode(parentObjectProduct.userData.id);
      }
    } else {
      this.resetHighlightedMesh();
      this.mode = { type: 'overview' };
      this.callbacks.enterOverviewMode();
    }
  }

  private hoverElement(event: MouseEvent | PointerEvent): void {
    const intersectionObject = this.getIntersectionObject(event);

    if (intersectionObject) {
      if (intersectionObject.userData.id && intersectionObject.userData.id === this.hoveredMesh?.userData.id) {
        return;
      }
      const parentObjectProduct = this.getNearestParentOfProductType(intersectionObject, MeshUserDataType.Product);

      this.resetHoveredMesh();

      if (parentObjectProduct) {
        this.hoveredMesh = parentObjectProduct;
        setMeshOpacity(parentObjectProduct, 0.5);
      }
    } else {
      this.resetHoveredMesh();
    }
  }

  private resetHoveredMesh(): void {
    if (this.hoveredMesh && this.highlightedMesh?.id !== this.hoveredMesh?.id) {
      setMeshOpacity(this.hoveredMesh, 1);
      this.hoveredMesh = null;
    }
  }

  private resetHighlightedMesh(): void {
    if (this.highlightedMesh) {
      setMeshOpacity(this.highlightedMesh, 1);
      this.highlightedMesh = null;
    }
  }

  private getIntersectionObject(event: MouseEvent | PointerEvent): THREE.Object3D | null | undefined {
    const pointerPosition = this.getPointerPosition(event);
    this.rayCaster.setFromCamera(pointerPosition, this.mainScene.camera);
    const intersection = this.rayCaster.intersectObject(this.rootNode)[0];
    return intersection?.object;
  }

  private dragElement(event: MouseEvent | PointerEvent): void {
    if (this.mode.type !== 'moving') {
      return;
    }

    const pointer: THREE.Vector2 = this.getPointerPosition(event);
    const floorIntersection = this.getIntersectWithFloor(pointer);

    if (floorIntersection && floorIntersection.point) {
      this.mode.selected.position.copy(floorIntersection.point);
      this.mode.selected.position.y = 0;
    }
  }

  public changeGridOpacity(opacity: number): void {
    this.grid.setOpacity(opacity);
  }
}
