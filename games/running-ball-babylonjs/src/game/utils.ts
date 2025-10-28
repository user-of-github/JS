export const notRepeatedRandomFreeSpacePositionGenerator = (freeSpace: number): (() => number) => {
  const getFreeSpaceIndexRandom = () => Math.floor(Math.random() * freeSpace);
  let lastEmptySpaceIndex = 0;

  return (): number => {
    let randomFreePlaceIndexInRow = getFreeSpaceIndexRandom();

    while (randomFreePlaceIndexInRow === lastEmptySpaceIndex) {
      randomFreePlaceIndexInRow = getFreeSpaceIndexRandom();
    }

    lastEmptySpaceIndex = randomFreePlaceIndexInRow;

    return randomFreePlaceIndexInRow;
  };
};
