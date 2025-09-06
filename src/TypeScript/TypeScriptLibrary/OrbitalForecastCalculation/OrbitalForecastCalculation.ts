import { FictiveAlias } from "../Library/Fiction/FictiveAlias";
import { FictiveDataConsumer } from "../Library/Fiction/FictiveDataConsumer";
import { FictiveMeasurements } from "../Library/Fiction/FictiveMeasurements";
import { IAction } from "../Library/Interfaces/IAction";
import { IAlias } from "../Library/Interfaces/IAlias";
import { IFunc } from "../Library/Interfaces/IFunc";
import { RungeProcessor } from "../Library/Measurements/DifferentialEquations/Processors/RungeProcessor";
import { IDataConsumer } from "../Library/Measurements/Interfaces/IDataConsumer";
import { IMeasurements } from "../Library/Measurements/Interfaces/IMeasurements";
import { PefrormerMeasuremets } from "../Library/Measurements/PefrormerMeasuremets";
import { DataRuntimeConsumerODE } from "../Library/Runtime/DataRuntimeConsumerODE";
import { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from "./OrbitalData";
import { OrbitalForecast } from "./OrbitalForecast";

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
        var a = k.getMeasurement(0).getMeasurementValue();
        var b = k.getMeasurement(1).getMeasurementValue();
        console.log(a, b);
    }

    public calculate = async (condition: OrbitalForecastConditionNumber, controller: AbortController): Promise<OrbitalForecastItemNumber[]> =>
    {
        this.contoller = controller;
        this.list = [];
        let processor = new RungeProcessor();
        var runtime = new DataRuntimeConsumerODE(this.dc, processor);
        var p = new PefrormerMeasuremets();
        this.alias.setAliasValue("x", condition.X);
        p.peformCondDCFixedStepCalculation(runtime, this.dc, "Recursive.y", this, 0, 1, 18000, this);

        return this.list;
    }

    list: OrbitalForecastItemNumber[] = [];

    contoller: AbortController = new AbortController();

    alias: IAlias = new FictiveAlias();

    measurements: IMeasurements = new FictiveMeasurements();

    dc: IDataConsumer = new FictiveDataConsumer();

}

    
