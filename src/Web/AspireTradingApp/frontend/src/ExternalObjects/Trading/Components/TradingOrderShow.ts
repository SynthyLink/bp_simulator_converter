import { PerformerMeasuremets } from "../../../Library/Measurements/PerformerMeasuremets";
import type { IShowObject } from "../../../Library/Show/Interfaces/IShowObject";
import { TradingOrder } from "./TradingOrder";
import { EmptyObject } from "../../../Library/EmptyObject";
import type { IMeasurement } from "../../../Library/Measurements/Interfaces/IMeasurement";

export class TradingOrderShow extends EmptyObject implements IShowObject {
    constructor() {
        super("")
        this.types.push("IShowObject")
    }

    x: number = 0;

    map: Map<string, IMeasurement> = new Map

    dt!: IMeasurement;

    first: boolean = true;


    performer: PerformerMeasuremets = new PerformerMeasuremets()
    show(sender: any, show: any, str?: string | undefined): boolean {
         let t = this.performer.convertObject<TradingOrder, any>(sender, "TradingOrder")
        if (t.length > 0) {
            let a = show as string
            this.showTO(t[0], a)
        }
        this.any = show
        this.any = str
        this.any = t
        return true;
    }

    showTO(to: TradingOrder, s: string): boolean {
        if (this.first) {
            this.first = false
            this.map = this.performer.getMeasurementsDCMap(to);
            let dd = this.map.get("Trading.RealTime")
            if (dd !== undefined) this.dt = dd
            console.log(this.dt)
        }
        let y = this.dt.getMeasurementValue()
        this.x = Number(y)

        if (this.x > 38)
            if (this.x < 50) {
                console.log(s)
                console.log(this.x)
                console.log(to.income, "III")
                for (var [key, value] of this.map) {
                    let val = value.getMeasurementValue()
                    this.any = key
                    this.any = val
                   // console.log(key, val)
                }
                return true
            }
        return false
    }

    any : any
}