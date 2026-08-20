import type { IAssociatedObject } from "../../../Library/Interfaces/IAssociatedObject";
import type { IDesktop } from "../../../Library/Interfaces/IDesktop";
import type { IObject } from "../../../Library/Interfaces/IObject";
import type { IMeasurement } from "../../../Library/Measurements/Interfaces/IMeasurement";
import type { IMeasurements } from "../../../Library/Measurements/Interfaces/IMeasurements";
import { Measurement } from "../../../Library/Measurements/Measurement";
import { DataConsumer } from "../../../Library/Measurements/DataConsumer";
import { TradingPositionDirection, TradingPositionType } from "./TradingPositionEnums";
import { OwnError } from "../../../Library/ErrorHandler/OwnError";

export class TradingOrder extends DataConsumer implements IMeasurements
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

    changed: boolean = false;

    isPost: boolean = false;

    currentPositionValue: number | undefined = undefined;

    isRunning: boolean = false;

    isMeaUpdated: boolean = false;

    income: number = 0;


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

    private isOpened: boolean = false

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

    private setExitPrice(value: number): void {
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

        let type = TradingOrder.toPositionType(value);
        if (this.lastPositionType == type) { this.changed = false; return; }
        let t = this.lastPositionType
        let d = this.getPositionDirection()
        this.setPositionDirection(TradingOrder.toDirection(d, type, t))
        if  (value !== undefined) this.currentPositionValue = value;
        this.currentPositionType = type;
         this.lastPositionType = type;
    }

    public static  toPositionType(position: number | undefined): string {
        if (position === undefined) {
            return TradingPositionType.None;
        }
        else {

            let a = position
            switch (a) {
                case 0: return TradingPositionType.None;
                case 1: return TradingPositionType.Short;
                case 2: return TradingPositionType.Long;

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


    closedIncome: number = 0

    update(): void {
        this.zero()
        this.dateValue = this.toNullabe(this.currentDate)
        this.currentPositionValue = this.toNullabe(this.positionM)
        if (!this.changed) {
            return;
        }
        if (this.positionDirection == TradingPositionDirection.Closed) {
            if (this.tempIncome == 0) {
                return;
            }
            if (this.tempIncome < 0) {
                this.mSellPrice = this.toNullabe(this.sellPriceM)
                if (this.mSellPrice !== undefined) {
                    this.exitPrice = this.mSellPrice
                    this.closedIncome = this.tempIncome + this.exitPrice;
                    this.income += this.closedIncome;
                }
            }
            else {
                this.mBuyPrice = this.toNullabe(this.buyPriceM)
                if (this.mBuyPrice !== undefined) {
                    this.exitPrice = this.mBuyPrice
                    this.closedIncome = this.tempIncome - this.exitPrice;
                    this.income += this.closedIncome;
                }
            }
        }

  }
    /*

           void Update()
        {
            Zero();
            dateValue = currentDate.ToNullable<double>();
            CurrentPositionValue = positionM.ToNullable<double>();
            if (!changed)
            {
                return;
            }
            if (PositionDirection == PositionDirection.Closed)
            {
                if (TempIncome == 0)
                {
                    return;
                }
                if (TempIncome < 0)
                {
                    mSellPrice = sellPriceM.ToNullable<double>();
                    ExitPrice = mSellPrice.Value;
                    ClosedIncome = TempIncome + ExitPrice;
                    income += ClosedIncome;
                }
                else
                {
                    mBuyPrice = buyPriceM.ToNullable<double>();
                    ExitPrice = mBuyPrice.Value;
                    ClosedIncome = TempIncome - ExitPrice;
                    income += ClosedIncome;
                }
            }
            else
            {
                ClosedPositionType = CurrentPositionType;
                if (CurrentPositionType == PositionType.Long)
                {
                    mBuyPrice = buyPriceM.ToNullable<double>();
                    EnterPrice = mBuyPrice.Value;
                    TempIncome = -EnterPrice;
                }
                else
                {
                    mSellPrice = sellPriceM.ToNullable<double>();
                    EnterPrice = mSellPrice.Value;
                    TempIncome = EnterPrice;
                }
            }
            if (posChanged)
            {
                orderChanged?.Invoke(this, PositionDirection);
            }
        }

    */
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
    i: number = 0
    constructor(order: TradingOrder) {
        super("Income", order, 0)
    }

    getMeasurementValue() {
        ++this.i
        if (this.i < 100) {
            console.log(this.order.income)
        }

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







