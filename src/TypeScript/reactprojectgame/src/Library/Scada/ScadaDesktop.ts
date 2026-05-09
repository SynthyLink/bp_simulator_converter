import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IComponentCollectionHolder } from "../Interfaces/IComponentCollectionHolder";
import type { IObject } from "../Interfaces/IObject";
import type { IRealtimeCollection } from "../Interfaces/IRealtimeCollection";
import { ScadaInterface } from "./ScadaInterface";

export  class ScadaDesktop extends ScadaInterface implements IComponentCollectionHolder {

    constructor(componentCollection: IComponentCollection) {
        super()
        this.types.push("ScadaDesktop")
        this.types.push("IComponentCollectionHolder")
        this.typeName = "ScadaDesktop"
        this.componentCollection = componentCollection;
    }
    getComponentCollection(): IComponentCollection {
        return this.componentCollection
    }
    setComponentCollection(collection: IComponentCollection): void {
    }
    
    getObjectCollection(): IObject[] {
        return this.componentCollection.getObjectCollection()
    }
    getScadaObject<T>(name: string, type: string): T[] {

        return this.performer.getCollectionObject<T>(this.componentCollection, name, type)
    }

    protected componentCollection !: IComponentCollection;

    protected runtime !: IRealtimeCollection;


    setScadaEnabled(enabled: boolean): void {
        this.runtime.setComponentCollectionRunning(enabled);
    }

    isScadaEnabled(): boolean {
        return this.runtime.isComponentCollectionRunning();
    }

    public createRuntime(): void {

    }



}