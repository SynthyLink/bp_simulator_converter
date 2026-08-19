import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IFactory } from "../Interfaces/IFactory";
import type { IPlayEngine } from "../Interfaces/IPlayEngine";
import type { IRealtimeCollectionFactory } from "../Interfaces/IRealtimeCollectionFactory";
import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IAction } from "../Interfaces/IAction";
import { ScadaDesktop } from "./ScadaDesktop";
export declare class ScadaDesktopEngine extends ScadaDesktop {
    constructor(componentCollection: IComponentCollection, engine: IPlayEngine, factory: IFactory, chart: string);
    createRuntime(): void;
    addAction(action: IAction | undefined): void;
    removeAction(action: IAction | undefined): void;
    clearActions(): void;
    action(): void;
    isEmptyAction(): boolean;
    setScadaEnabled(enabled: boolean): void;
    actionr: IActionAddRemove;
    engine: IPlayEngine;
    chart: string;
    factory: IRealtimeCollectionFactory;
    uFactory: IFactory;
}
//# sourceMappingURL=ScadaDesktopEngine.d.ts.map