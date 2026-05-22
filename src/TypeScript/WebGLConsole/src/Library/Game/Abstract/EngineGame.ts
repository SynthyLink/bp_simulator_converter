import type { IActionAddRemoveT } from "../../Interfaces/IActionAddRemoveT";
import type { IActionT } from "../../Interfaces/IActionT";
import type { IFactory } from "../../Interfaces/IFactory";
import type { IPlayEngine } from "../../Interfaces/IPlayEngine";
import type { IResourceItem } from "../../Resources/Infrefaces/IResourceItem";
import { ActionArrayT } from "../../Utilities/Generic/ActionArrayT";
import { AbstractGame } from "./AbstractGame";

export class EngineGame extends AbstractGame implements IPlayEngine, IActionT<number> {

    constructor(name: string, factory: IFactory, engine: IPlayEngine, useLoader: boolean,
        resources: IResourceItem[])
    {
        super(name, factory, useLoader, resources)
        this.types.push("IPlayEngine")
        this.types.push("EngineGame")
        this.typeName = "EngineGame"
        this.engine = engine
        engine.getEngineAction().addActionT(this)
    }


    cycle(time: number): void {
        if (!this.isStarted) return
        super.cycle(time)
        this.engineAction.actionT(time)
    }


    actionT(t: number): void {
        this.cycle(t)
    }

    isEmptyActionT(): boolean {
        return false
    }
 
    protected engineIsRunning: boolean = false;

    public getGameEngine(): IPlayEngine {
        return this.engine
    }

    startItself(start: boolean): boolean {
        if (!super.startItself(start)) return false
        this.engine.setEngineEnabled(start)
        if (start) {
            this.run()
        }
        return true;
    }

    run(): void {
        this.startItself(true)
    }

    isEngineEnabled(): boolean {
        return this.engineIsRunning
    }
    setEngineEnabled(enabled: boolean): boolean {
        if (enabled == this.engineIsRunning) return false
        this.engineIsRunning = enabled
        this.engine.setEngineEnabled(enabled)
        return true;
    }

 
    getEngineAction(): IActionAddRemoveT<number> {
        return this.engineAction
    }

    get ConsumerFactory(): IFactory {
        return super.ConsumerFactory
    }

    engineAction: IActionAddRemoveT<number> = new ActionArrayT()
 
    engine !: IPlayEngine
}

