import { PerformerMeasuremets } from "../../../Library/Measurements/PerformerMeasuremets";
import type { IShowObject } from "../../../Library/Show/Interfaces/IShowObject";
import { TradingOrder } from "./TradingOrder";
import { EmptyObject } from "../../../Library/EmptyObject";

export class TradingOrderShow extends EmptyObject implements IShowObject {
    constructor() {
        super("")
        this.types.push("IShowObject")
    }

    x: number = 0;

    performer: PerformerMeasuremets = new PerformerMeasuremets()
    show(sender: any, show: any, str?: string | undefined): void {
        let t = this.performer.convertObject<TradingOrder, any>(sender, "TradingOrder")
     //   if (t.length > 0)
     //       this.showTO(t[0])
        this.any = show
        this.any = str
        this.any = t
    }

    showTO(to: TradingOrder): void {

        let x = this.performer.getMeasurementsDCMap(to)
        if (this.x > 79)
            if (this.x < 84) {
                console.log(this.x)
                for (var [key, value] of x) {
                    let val = value.getMeasurementValue()
                    console.log(key, val)
                }
            }
          ++this.x  
    }

    any : any
}