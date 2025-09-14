/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IAction } from "../../../Library/Interfaces/IAction";
import type { IAlias } from "../../../Library/Interfaces/IAlias";
import type { IFunc } from "../../../Library/Interfaces/IFunc";
import { RungeProcessor } from "../../../Library/Measurements/DifferentialEquations/Processors/RungeProcessor";
import type { IDataConsumer } from "../../../Library/Measurements/Interfaces/IDataConsumer";
import type { IMeasurement } from "../../../Library/Measurements/Interfaces/IMeasurement";
import type { IMeasurements } from "../../../Library/Measurements/Interfaces/IMeasurements";
import { PefrormerMeasuremets } from "../../../Library/Measurements/PefrormerMeasuremets";
import { Performer } from "../../../Library/Performer";
import { DataRuntimeConsumerODE } from "../../../Library/Runtime/DataRuntimeConsumerODE";
import type { IDataRuntime } from "../../../Library/Runtime/Interfaces/IDataRuntime";
import type { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from "./OrbitalData";
import { OrbitalForecast } from "./OrbitalForecast";

 export  class OrbitalForecastCalculation extends OrbitalForecast implements IAction, IFunc<boolean> {
    constructor() {
        super();
        this.dc = this.getCategoryObject("Chart") as unknown as IDataConsumer;
        this.alias = this.getCategoryObject("Motion equations") as unknown as IAlias;
        this.measurements = this.alias as unknown as IMeasurements;
        this.performer.getMeasurementsMMap(this.measurements, this.map)

    }
    func(): boolean {
        return this.contoller.signal.aborted;
    }

    action(): void {
        // eslint-disable-next-line no-var
        let rt = this.runtime.getTimeProvider();
        let t = rt.getTime();
        const item = {
            OrbitalTime: t,
            X: this.get("x"),
            Y: this.get("y"),
            Z: this.get("z"),
            Vx: this.get("u"),
            Vy: this.get("v"),
            Vz: this.get("w")
        };
        this.list.push(item);
       
    }

    public calculate = async (condition: OrbitalForecastConditionNumber, controller: AbortController): Promise<OrbitalForecastItemNumber[]> =>
    {
        this.contoller = controller;
        this.list = [];
        let processor = new RungeProcessor();
        this.runtime = new DataRuntimeConsumerODE(this.dc, processor);
        let p = new PefrormerMeasuremets();
        this.alias.setAliasValue("x", condition.X);
        p.peformCondDCFixedStepCalculation(this.runtime, this.dc, "Recursive.y", this, 1770457504, 1, 18000, this);

        return this.list;
    }

    get(i: string): number {
        let variable = this.map.get(i);
        return this.performer.convertFromAny<number>(variable?.getMeasurementValue());


    }

    list: OrbitalForecastItemNumber[] = [];

    contoller: AbortController = new AbortController();

    alias !: IAlias;

    measurements !: IMeasurements;

    dc! : IDataConsumer;

    runtime !: IDataRuntime;

    performer: Performer = new Performer();

    map: Map<string, IMeasurement> = new Map();
};

    


