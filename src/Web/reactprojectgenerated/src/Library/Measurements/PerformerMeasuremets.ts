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
import type { IComparator } from "../Utilities/Sort/Interfaces/IComparator";
import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IObject } from "../Interfaces/IObject";
import type { IDifferentialEquationProcessor } from "./DifferentialEquations/Interfaces/IDifferentialEquationProcessor ";
import type { IRealtimeCollectionFactory } from "../Interfaces/IRealtimeCollectionFactory";
import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IObjectCollection } from "../Interfaces/IObjectCollection";
import { DataConsumerBoolFunc } from "./DataConsumerBoolFunc";
import { Performer } from "../Performer";
import { TimeMeasurementProvider } from "./TimeMeasurementProvider";
import { ActionArray } from "../Utilities/Generic/ActionArray";
import { UpdateMeasurementsAction } from "./UpdateMeasurementsAction";

export class PerformerMeasuremets {

    static processor: IDifferentialEquationProcessor

    static realtimeEventFactory: IRealtimeCollectionFactory


    public static getDifferentialEquationProcessor(): IDifferentialEquationProcessor {
        return this.processor
    }

    public static setDifferentialEquationProcessor(p: IDifferentialEquationProcessor): void { 
        this.processor = p;
    }

    public static getRealtimeEventFactory(): IRealtimeCollectionFactory {
        return this.realtimeEventFactory;
    }

    public static setRealtimeEventFactory(f: IRealtimeCollectionFactory): void {
        this.realtimeEventFactory = f;
    }

    public createUpdateMeasurementsAction(collection: IObjectCollection): IActionAddRemove {
        let act = new ActionArray();
        let mea = this.performer.getAll<IMeasurements>(collection, "IMeasurements")
        let mm = this.performer.sortMeasurements(mea);
        for (let m of mm) {
            act.addAction(new UpdateMeasurementsAction(m))
        }
        return act;
    }

    constructor() {

    }

    performer: Performer = new Performer();

    protected mCompatator !: IComparator<IMeasurements>;

   

    public setTimeProvider(timeProvider: ITimeMeasurementProvider, measurements: IMeasurements[]): void {
        for (let m of measurements) {
            let tm = this.performer.convertObject<ITimeMeasurementConsumer, IMeasurements>(m, "ITimeMeasurementConsumer")
            if (tm.length > 0) {
                tm[0].setTimeMeasurement(timeProvider)
            }
        }
    }
    


    public setTimeProviderCollection(objects: IComponentCollection, timeProvider: ITimeMeasurementProvider): void {
        let objs = objects.getObjectCollection()
        for (let o of objs) {
            let tm = this.performer.convertObject<ITimeMeasurementConsumer, IObject>(o, "ITimeMeasurementConsumer")
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
            if (measurements.find(mea => true) === undefined) {

            }
            else {
                measurements.push(mea);
                let dc = mea as unknown as IDataConsumer;
                //     if (dc instanceof IDataConsumer)

            }
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

    public fullReset(consumer: IDataConsumer): void {
        let meas = consumer.getAllMeasurements();
        for (let m of meas) {
            let c = this.performer.convertObject<IDataConsumer, IMeasurements>(m, "IDataConsumer");
            if (c.length > 0) {
                c[0].resetDataConsumer();
                this.fullReset(c[0])
            }

        }
    }

}