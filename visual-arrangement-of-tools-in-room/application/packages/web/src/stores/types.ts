interface WallsEditMode {
  type: 'edit';
  subtype: 'walls';
}

interface ObjectsEditMode {
  type: 'edit';
  subtype: 'objects';
}

export type ActiveMode = ObjectsEditMode | WallsEditMode; // OverviewMode | EditMode;
