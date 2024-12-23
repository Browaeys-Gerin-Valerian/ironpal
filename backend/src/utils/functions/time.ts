import dayjs from "dayjs";

export function convertRestToSeconds(rest: string): number {
    const fullMatch = rest.match(/(\d+)'(\d+)s/);
    const minutesOnlyMatch = rest.match(/(\d+)'/);

    if (fullMatch) {
        const minutes = Number(fullMatch[1], 10);
        const seconds = Number(fullMatch[2], 10);
        return minutes * 60 + seconds;
    } else if (minutesOnlyMatch) {
        const minutes = Number(minutesOnlyMatch[1], 10);
        return minutes * 60;
    }

    throw new Error(`Format invalide: ${rest}`);
}

export function calculateDateRange(month: string, year: string) {
    const targetMonth = Number(month as string, 10) + 1 || dayjs().month() + 1;
    const targetYear = Number(year as string, 10) || dayjs().year();

    if (isNaN(targetMonth) || isNaN(targetYear) || targetMonth < 1 || targetMonth > 12) {
        throw new Error("Invalid 'month' or 'year' parameters.");
    }

    const monthStart = dayjs(`${targetYear}-${String(targetMonth).padStart(2, "0")}-01`).startOf('month').toDate();
    const monthEnd = dayjs(monthStart).endOf('month').toDate();

    return { monthStart, monthEnd };
}