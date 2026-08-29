import type { IAssociatedObject } from "../../../Library/Interfaces/IAssociatedObject";
import type { IDesktop } from "../../../Library/Interfaces/IDesktop";
import type { IObject } from "../../../Library/Interfaces/IObject";
import type { IMeasurement } from "../../../Library/Measurements/Interfaces/IMeasurement";
import type { IMeasurements } from "../../../Library/Measurements/Interfaces/IMeasurements";
import { Measurement } from "../../../Library/Measurements/Measurement";
import { DataConsumer } from "../../../Library/Measurements/DataConsumer";
import { TradingPositionDirection, TradingPositionType } from "./TradingPositionEnums";
import { OwnError } from "../../../Library/ErrorHandler/OwnError";
import type { IActionAddRemoveT2 } from "../../../Library/Interfaces/IActionAddRemoveT2";
import type { IActionT2 } from "../../../Library/Interfaces/IActionT2";
import { ActionArrayT2 } from "../../../Library/Utilities/Generic/ActionArrayT2";
import type { IActionAddRemoveT4 } from "../../../Library/Interfaces/IActionAddRemoveT4";
import type { IActionT4 } from "../../../Library/Interfaces/IActionT4";
import { ActionArrayT4 } from "../../../Library/Utilities/Generic/ActionArrayT4";

