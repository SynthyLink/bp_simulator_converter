import { IAction } from "../Interfaces/IAction";
import { IDataConsumer } from "./Interfaces/IDataConsumer";
import { IMeasurements } from "./Interfaces/IMeasurements";
import { ITimeMeasurementProvider } from "./Interfaces/ITimeMeasurementProvider";
import { IDataRuntime } from "../Runtime/Interfaces/IDataRuntime";
import { TimeMeasurementProvider } from "./TimeMeasurementProvider";
import { Performer } from "../Performer";
import { IArrayElementMeasurement } from "./Interfaces/IArrayElemetMeasurements";
import { IMeasurement } from "./Interfaces/IMeasurement";
import { ArrayMeasurement } from "./ArrayMeasurement";
import { IAlias } from "../Interfaces/IAlias";
import { Variable } from "./Variable";
import { AliasNameMeasurement } from "./AliasNameMeasurement";

export class PefrormerMeasuremets {

    performer: Performer = new Performer();

    public createVariable(name: string, type: any, value: any, alias: IAlias): Variable {
        var nms = alias.getAliasNames();
        for (var n of nms) {
            if (n == name) {
                return new AliasNameMeasurement(alias, name);
            }
        }
        return new Variable(name, type, value);
    }

    public updateChildrenDats(data: IDataConsumer): void
    {
        var mea = data.getAllMeasurements();
        for (var m of mea)
        {
            m.updateMeasurements();
        }
    }


    public getArrayMeasurements(array: IArrayElementMeasurement): IMeasurement[] {
        var n = array.getMeasurementNames().length;
        var mea: IMeasurement[] = [];
        for (var i = 0; i < n; i++) {
            mea.push(new ArrayMeasurement(array, i));
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

    

    public peformFixedStepCalculation(runtime: IDataRuntime, start: number, step: number, steps: number, act: IAction): void {
        var tm: ITimeMeasurementProvider = new TimeMeasurementProvider();
        runtime.setTimeProvider(tm);
        runtime.startRuntime(start);
        var st = start;
        for (var i = 0; i < steps; i++)
        {
            tm.setTime(st);
            runtime.updateRuntime();
            act.action();
            st += step;
        }

    }
}