import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IComponentCollectionHolder } from "../Interfaces/IComponentCollectionHolder";
import type { IObject } from "../Interfaces/IObject";
import type { IRealtimeCollection } from "../Interfaces/IRealtimeCollection";
import type { IStepAction } from "../Measurements/Interfaces/IStepAction";
import { ScadaInterface } from "./ScadaInterface";
export declare class ScadaDesktop extends ScadaInterface implements IComponentCollectionHolder {
    constructor(componentCollection: IComponentCollection);
    getComponentCollection(): IComponentCollection;
    setComponentCollection(collection: IComponentCollection): void;
    getObjectCollection(): IObject[];
    getScadaObject<T>(name: string, type: string): T[];
    protected componentCollection: IComponentCollection;
    protected runtime: IRealtimeCollection;
    setScadaEnabled(enabled: boolean): void;
    isScadaEnabled(): boolean;
    createRuntime(): void;
    getStepAction(): IStepAction | undefined;
}
//# sourceMappingURL=ScadaDesktop.d.ts.map