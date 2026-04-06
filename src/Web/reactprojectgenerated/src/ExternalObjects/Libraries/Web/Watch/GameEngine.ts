import Game from "../../../../common/game";
import { ActionArrayT } from "../../../../Library/Utilities/Generic/ActionArrayT";
import type { GameOptions } from "../../../../common/GameOptions";
import type { IPlayEngine } from "../../../../Library/Interfaces/IPlayEngine";
import type { IActionAddRemoveT } from "../../../../Library/Interfaces/IActionAddRemoveT";
import type { IActionT } from "../../../../Library/Interfaces/IActionT";

export class GameEngine extends Game implements IPlayEngine, IActionT<number> {

    protected actionGame(time: number) {
        this.curentAction.actionT(time)
    }

    constructor(canvas: HTMLCanvasElement, options?: GameOptions) {
        super(canvas, options)
        this.engineAction.addActionT(this);
    }
    actionT(t: number): void {
        this.currentTime = t;
    }
    isEngineEnabled(): boolean {
        return this.isEnabled
    }
    setEngineEnabled(enabled: boolean): void {
        if (enabled == this.isEnabled) return
        this.isEnabled = enabled
        this.curentAction = (enabled) ? this.engineAction : this.emptyAction
    }
    getPlayEngineTime(): number {
        return this.currentTime
    }
    getEngineAction(): IActionAddRemoveT<number> {
        return this.engineAction;
    }

    engineAction: IActionAddRemoveT<number> = new ActionArrayT()

    emptyAction: IActionAddRemoveT<number> = new ActionArrayT()

    curentAction: IActionAddRemoveT<number> = new ActionArrayT()

    currentTime: number = Math.min()

    isEnabled: boolean = false

}