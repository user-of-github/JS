import { type ComparatorType } from './shared/types.ts';


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