import { IActionAddRemoveT } from "../../Interfaces/IActionAddRemoveT";
import { IFactory } from "../../Interfaces/IFactory";
import { IPlayEngine } from "../../Interfaces/IPlayEngine";
import { ActionArrayT } from "../../Utilities/Generic/ActionArrayT";
import { AbstractGame } from "./AbstractGame";

export abstract class EngineGame extends AbstractGame implements IPlayEngine {

    constructor(name: string, factory: IFactory) {
        super(name, factory)
        this.types.push("IPlayEngine")
        this.types.push("EngineGame")
        this.typeName = "EngineGame"
  }
    protected engineAction: IActionAddRemoveT<number> = new ActionArrayT()

    protected engineIsRunning: boolean = false;

    startItself(start: boolean): boolean {
        if (!super.startItself(start)) return false
        this.setEngineEnabled(start)
        if (start) {
            this.run()
        }
        return true;
    }

    isEngineEnabled(): boolean {
        return this.engineIsRunning
    }
    setEngineEnabled(enabled: boolean): boolean {
        if (enabled == this.engineIsRunning) return false
        this.engineIsRunning = enabled
        return true;
    }

    getEngineAction(): IActionAddRemoveT<number> {
        return this.engineAction;
    }

    cycle(time: number): void {
        if (!this.isStarted) return
        this.engineAction.actionT(time)
        super.cycle(time)
    }
}