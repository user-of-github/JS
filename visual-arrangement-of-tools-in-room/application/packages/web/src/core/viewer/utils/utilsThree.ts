import * as THREE from 'three';
import type { Coordinate } from '@/core/types/domain/Coordinate';
import type { PositionedProduct } from '@/core/types/domain/PositionedProduct';
import { type MeshUserData, MeshUserDataType } from '@/core/viewer/viewer3D/types';

export const getBoundingBox = (node: THREE.Object3D): THREE.Box3 => {
  const bbox = new THREE.Box3();
  bbox.setFromObject(node);
  const size = new THREE.Vector3();
  bbox.getSize(size);
  return bbox;
};

export const getNodeCenter = (node: THREE.Object3D): THREE.Vector3 => {
  const center = new THREE.Vector3();
  getBoundingBox(node).getCenter(center);
  return center;
};

export const toThreeCoord = (coord: number): number => coord / 100;

export const getWallCenter = (wall: { start: Coordinate; end: Coordinate }): Coordinate => {
  return {
    x: 0.5 * (wall.start.x + wall.end.x),
    y: 0.5 * (wall.start.y + wall.end.y)
  };
};

export const setMeshOpacity = (mesh: THREE.Mesh | THREE.Group | THREE.Object3D, opacity: number): void => {
  mesh.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.transparent = true;
      child.material.opacity = opacity;
    }
  });
};

export const cloneMeshMaterials = (mesh: THREE.Mesh | THREE.Group): void => {
  mesh.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = child.material.clone();
    }
  });
};

export const getUserDataForProductsMesh = (positionedProduct: Readonly<PositionedProduct>): MeshUserData => ({
  id: positionedProduct.id,
  article: positionedProduct.article,
  type: MeshUserDataType.Product
});
