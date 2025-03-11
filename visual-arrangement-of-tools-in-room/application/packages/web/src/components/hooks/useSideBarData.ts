import React from 'react';

type UseSideBarDataReturnValue<ValueType> = [ValueType | null, (val: ValueType) => void, () => void];

export const useSideBarData = <ValueType>(): UseSideBarDataReturnValue<ValueType> => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<ValueType | null>(null);

  const exitMenuItems = (): void => {
    setSelectedMenuItem(null);
  };

  return [selectedMenuItem, setSelectedMenuItem, exitMenuItems];
};
