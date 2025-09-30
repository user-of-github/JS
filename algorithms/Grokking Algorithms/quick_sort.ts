import { type ComparatorType } from './shared/types.ts';


export function toSortedWithQuickSort<T>(array: T[], comparator: ComparatorType<T>): T[] {
    if (array.length < 2) {
        return array;
    }

    const [pivot, lessThanPivot, greaterThanPivot] = getPivotAndSubArrays(array, comparator);

    return [
        ...toSortedWithQuickSort(lessThanPivot, comparator),
        pivot,
        ...toSortedWithQuickSort(greaterThanPivot, comparator)
    ];
}

function getPivotAndSubArrays<T>(array: T[], comparator: ComparatorType<T>): [T, Array<T>, Array<T>] {
    const pivotIndex = 0;

    const pivot = array[pivotIndex];
    const lessThanPivot: T[] = [];
    const greaterThanPivot: T[] = [];

    for (let index = 0; index < array.length; ++index) {
        if (index === pivotIndex) {
            continue;
        }

        if (comparator(array[index], pivot) <= 0) {
            lessThanPivot.push(array[index]);
        } else {
            greaterThanPivot.push(array[index]);
        }
    }

    return [pivot, lessThanPivot, greaterThanPivot];
};