import * as THREE from 'three';
import type { Position } from '@/core/types/domain/Position';

// ObjectsFlowScene

interface OverviewMode {
  type: 'overview';
}

interface InstallationMode {
  type: 'installation';
}

interface SelectedMode {
  type: 'selected';
  selected: THREE.Object3D;
}

interface MovingMode {
  type: 'moving';
  selected: THREE.Object3D;
}

export type ObjectsFlowSceneMode = OverviewMode | MovingMode | SelectedMode | InstallationMode;

// that not to pass whole orchestrator to ObjectsFlowScene
export interface CallbacksForObjFlowScene {
  enterOverviewMode: VoidFunction;
  enterSelectedMode: (id: string) => void;
  saveDraggedProduct: (position: Position) => void;
}

// ConfigurationScene

export const enum MeshUserDataType {
  Wall = 'Wall',
  Product = 'Product'
}

export interface MeshUserData {
  type: MeshUserDataType;
  id: string;
  article: string;
}
