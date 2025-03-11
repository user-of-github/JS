import * as THREE from 'three';
import { v4 } from 'uuid';
import { cloneMeshMaterials, setMeshOpacity } from '../../utils/utilsThree';

export class ProductOnScene {
  public readonly id: string;

  public constructor(public readonly mesh: THREE.Group) {
    this.id = v4();
    cloneMeshMaterials(this.mesh);
  }

  public moveTo(vector: THREE.Vector3): void {
    this.mesh.position.copy(vector);
    this.mesh.position.y = 0;
  }

  public setOpacity(opacity: number): void {
    setMeshOpacity(this.mesh, opacity);
  }

  public rotate(value: number): void {
    this.mesh.rotation.y = value;
  }

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  public get rotationY(): number {
    return this.mesh.rotation.y;
  }
}
