import { DateTime } from "luxon";
import { FictiveAlias } from "../Library/Fiction/FictiveAlias";
import { FictiveDataConsumer } from "../Library/Fiction/FictiveDataConsumer";
import { FictiveDataRuntime } from "../Library/Fiction/FictiveDataRuntime";
import { FictiveMeasurements } from "../Library/Fiction/FictiveMeasurements";
import { IAction } from "../Library/Interfaces/IAction";
import { IAlias } from "../Library/Interfaces/IAlias";
import { IFunc } from "../Library/Interfaces/IFunc";
import { RungeProcessor } from "../Library/Measurements/DifferentialEquations/Processors/RungeProcessor";
import { IDataConsumer } from "../Library/Measurements/Interfaces/IDataConsumer";
import { IMeasurements } from "../Library/Measurements/Interfaces/IMeasurements";
import { ITimeMeasurementProvider } from "../Library/Measurements/Interfaces/ITimeMeasurementProvider";
import { PefrormerMeasuremets } from "../Library/Measurements/PefrormerMeasuremets";
import { DataRuntimeConsumerODE } from "../Library/Runtime/DataRuntimeConsumerODE";
import { IDataRuntime } from "../Library/Runtime/Interfaces/IDataRuntime";
import { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from "./OrbitalData";
import { OrbitalForecast } from "./OrbitalForecast";
import { Performer } from "../Library/Performer";

export class OrbitalForecastCalculation extends OrbitalForecast implements IAction, IFunc<boolean> {
    constructor() {
        super();
        this.dc = this.getCategoryObject("Chart") as unknown as IDataConsumer;
        this.alias = this.getCategoryObject("Motion equations") as unknown as IAlias;
        this.measurements = this.alias as unknown as IMeasurements;

    }
    func(): boolean {
        return this.contoller.signal.aborted;
    }

    action(): void {
        var k = this.measurements;
        var rt = this.runtime.getTimeProvider();
        var t = rt.getTime();
       const item  = {
            OrbitalTime: t,
           X: this.get(0),
           Y: this.get(1),
           Z: this.get(2),
           Vx: this.get(3),
           Vy: this.get(4),
           Vz: this.get(5)
        }
        this.list.push(item);
       
    }

    public calculate = async (condition: OrbitalForecastConditionNumber, controller: AbortController): Promise<OrbitalForecastItemNumber[]> =>
    {
        this.contoller = controller;
        this.list = [];
        let processor = new RungeProcessor();
        this.runtime = new DataRuntimeConsumerODE(this.dc, processor);
        var p = new PefrormerMeasuremets();
        this.alias.setAliasValue("x", condition.X);
        p.peformCondDCFixedStepCalculation(this.runtime, this.dc, "Recursive.y", this, 0, 1, 18000, this);

        return this.list;
    }

    get(i: number): number {
        let variable = this.measurements.getMeasurement(i).getMeasurementValue();
        return this.performer.convertFromAny<number>(variable);


    }

    list: OrbitalForecastItemNumber[] = [];

    contoller: AbortController = new AbortController();

    alias: IAlias = new FictiveAlias();

    measurements: IMeasurements = new FictiveMeasurements();

    dc: IDataConsumer = new FictiveDataConsumer();

    runtime: IDataRuntime = new FictiveDataRuntime();

    performer: Performer = new Performer();

   

 
}

    


