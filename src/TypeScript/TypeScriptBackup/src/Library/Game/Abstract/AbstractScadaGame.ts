import type { IComponentCollection } from "../../Interfaces/IComponentCollection";
import type { IFactory } from "../../Interfaces/IFactory";
import type { IScadaInterface } from "../../Scada/Interfaces/IScadaInterface";
import { AbstractGame } from "./AbstractGame";

export class AbstractScadaGame extends AbstractGame
{
    run(): void {
    }

    startItself(start: boolean): boolean {
        return true
    }

    loadItself(load: boolean): boolean {
        return true
    }
    
    scada !: IScadaInterface

    constructor(name: string, factory: IFactory | undefined, colection : IComponentCollection) {
    {
        super(name, factory)
        this.post(factory, colection)
    }

    public post(factory: IFactory | undefined, colection : IComponentCollection) : void
    {

    }
}