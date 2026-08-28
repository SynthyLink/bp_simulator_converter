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

    currentTime: number = 0;

    currentPos: number = 0;

    map: Map<string, IMeasurement> = new Map

    dt!: IMeasurement;

    dp!: IMeasurement;


    first: boolean = true;

    order !: TradingOrder
   


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
            this.order = to;
            this.first = false
            this.map = this.performer.getMeasurementsDCMap(to);
            let dd = this.map.get("Trading.RealTime")
            if (dd !== undefined) this.dt = dd
            dd = this.map.get("Position.Formula_1")
            if (dd !== undefined) this.dp = dd
  }
        let y = this.dt.getMeasurementValue()
        this.currentTime = Number(y)
        y = this.dp.getMeasurementValue()
        this.currentPos = Number(y)

        if (this.currentTime > 38)
            if (this.currentTime < 50) {
                for (var [key, value] of this.map) {
                    let val = value.getMeasurementValue()
                    this.any = key
                    this.any = val
                }
                return true
            }
        return false
    }

    count: number = 0;
    public showEvent(t1: any, t2: string): void {
        if (this.count > 10) return
        console.log("EVENT", this.currentTime, this.currentPos, t2)
        console.log(this.order.getPositionDirection(), this.order.getCurrentPositionValue(),
            this.order.getCurrentPositionType())
        ++this.count;
    }

    any : any
}