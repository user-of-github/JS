import { binarySearch } from './binary_search.ts';
import type { ComparatorType } from './shared/types.ts';

test();

function test() {
    const numberComparator: ComparatorType<number> = (a, b) => a < b ? -1 : a === b ? 0 : 1; 

    
    console.assert(binarySearch([-10,-2,3,4,5,6,7,8], -10, numberComparator) === 0);
    console.assert(binarySearch([-10,-2,3,4,5,6,7,8], 8, numberComparator) === 7);
    console.assert(binarySearch([-10,-2,3,4,5,6,7,8], 3, numberComparator) === 2);
    console.assert([2,3,4].includes(binarySearch([-10,-2, 3, 3, 3, 4, 4, 4, 4, 5,6,7,8], 3, numberComparator)));
    console.assert([5,6,7,8].includes(binarySearch([-10,-2, 3, 3, 3, 4, 4, 4, 4, 5,6,7,8], 4, numberComparator)));
    
    console.assert(binarySearch([-10,-2,3,4,5,6,7,8], 50, numberComparator) === -1);
    console.assert(binarySearch([-10,-2,3,4,5,6,7,8], -11, numberComparator) === -1);
    console.assert(binarySearch([-10,-2,3,4,5,6,7,8], 0, numberComparator) === -1);
    console.assert(binarySearch([], 0, numberComparator) === -1);
};