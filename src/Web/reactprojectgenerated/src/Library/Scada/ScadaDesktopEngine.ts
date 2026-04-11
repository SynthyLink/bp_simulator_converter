import { ScadaDesktop } from "./ScadaDesktop";
import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import { IPlayEngine } from "../Interfaces/IPlayEngine";
import { IDataConsumer } from "../Measurements/Interfaces/IDataConsumer";
import { DataRuntimeConsumerEvent } from "../Event/Runtime/DataRuntimeConsumerEvent";
import { EngineTimerProvider } from "../Event/EngineTimerProvider";
import { TimerPlayEngineFactory } from "../Event/TimerPlayEngineFactory";
import { IRealtimeCollectionFactory } from "../Interfaces/IRealtimeCollectionFactory";

export class ScadaDesktopEngine extends ScadaDesktop {

    constructor(componentCollection: IComponentCollection, engine: IPlayEngine, factory: IRealtimeCollectionFactory, chart: string) {
        super(componentCollection)
        this.engine = engine
        this.chart = chart;
        this.factory = factory;
        this.createRuntime()
    }
    public createRuntime(): void {
        let co = this.componentCollection.getCategoryObject(this.chart)
        let dc = co as unknown as IDataConsumer
        let eev = this.factory.createRealtimeFromDataConsumer(dc);
        eev.setTimeProvider(new EngineTimerProvider(this.engine))
        eev.setTimerFactory(new TimerPlayEngineFactory(this.engine))
        this.runtime = eev
 }

    engine !: IPlayEngine

    chart: string = ""

    factory !: IRealtimeCollectionFactory;

}