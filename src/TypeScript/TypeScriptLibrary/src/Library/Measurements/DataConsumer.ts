import { CategoryObject } from "../CategoryObject";
import { ActionArray } from "../Utilities/Generic/ActionArray";
import type { IAction } from "../Interfaces/IAction";
import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IAddRemove } from "../Interfaces/IAddRemove";
import type { ICategoryObject } from "../Interfaces/ICategoryObject";
import type { ICheck } from "../Interfaces/ICheck";
import type { ICheckHolder } from "../Interfaces/ICheckHolder";
import type { IDesktop } from "../Interfaces/IDesktop";
import type { IEvent } from "../Interfaces/IEvent";
import type { IEventHandler } from "../Interfaces/IEventHandler";
import type { IPostSetArrow } from "../Interfaces/IPostSetArrow";
import type { IPrintedObject } from "../Interfaces/IPrintedObject";
import type { IPrinter } from "../Interfaces/IPrinter";
import type { IDataConsumer } from "./Interfaces/IDataConsumer";
import type { IIterator } from "./Interfaces/IIterator";
import type { IIteratorConsumer } from "./Interfaces/IIteratorConsumer";
import type { IMeasurements } from "./Interfaces/IMeasurements";
import type { ITimeMeasurementConsumer } from "./Interfaces/ITimeMeasurementConsumer";
import type { ITimeMeasurementProvider } from "./Interfaces/ITimeMeasurementProvider";

export class DataConsumer extends CategoryObject implements IDataConsumer, IPostSetArrow,
    ITimeMeasurementConsumer, IPrintedObject, ICheckHolder, IIteratorConsumer, IEventHandler, IAddRemove, IAction
{
    constructor(desktop: IDesktop, name: string)
    {
        super(desktop, name)
        this.typeName = "DataConsumer";
        this.types.push("DataConsumer");
        this.types.push("IDataConsumer");
        this.types.push("IPostSetArrow");
        this.types.push("ITimeMeasurementConsumer");
        this.types.push("IPrintedObject");
        this.types.push("ICheckHolder");
        this.types.push("IIteratorConsumer");
        this.types.push("IEventHandler");
        this.types.push("IAddRemove");
        this.tms = this;
        this.dataConsumer = this;
        this.currentAction = this.fictiveAvtion;
    }
    action(): void {
        this.currentAction.action();
    }
    getAddRemoveType(): string {
        return ""
    }
    getChildernT(): IEvent[] {
        return this.events;
    }
    addChildT(child: IEvent): void {
        this.events.push(child)
    }
    removeChildT(child: IEvent): void {
        this.performer.remove(this.events, child)
    }
    resetDataConsumer(): void {
    }
    addIterator(iterator: IIterator): void {
        this.iterator = iterator;
    }
    removeIterator(iterator: IIterator): void {
    }
    getCheck(): ICheck {
        return this.checker;
    }
    setCheck(check: ICheck): void {
        this.checker = check;
    }

    print(printer: IPrinter): void {
        for (var m of this.measurements) {
            let co = m as unknown as ICategoryObject;
            let s = co.getCategoryObjectName() + "\t";
            let n = m.getMeasurementsCount();
            for (let i = 0; i < n; i++) {
                var mm = m.getMeasurement(i);
                var v = mm.getMeasurementValue();
                s += v + "\t";
            }
            printer.print(s);
        }
    }

    getInternalTime(): number
    {
        var tm = this.timeMeasurement;

        return tm.getTime();
    }

    
    getTimeMeasurement(): ITimeMeasurementProvider {
        return this.timeMeasurement;
    }

    setTimeMeasurement(measurement: ITimeMeasurementProvider): void {
        this.timeMeasurement = measurement;            ;
    }

    postSetArrow(): void {
        for (let event of this.events) {
            event.eventAction().addAction(this.eventAvtion)
        }

    }

   
    getAllMeasurements(): IMeasurements[] {
        return this.measurements;
    }

    addMeasurements(item: IMeasurements): void {
        this.measurements.push(item);
    }




    private measurements: IMeasurements[] = [];


    tms!: ITimeMeasurementConsumer;

    timeMeasurement !: ITimeMeasurementProvider;

    success: boolean = true;

    protected dataConsumer !: IDataConsumer;

    protected iterator !: IIterator;

    protected events: IEvent[] = [];

    protected eventAvtion: IActionAddRemove = new ActionArray()

    protected fictiveAvtion: IActionAddRemove = new ActionArray()

    protected currentAction: IActionAddRemove = new ActionArray()



}
