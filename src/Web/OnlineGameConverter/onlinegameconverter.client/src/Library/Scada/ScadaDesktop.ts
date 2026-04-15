import { IComponentCollection } from "../Interfaces/IComponentCollection";
import { IObject } from "../Interfaces/IObject";
import { ScadaInterface } from "./ScadaInterface";
import { IRealtimeCollection } from "../Interfaces/IRealtimeCollection";

export abstract class  ScadaDesktop extends ScadaInterface {

    constructor(componentCollection: IComponentCollection) {
        super()
        this.types.push("ScadaDesktop")
        this.typeName = "ScadaDesktop"
        this.componentCollection = componentCollection;
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

    public abstract createRuntime(): void



}