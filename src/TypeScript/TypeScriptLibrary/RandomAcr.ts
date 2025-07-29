import { IDataConsumer } from "./Library/Measurements/Interfaces/IDataConsumer";
import { PefrormerMeasuremets } from "./Library/Measurements/PefrormerMeasuremets";
import { DetaRuntimeConsumer } from "./Library/Runtime/DetaRuntimeConsumer";
import { IDataRuntime } from "./Library/Runtime/Interfaces/IDataRuntime";
import { Random } from "./src/Random";

export class RandomAct  extends Random
{
    dc !: IDataConsumer;
    constructor() {
        super();
        var co = this.getCategoryObject("Chart")
        this.dc = co as unknown as IDataConsumer;
    }

    action(): void {
        var k = this.dc.getAllMeasurements()[0];
        var a = k.getMeasurement(0).getMeasurementValue();
        console.log(a);
    }

    public test(): void {
        var runtime: IDataRuntime = new DetaRuntimeConsumer(this.dc);
        var p: PefrormerMeasuremets = new PefrormerMeasuremets();
        p.peformFixedStepCalculation(runtime, 0, 1, 1000, this);
    }
}