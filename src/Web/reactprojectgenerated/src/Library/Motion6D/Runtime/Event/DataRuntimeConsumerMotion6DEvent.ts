
import { DataRuntimeConsumerEvent } from "../../../Event/Runtime/DataRuntimeConsumerEvent";
import type { IDifferentialEquationProcessor } from "../../../Measurements/DifferentialEquations/Interfaces/IDifferentialEquationProcessor ";
import type { IDataConsumer } from "../../../Measurements/Interfaces/IDataConsumer";

export class DataRuntimeConsumerMotion6DEvent extends DataRuntimeConsumerEvent {
    constructor(dataConsumer: IDataConsumer, processor: IDifferentialEquationProcessor) {
        super(dataConsumer, processor);
    }
}