export class TradingOrder extends DataConsumer implements IMeasurements,
    IActionAddRemoveT2<any, string>, IActionAddRemoveT4<any, string, number, number>
{
    constructor(desktop: IDesktop, name: string) {
        super(desktop, name)
        this.types.push("IMeasurements")
        this.types.push("TradingOrder")
        this.typeName = "TradingOrder"
        this.output = [new PositionMeasurement(this),
            new IncomeMeasurement(this),
            new SellTaxMeasurement(this),
            new BuyTaxMeasurement(this)]

    }
    update(): void {
        this.showThis("before");
        this.zero()
        this.dateValue = this.toNullabe(this.currentDate)
        this.setCurrentPositionValue(this.toNullabe(this.positionM))
        if (!this.changed) {
            return;
        }
        if (this.positionDirection == TradingPositionDirection.Closed) {
            if (this.getTempIncome() == 0) {
                return;
            }
            if (this.tempIncome < 0) {
                this.mSellPrice = this.toNullabe(this.sellPriceM)
                if (this.mSellPrice !== undefined) {
                    this.exitPrice = this.mSellPrice
                    this.closedIncome = this.tempIncome + this.exitPrice;
                    this.sellBuy.actionT4(this, "+", this.income, this.closedIncome)
                    this.income += this.closedIncome;
                }
            }
            else {
                this.mBuyPrice = this.toNullabe(this.buyPriceM)
                if (this.mBuyPrice !== undefined) {
                    this.exitPrice = this.mBuyPrice
                    this.closedIncome = this.tempIncome - this.exitPrice;
                    this.sellBuy.actionT4(this, "-", this.income, this.closedIncome)
                    this.income += this.closedIncome;
                    
                }
            }
        }
        else
        {
            this.closedPositionType = this.currentPositionType;
            if (this.currentPositionType == TradingPositionType.Long) {
                this.mBuyPrice = this.toNullabe(this.buyPriceM)
                if (this.mBuyPrice !== undefined)
                    this.enterPrice = this.mBuyPrice
                this.setTempIncome(-this.enterPrice)
            }
            else {
                this.mSellPrice = this.toNullabe(this.sellPriceM)
                if (this.mSellPrice !== undefined)
                    this.enterPrice = this.mSellPrice
                this.setTempIncome(this.enterPrice)
            }

        }
        this.showThis("after")

    }

    addActionT2(action: IActionT2<any, string> | undefined): void {
        this.changePosition.addActionT2(action)
    }
    removeActionT2(action: IActionT2<any, string> | undefined): void {
        this.changePosition.removeActionT2(action)
    }
    clearActionsT2(): void {
        this.changePosition.clearActionsT2()
    }
    actionT2(t1: any, t2: string): void {
        this.changePosition.actionT2(t1, t2)
    }
    isEmptyActionT2(): boolean {
        return false;
    }
    addActionT4(action: IActionT4<any, string, number, number> | undefined): void {
        this.sellBuy.addActionT4(action)
    }

    removeActionT4(action: IActionT4<any, string, number, number> | undefined): void {
        this.sellBuy.removeActionT4(action)
    }
    clearActionsT4(): void {
        this.sellBuy.clearActionsT4()
    }
    actionT4(t1: any, t2: string, t3: number, t4: number): void {
        this.sellBuy.actionT4(t1, t2, t3, t4)
    }
    isEmptyActionT4(): boolean {
        return false;
    }


    changed: boolean = false;

    isPost: boolean = false;

    currentPositionValue: number | undefined = undefined;

    isRunning: boolean = false;

    isMeaUpdated: boolean = false;

    income: number = 0;

    changePosition: IActionAddRemoveT2<any, string> = new  ActionArrayT2<any, string>()

    sellBuy: IActionAddRemoveT4<any, string, number, number> = new ActionArrayT4<any, string, number, number>()

    protected sellPrice: string = "";

    protected buyPrice: string = "";

    protected position: string = "";

    protected date: string = "";

    positionM !: IMeasurement;

    buyPriceM !: IMeasurement;

    sellPriceM !: IMeasurement;

    currentDate !: IMeasurement;

    output: IMeasurement[] = []


    mSellPrice: number | undefined = undefined;

    mBuyPrice: number | undefined = undefined;

    enterPrice: number = 0


    exitPrice: number = 0

    tempIncome: number = 0


    exitDate: number = 0

    enterDate: number = 0

    positionType: string = TradingPositionType.None

    positionDirection: string = TradingPositionDirection.Closed;

    posChanged: boolean = false

    dateValue: number | undefined = undefined

    any: any




  //  private isOpened: boolean = false

   private currentPositionType: string = TradingPositionType.None
   private closedPositionType: string = TradingPositionType.None
    private lastPositionType: string = TradingPositionType.None
    
    private setCurrentPositionType(type: string): void {
        this.currentPositionType = type
    }
    
   
    private setClosedPositionType(type: string): void {
        this.closedPositionType = type
    }
   
   
    private setLastPositionType(type: string): void {
        this.lastPositionType = type
    }
    

    
    public getEnterPrice(): number {
        return this.enterPrice
    }

    private setEnterPrice(value: number): void {
        this.enterPrice = value
    }
  
    public getTempIncome(): number {
        return this.tempIncome
    }
    
    private setTempIncome(value: number): void {
        this.tempIncome = value
    }
    
    public geExitPrice(): number {
        return this.exitPrice
    }
    
    public  setExitPrice(value: number): void {
        this.exitPrice = value
    }
    
    public geExitDate(): number {
        return this.exitDate
    }

    private setExitDate(value: number): void {
        this.exitDate = value
    }


    public geEnterDate(): number {
        return this.enterDate
    }

    private setEnterDate(value: number): void {
        this.enterDate = value
    }
    public getCurrentPositionType(): string {
        return this.currentPositionType
    }



    public getPositionDirection(): string {
        return this.positionDirection
    }

    public setPositionDirection(value: string): void {

        this.posChanged = false;
        if (this.positionDirection == value) return;
        this.posChanged = true;
        this.positionDirection = value;
        if (this.positionDirection === TradingPositionDirection.Closed) {
            if (this.currentDate !== undefined) {
                if (this.dateValue !== undefined)
                    this.setExitDate(this.dateValue)
            }
        }
        else {
            if (this.currentDate != null) {
                if (this.dateValue !== undefined) this.setEnterDate(this.dateValue);
            }
        }
    }



    getCurrentPositionValue(): number | undefined{
        return this.currentPositionValue
    }

    public static toDirection(direction: string, position: string, last: string): string {
        if (position === last) {
            return direction
        }
        return (direction == TradingPositionDirection.Opened) ?
            TradingPositionDirection.Closed : TradingPositionDirection.Opened;
    }


    setCurrentPositionValue(value: number | undefined): void {
        if (value === this.currentPositionValue) {
            this.changed = false;
            return;
        }
        if (value === undefined) {
            this.currentPositionValue = value;
            return;
        }
        this.changed = true;

        let type = this.toPositionType(value);
        if (this.lastPositionType == type)
        {
            this.changed = false;
            return;
        }
        this.actionT2(this, type)
        let t = this.lastPositionType
        let d = this.getPositionDirection()
        this.setPositionDirection(TradingOrder.toDirection(d, type, t))
        if  (value !== undefined) this.currentPositionValue = value;
        this.currentPositionType = type;
        this.lastPositionType = type;
        this.actionT2(this, this.currentPositionType)
    }

    public  toPositionType(position: number | undefined): string {
        if (position === undefined) {
            return TradingPositionType.None;
        }
        else {

            let a = position
            let s = "";
            switch (a) {
                case 0: s = TradingPositionType.None;
                    break
                case 1: s = TradingPositionType.Short;
                    break;
                case 2: s = TradingPositionType.Long;
            }
            if (s.length > 0) {
                this.actionT2(this, s)
                return s
            }
            throw new OwnError("Illegal position type", " " + a);
        }
    }



    getMeasurementsCount(): number {
        return this.output.length
    }

    getMeasurement(i: number): IMeasurement {
        return this.output[i]
    }

    updateMeasurements(): void {
        this.update()
    }


    postSetArrow(): void {
        this.isPost = false
        this.find()
    }

    find(): void {
        if (this.isPost) { return; }
        this.positionM = this.performer.getMeasurementDC(this, this.position)
        this.buyPriceM = this.performer.getMeasurementDC(this, this.buyPrice)
        this.sellPriceM = this.performer.getMeasurementDC(this, this.sellPrice)
        this.currentDate = this.performer.getMeasurementDC(this, this.date)
    }

    zero(): void {
        this.mSellPrice = undefined
        this.mBuyPrice = undefined
    }

    showThis(s: string): void {
        this.show?.show(this, s)
    }


    closedIncome: number = 0


}

class BasicMeasurement extends Measurement implements IAssociatedObject {

    protected order: TradingOrder;

    any : any

    constructor(name: string, order: TradingOrder, type : any) {
        super(name, type)
        this.order = order;
    }
    getAssociatedObject(): IObject {
        return this.order
    }
    setAssociatedObject(obj: IObject): void {
        this.any = obj
    }

}

class PositionMeasurement extends BasicMeasurement
{
    constructor(order: TradingOrder) {
        super("Position", order, 0)
    }


    getMeasurementValue() {
        return this.order.getCurrentPositionValue()
    }
    
}

class IncomeMeasurement extends BasicMeasurement
{
    constructor(order: TradingOrder) {
        super("Income", order, 0)
    }

    getMeasurementValue() {
     /*   ++this.i
        if (this.i < 100) {
        }
*/
        return this.order.income
    }
}

class BuyTaxMeasurement extends BasicMeasurement {
    constructor(order: TradingOrder) {
        super("Buy Price", order, 0)
    }
    getMeasurementValue() {
        return this.order.mBuyPrice
    }
}


class SellTaxMeasurement extends BasicMeasurement {
    constructor(order: TradingOrder) {
        super("Sell Price", order, 0)
    }
    getMeasurementValue() {
        return this.order.mSellPrice
    }
}







