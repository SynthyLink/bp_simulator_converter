/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAction } from "../Interfaces/IAction";
import type { IDataRuntime } from "../Interfaces/IDataRuntime";
import type { IArrayElementMeasurement } from "./Interfaces/IArrayElemetMeasurements";
import type { IDataConsumer } from "./Interfaces/IDataConsumer";
import type { IMeasurement } from "./Interfaces/IMeasurement";
import type { IMeasurements } from "./Interfaces/IMeasurements";
import type { ITimeMeasurementConsumer } from "./Interfaces/ITimeMeasurementConsumer";
import type { ITimeMeasurementProvider } from "./Interfaces/ITimeMeasurementProvider";
import type { IFunc } from "../Interfaces/IFunc";
import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IObject } from "../Interfaces/IObject";
import type { IDifferentialEquationProcessor } from "./DifferentialEquations/Interfaces/IDifferentialEquationProcessor ";
import type { IRealtimeCollectionFactory } from "../Interfaces/IRealtimeCollectionFactory";
import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IObjectCollection } from "../Interfaces/IObjectCollection";
import type { IIterator } from "./Interfaces/IIterator";
import type { IExceptionHandler } from "../ErrorHandler/Interfaces/IExceptionHandler";
import type { ICategoryObject } from "../Interfaces/ICategoryObject";
import type { IFactory } from "../Interfaces/IFactory";
import { DataConsumerBoolFunc } from "./DataConsumerBoolFunc";
import { Performer } from "../Performer";
import { TimeMeasurementProvider } from "./TimeMeasurementProvider";
import { UpdateMeasurementsAction } from "./UpdateMeasurementsAction";
import { EmptyExceptionHandler } from "../ErrorHandler/EmptyExceptionHandler";
export class PerformerMeasuremets extends Performer {

     processor !: IDifferentialEquationProcessor

    realtimeEventFactory !: IRealtimeCollectionFactory

    errorHandler: IExceptionHandler = new EmptyExceptionHandler()


    constructor(factory?: IFactory) {
        super()
        if (factory === undefined) return
        var p = factory.getFactory<IDifferentialEquationProcessor>("IDifferentialEquationProcessor")
        if (p !== undefined) this.processor = p;
        var rt = factory.getFactory<IRealtimeCollectionFactory>("IRealtimeCollectionFactory")
        if (rt !== undefined) this.realtimeEventFactory = rt;
        var e = factory.getFactory<IExceptionHandler>("IExceptionHandler")
        if (e !== undefined) this.errorHandler = e;


    }



    public  getDifferentialEquationProcessor(): IDifferentialEquationProcessor {
        return this.processor
    }

    public setDifferentialEquationProcessor(p: IDifferentialEquationProcessor): void {
        this.processor = p;
    }

    public  getRealtimeEventFactory(): IRealtimeCollectionFactory {
        return this.realtimeEventFactory;
    }

    public  setRealtimeEventFactory(f: IRealtimeCollectionFactory): void {
        this.realtimeEventFactory = f;
    }

    public createUpdateMeasurementsAction(collection: IObjectCollection, act : IActionAddRemove) : void {
        let mea = this.getAll<IMeasurements>(collection, "IMeasurements")
        let mm = this.sortMeasurements(mea);
        for (let m of mm) {
            act.addAction(new UpdateMeasurementsAction(m))
        }
    }

    public setTimeProvider(timeProvider: ITimeMeasurementProvider, measurements: IMeasurements[]): void {
        for (let m of measurements) {
            let tm = this.convertObject<ITimeMeasurementConsumer, IMeasurements>(m, "ITimeMeasurementConsumer")
            if (tm.length > 0) {
                tm[0].setTimeMeasurement(timeProvider)
            }
        }
    }

    public setTimeProviderCollection(objects: IComponentCollection, timeProvider: ITimeMeasurementProvider): void {
        let objs = objects.getObjectCollection()
        for (let o of objs) {
            let tm = this.convertObject<ITimeMeasurementConsumer, IObject>(o, "ITimeMeasurementConsumer")
            if (tm.length > 0) {
                tm[0].setTimeMeasurement(timeProvider)
            }
        }
    }

    public getArrayMeasurements(array: IArrayElementMeasurement): IMeasurement[] {
        var n = array.getMeasurementNames().length;
        var mea: IMeasurement[] = [];
        for (var i = 0; i < n; i++) {
            //  mea.push(new ArrayMeasurement(array, i));
        }
        return mea;
    }

    public initStart(array: IArrayElementMeasurement, x: []): void {
        var n = x.length;
        var y = array.getMeasurementValues();
        for (var i = 0; i < n; i++) {
            y[i] = x[i];
        }
    }

    getDependentPrivate(dataConsumer: IDataConsumer, measurements: IMeasurements[]): void {

        let m = dataConsumer.getAllMeasurements();
        for (let i = 0; i < m.length; i++) {
            let mea = m[i];

            measurements.push(mea);
            // let dc = mea as unknown as IDataConsumer;
            //     if (dc instanceof IDataConsumer)
        }
    }

