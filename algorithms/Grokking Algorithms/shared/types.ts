type ComparatorResultType = -1 | 0 | 1;
export type ComparatorType<T> = (a: T, b: T) => ComparatorResultType;

