import type { ComparatorType } from './shared/types';


export function binarySearch <T>(array: Array<T>, searchedValue: T, comparator: ComparatorType<T>): number {
    let left: number = 0;
    let right: number = array.length - 1;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        const compareResult = comparator(searchedValue, array[middle]);
        
        if (compareResult === 0) {
            return middle;
        } else if (compareResult === -1) {
            right = middle - 1;
        } else if (compareResult === 1) {
            left = middle + 1;
        }
    }

    return -1;
};

