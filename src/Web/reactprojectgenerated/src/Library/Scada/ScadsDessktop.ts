import { FictiveDesktop } from "../Fiction/FictiveDesktop";
import { IComponentCollection } from "../Interfaces/IComponentCollection";
import { IObject } from "../Interfaces/IObject";
import { ScadaInterface } from "./ScadaInterface";

export class ScadaDesktop extends ScadaInterface {
    getObjectCollection(): IObject[] {
        return this.components.getObjectCollection()
    }
    getScadaObject<T>(name: string, type: string): T[] {
        return this.performer.getCollectionObject<T>(this.components, name, type)
    }
    protected components: IComponentCollection = new FictiveDesktop()
}