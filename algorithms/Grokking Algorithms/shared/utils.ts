import type { ComparatorType } from './types.ts';


export const numsComparator: ComparatorType<number> = (a, b) => {
    return a < b ? -1 : a === b ? 0 : 1
};

export const isSorted = (arr: number[]) => {
    return arr.every((val, i, array) => i === 0 || array[i - 1] <= val);
};