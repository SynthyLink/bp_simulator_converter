import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IFactory } from "../Interfaces/IFactory";
import type { IPlayEngine } from "../Interfaces/IPlayEngine";
import type { IRealtimeCollectionFactory } from "../Interfaces/IRealtimeCollectionFactory";
import type { IDataConsumer } from "../Measurements/Interfaces/IDataConsumer";
import { EngineTimerProvider } from "../Event/Objects/EngineTimerProvider";
import { TimerPlayEngineFactory } from "../Event/TimerPlayEngineFactory";
import { ScadaDesktop } from "./ScadaDesktop";


export class ScadaDesktopEngine extends ScadaDesktop {

    constructor(componentCollection: IComponentCollection, engine: IPlayEngine, factory: IFactory, chart: string) {
        super(componentCollection);
        this.engine = engine;
        this.chart = chart;
        var f = factory.getFactory<IRealtimeCollectionFactory>("IRealtimeCollectionFactory");
        if (f === undefined) {
            return;
        }
        this.factory = f;
        this.uFactory = factory;
        this.createRuntime();
    }
    public createRuntime(): void {
        let co = this.componentCollection.getCategoryObject(this.chart);
        let dc = co as unknown as IDataConsumer;
        let eev = this.factory.createRealtimeFromDataConsumer(dc, this.uFactory);
        eev.setTimeProvider(new EngineTimerProvider(this.engine));
        eev.setTimerFactory(new TimerPlayEngineFactory(this.engine));
        this.runtime = eev;
    }

    engine!: IPlayEngine;

    chart: string = "";

    factory!: IRealtimeCollectionFactory;

    uFactory!: IFactory;

}
