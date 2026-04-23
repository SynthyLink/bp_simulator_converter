
import { DataRuntimeConsumerEvent } from "../../../Event/Runtime/DataRuntimeConsumerEvent";
import { Motion6DPerformer } from "../../Motion6DPerformer";
import type { IActionAddRemove } from "../../../Interfaces/IActionAddRemove";
import type { IObject } from "../../../Interfaces/IObject";
import type { IRealtimeCollection } from "../../../Interfaces/IRealtimeCollection";
import type { IDataConsumer } from "../../../Measurements/Interfaces/IDataConsumer";
import type { IFactory } from "../../../Interfaces/IFactory";

export class DataRuntimeConsumerMotion6DEvent extends DataRuntimeConsumerEvent {

    protected motionPefromer: Motion6DPerformer = new Motion6DPerformer();
    constructor(dataConsumer: IDataConsumer, factory: IFactory) {
        super(dataConsumer, factory);
    }

    getExtenalUpdate(obj: IObject | undefined, realime: IRealtimeCollection): IActionAddRemove {
        var a = super.getExtenalUpdate(obj, realime)
        this.motionPefromer = new Motion6DPerformer()
        var act = this.motionPefromer.createUpdateFramesAction(this);
        a.addAction(act);
        return a;
    }

}