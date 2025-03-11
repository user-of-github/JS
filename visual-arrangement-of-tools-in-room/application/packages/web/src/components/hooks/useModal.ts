import React from 'react';

type UseModalReturnValue = [boolean, () => void, () => void]; // state, open, close

export const useModal = (): UseModalReturnValue => {
  const [isOpened, setIsOpened] = React.useState<boolean>(false);
  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);
  return [isOpened, open, close];
};