    public peformCondDCFixedStepCalculation(runtime: IDataRuntime, dataConsumer: IDataConsumer,
        conditionName: string, stop: IFunc<boolean>, start: number,
        step: number, steps: number, act: IAction): void {
        var cond = new DataConsumerBoolFunc(dataConsumer, conditionName);
        this.peformCondFixedStepCalculation(runtime, cond, stop, start, step, steps, act);
    }

    public peformCondFixedStepCalculation(runtime: IDataRuntime, condition: IFunc<boolean>, stop: IFunc<boolean>, start: number,
        step: number, steps: number, act: IAction): void {
        var tm: ITimeMeasurementProvider = new TimeMeasurementProvider();
        runtime.setTimeProvider(tm);
        runtime.startRuntime(start);
        var st = start;
        for (var i = 0; i < steps; i++) {
            if (stop.func()) return;
            tm.setTime(st);
            runtime.updateRuntime();
            if (condition.func()) {
                act.action();
            }
            let s = st + step;
            if (i > 0) {
                runtime.stepRuntime(st, s);
            }
            st = s;
        }
    }

    public performFixedStepCalculation(runtime: IDataRuntime, start: number, step: number, steps: number,
        stop: IFunc<boolean>, act: IAction): void {
        let tm = new TimeMeasurementProvider();
        runtime.setTimeProvider(tm);
        runtime.startRuntime(start);
        var st = start;
        var curr = start;
        for (var i = 0; i < steps; i++) {
            if (stop.func()) return;

            tm.setTime(st);
            if (i > 0) {
                runtime.stepRuntime(curr, st);
                curr = st;
            }
            runtime.updateRuntime();
            act.action();
            st += step;
        }

    }

    public async performIteratorDataConsumerMapArrayAsync(dataConsumer: IDataConsumer,
        iterator: IIterator, abort: AbortController, meaurements: string[],
        preparation?: IAction | undefined): Promise<Map<string, any>[]> {
        let map = new Map<string, IMeasurement>()
        for (var s of meaurements) {
            map.set(s, this.getMeasurementDC(dataConsumer, s))
        }

        let action = new MeasurementWrite(map)
        await this.performIteratorDataConsumerAsync(dataConsumer, iterator, abort, action, preparation)
        return action.getData()
    }

    public async performIteratorDataConsumerMapAsync(dataConsumer: IDataConsumer,
        iterator: IIterator, abort: AbortController, meaurements: Map<string, string>,
        preparation?: IAction | undefined): Promise<Map<string, any>[]> {
        let map = new Map<string, IMeasurement>()
        for (var [key, value] of meaurements) {
        let measurement = this.getMeasurementDC(dataConsumer, value)
            map.set(key, measurement)
        }
        let action = new MeasurementWrite(map)
        await this.performIteratorDataConsumerAsync(dataConsumer, iterator, abort, action, preparation)
        let data = action.getData()
        return data
    }

    public async performIteratorDataConsumerAsync(dataConsumer: IDataConsumer,
        iterator: IIterator, abort: AbortController, action: IAction,
        preparation?: IAction | undefined): Promise<void> {
        try {
            if (preparation !== undefined) preparation.action();
            var co = dataConsumer as unknown as ICategoryObject;
            var d = co.getDesktop();
            await this.startAsync(d, abort);
            var signal = abort.signal
            if (signal.aborted) {
                this.errorHandler.log("Start aborted")
                return
            }
            iterator.resetIterator()
            this.fullReset(dataConsumer)
            while (true) {
                if (signal.aborted) {
                    this.errorHandler.log("Iteration aborted")
                    return
                }
                if (!iterator.nextIterator()) {
                    return;
                }
                this.updateChildrenData(dataConsumer)
                action.action()
            }
        }
        catch (error: any) {
            this.errorHandler.handleException(error)
        }
    }


    public fullReset(consumer: IDataConsumer): void {
        let meas = consumer.getAllMeasurements();
        for (let m of meas) {
            let c = this.convertObject<IDataConsumer, IMeasurements>(m, "IDataConsumer");
            if (c.length > 0) {
                c[0].resetDataConsumer();
                this.fullReset(c[0])
            }

        }
    }
}

class MeasurementWrite implements IAction {

    constructor(map: Map<string, IMeasurement>) {
        this.map = map;
    }

    public getData(): Map<string, any>[] {
        return this.list
    }

    action(): void {
        let m = new Map<string, any>()
        for (var [key, value] of this.map.entries()) {
            let v = value.getMeasurementValue();
            m.set(key, v)
        }
        this.list.push(m)
    }
    isEmptyAction(): boolean {
        return false;
    }
    map !: Map<string, IMeasurement>
    list: Map<string, any>[] = []
}