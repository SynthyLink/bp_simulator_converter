import { FictiveDesktop } from "../Fiction/FictiveDesktop";
import { IComponentCollection } from "../Interfaces/IComponentCollection";
import { IObject } from "../Interfaces/IObject";
import { ScadaInterface } from "./ScadaInterface";

export class ScadaDesktop extends ScadaInterface {

    constructor(componentCollection: IComponentCollection) {
        super()
        this.types.push("ScadaDesktop")
        this.typeName = "ScadaDesktop"
        console.log("GGGG")
        console.log(componentCollection)
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