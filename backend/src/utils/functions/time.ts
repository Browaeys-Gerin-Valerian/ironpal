export function convertRestToSeconds(rest: string): number {
    const fullMatch = rest.match(/(\d+)'(\d+)s/);
    const minutesOnlyMatch = rest.match(/(\d+)'/);

    if (fullMatch) {
        const minutes = parseInt(fullMatch[1], 10);
        const seconds = parseInt(fullMatch[2], 10);
        return minutes * 60 + seconds;
    } else if (minutesOnlyMatch) {
        const minutes = parseInt(minutesOnlyMatch[1], 10);
        return minutes * 60;
    }

    throw new Error(`Format invalide: ${rest}`);
}