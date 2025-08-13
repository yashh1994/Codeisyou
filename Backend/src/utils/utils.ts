



export function areDatesAdjacent(date1: string, date2: string): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = d2.getTime() - d1.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.abs(diff) === oneDay;
}

