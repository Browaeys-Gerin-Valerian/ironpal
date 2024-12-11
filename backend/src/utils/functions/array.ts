export function isNotEmptyArray<T>(array: T[]) {
    return array.length !== 0
}

export function isEmptyArray<T>(array: T[]) {
    return array.length == 0
} 