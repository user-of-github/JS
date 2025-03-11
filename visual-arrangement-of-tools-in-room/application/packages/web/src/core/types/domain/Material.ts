export interface ColorMaterial {
  type: 'color';
  color: string;
}

export interface TextureMaterial {
  type: 'texture';
  view: string;
  preview: string;
  name: string;
}

export type Material = ColorMaterial | TextureMaterial;
export const defaultMaterial: ColorMaterial = { type: 'color', color: '#DDD' };

export const ColorMaterialTypeGuard = (material: Material): material is ColorMaterial => {
  return material.type === 'color';
};
export const TextureMaterialTypeGuard = (material: Material): material is TextureMaterial => {
  return material.type === 'texture';
};
