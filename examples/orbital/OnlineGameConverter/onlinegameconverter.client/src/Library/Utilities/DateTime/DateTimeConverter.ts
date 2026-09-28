

export class DateTimeConverter {

    baseOADate: Date = new Date(1899, 12, 30, 0, 0, 0, 0);

    baseDate: Date = new Date(0);

    baseDays: number = 25569;

    coeff: number = 86400000;

    coeffI: number = 1.0 / 86400000.0;

    off: number = 0;

    constructor() {
        this.off = this.baseDate.getTimezoneOffset() * 60000;
    }


    public toOADate(date: Date): number
    {
        var t = date.getTime();
        t *= this.coeffI;
        t += this.baseDays;
        return t;
    }


    public fromOADate(date: number): Date
    {
        var x = date - this.baseDays;
        x *= this.coeff;
        return  new Date(x + this.off);
     }

}