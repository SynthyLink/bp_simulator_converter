import { FictiveDesktop } from "../Fiction/FictiveDesktop";
import { IComponentCollection } from "../Interfaces/IComponentCollection";
import { IObject } from "../Interfaces/IObject";
import { ScadaInterface } from "./ScadaInterface";

export class ScadaDesktop extends ScadaInterface  {

    constructor(componentCollection: IComponentCollection) {
        super()
        this.componentCollection = componentCollection;
        this.name = this.performer.getName(componentCollection)
        this.typeName = "ScadaDesktop"
        this.types.push("ScadaDesktop")
    }

    getObjectCollection(): IObject[] {
        
        return this.componentCollection.getObjectCollection()
    }

    getScadaObject<T>(name: string, type: string): T[] {
        return this.performer.getCollectionObject<T>(this.componentCollection, name, type)
    }
    protected componentCollection: IComponentCollection = new FictiveDesktop()
}