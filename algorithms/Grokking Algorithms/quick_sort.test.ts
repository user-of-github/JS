import { toSortedWithQuickSort } from './quick_sort.ts';
import { isSorted, numsComparator } from './shared/utils.ts';

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

    const sortedData = data.map(array => toSortedWithQuickSort(array, numsComparator));

    sortedData.forEach(array => console.assert(isSorted(array) === true))
    sortedData.forEach((array, index) => console.assert(array.toString() === data[index].toSorted(numsComparator).toString()))
}

test();