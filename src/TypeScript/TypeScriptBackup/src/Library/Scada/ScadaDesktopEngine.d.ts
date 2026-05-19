import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IFactory } from "../Interfaces/IFactory";
import type { IPlayEngine } from "../Interfaces/IPlayEngine";
import type { IRealtimeCollectionFactory } from "../Interfaces/IRealtimeCollectionFactory";
import { ScadaDesktop } from "./ScadaDesktop";
export declare class ScadaDesktopEngine extends ScadaDesktop {
    constructor(componentCollection: IComponentCollection, engine: IPlayEngine, factory: IFactory, chart: string);
    createRuntime(): void;
    engine: IPlayEngine;
    chart: string;
    factory: IRealtimeCollectionFactory;
    uFactory: IFactory;
}
//# sourceMappingURL=ScadaDesktopEngine.d.ts.map