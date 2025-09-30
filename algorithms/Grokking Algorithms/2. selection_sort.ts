import { type ComparatorType } from './shared/types.ts';
import { isSorted, numsComparator } from './shared/utils.ts';


export function sortWithSelectionSort<T>(array: T[], comparator: ComparatorType<T>): void {
    const findMinimalElementIndexInRestArrayPart = (fromIndex: number): number  => {
        let minimalElementIndex = fromIndex;

        for (let index = fromIndex + 1; index < array.length; ++index) {
            if (comparator(array[index], array[minimalElementIndex]) < 0) {
                minimalElementIndex = index;
            }
        }

        return minimalElementIndex;
    };

    for (let index = 0; index < array.length; ++index) {
        const minimalIndex = findMinimalElementIndexInRestArrayPart(index);
        if (minimalIndex !== index) {
            [array[minimalIndex], array[index]] = [array[index], array[minimalIndex]]; 
        }
    }
}

function test(): void {
    const data: Array<number[]> = [
        [0, -1, 0],
        [42, 17],
        [3, 88, 25],
        [91, 6, 73, 12],
        [59, 34, 77, 8, 20],
        [65, 90, 11, 47, 2, 38],
        [14, 53, 76, 99, 1, 24, 67],
        [83, 5, 31, 60, 19, 44, 70, 9],
        [28, 96, 13, 40, 85, 62, 7, 33, 50],
        [10, 26, 92, 35, 78, 0, 66, 21, 18],
    ]; 

    data.forEach(array => console.assert(isSorted(array) === false))

    data.forEach(array => sortWithSelectionSort(array, numsComparator));

    data.forEach(array => console.assert(isSorted(array) === true))
    data.forEach(array => console.assert(array.toString() === array.toSorted(numsComparator).toString()))
}

test();