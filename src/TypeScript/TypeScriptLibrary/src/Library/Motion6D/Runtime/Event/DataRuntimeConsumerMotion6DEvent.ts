
import { DataRuntimeConsumerEvent } from "../../../Event/Runtime/DataRuntimeConsumerEvent";
import { Motion6DPerformer } from "../../Motion6DPerformer";
import type { IActionAddRemove } from "../../../Interfaces/IActionAddRemove";
import type { IObject } from "../../../Interfaces/IObject";
import type { IRealtimeCollection } from "../../../Interfaces/IRealtimeCollection";
import type { IDifferentialEquationProcessor } from "../../../Measurements/DifferentialEquations/Interfaces/IDifferentialEquationProcessor ";
import type { IDataConsumer } from "../../../Measurements/Interfaces/IDataConsumer";

export class DataRuntimeConsumerMotion6DEvent extends DataRuntimeConsumerEvent {

    protected motionPefromer: Motion6DPerformer = new Motion6DPerformer();
    constructor(dataConsumer: IDataConsumer, processor: IDifferentialEquationProcessor) {
        super(dataConsumer, processor);
        console.log("CCC", this)
    }

    getExtenalUpdate(obj: IObject | undefined, realime: IRealtimeCollection): IActionAddRemove {
        var a = super.getExtenalUpdate(obj, realime)
        console.log("EEEE", a)
        this.motionPefromer = new Motion6DPerformer()
        var act = this.motionPefromer.createUpdateFramesAction(this);
        a.addAction(act);
        return a;
    }

}