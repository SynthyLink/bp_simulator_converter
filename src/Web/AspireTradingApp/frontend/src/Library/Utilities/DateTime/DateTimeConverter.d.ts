export declare class DateTimeConverter {
    baseDays: number;
    coeff: number;
    coeffI: number;
    off: number;
    constructor();
    toOADate(date: Date): number;
    fromOADate(date: number): Date;
    fromSrting(s: string): number;
}
//# sourceMappingURL=DateTimeConverter.d.ts.map