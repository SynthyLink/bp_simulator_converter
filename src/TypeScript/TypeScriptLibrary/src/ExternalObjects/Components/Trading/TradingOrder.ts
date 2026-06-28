import { IAssociatedObject } from "../../../Library/Interfaces/IAssociatedObject";
import { IDesktop } from "../../../Library/Interfaces/IDesktop";
import { IObject } from "../../../Library/Interfaces/IObject";
import { IMeasurement } from "../../../Library/Measurements/Interfaces/IMeasurement";
import { IMeasurements } from "../../../Library/Measurements/Interfaces/IMeasurements";
import { Measurement } from "../../../Library/Measurements/Measurement";
import { DataConsumer } from "../../../Library/Measurements/DataConsumer";

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


    exitDate: number = 0




    public getEnterPrice(): number {
        return this.enterPrice
    }

    public setEnterPrice(value: number): void {
        this.enterPrice = value
    }

    tempIncome: number = 0

    public getTempIncome(): number {
        return this.tempIncome
    }

    public setTempIncome(value: number): void {
        this.tempIncome = value
    }


    public getExitPrice(): number {
        return this.exitPrice
    }

    public setExitPrice(value: number): void {
        this.exitPrice = value
    }

    public getExitDate(): number {
        return this.exitDate
    }

    public setExitDate(value: number): void {
        this.exitDate = value
    }


    getCurrentPositionValue(): number {
        return 0
    }


    getMeasurementsCount(): number {
        return this.output.length
    }
    getMeasurement(i: number): IMeasurement {
        return this.output[i]
    }
    updateMeasurements(): void {
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
}

class BasicMeasurement extends Measurement implements IAssociatedObject {

    protected order: TradingOrder;


    constructor(name: string, order: TradingOrder, type : any) {
        super(name, type)
        this.order = order;
    }
    getAssociatedObject(): IObject {
        return this.order
    }

    setAssociatedObject(obj: IObject): void {
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







