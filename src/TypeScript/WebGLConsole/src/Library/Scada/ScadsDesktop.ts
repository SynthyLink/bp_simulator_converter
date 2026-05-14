import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IObject } from "../Interfaces/IObject";
import { IStepAction } from "../Measurements/Interfaces/ISterpAction";
import { ScadaInterface } from "./ScadaInterface";

export class ScadaDesktop extends ScadaInterface {
    getStepAction(): IStepAction | undefined {
        throw new Error("Method not implemented.");
    }

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
}