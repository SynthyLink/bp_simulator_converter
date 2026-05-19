import { FactoryObject } from "../FactorytObject"
import type { IGame } from "../Game/Interfaces/IGame"
import type { IGameDetector } from "../Game/Interfaces/IGameDetector"
import type { IActionT } from "../Interfaces/IActionT"
import type { IFactory } from "../Interfaces/IFactory"
import type { IShowData } from "./Interfaces/IShowData"

export class GameAction extends FactoryObject implements IActionT<IShowData> {
    constructor(name: string, factory: IFactory | undefined, action: IActionT<IGame>)
    {
        super(name, factory)
        this.name = name
        this.action = action
    }

    actionT(t: IShowData): void {
        this.t = t
        this.detectGame()
        this.action.actionT(this.game)
    }

    isEmptyActionT(): boolean {
        return false
    }

    protected detectGame(): void {
        if (this.game != undefined) return
        const gd = this.factory.getFactory<IGameDetector>("IGameDetector")
        if (gd != undefined) {
            this.game = gd.detectGame()
        }

    }

    name: string = ""
    action !: IActionT<IGame>
    game !: IGame
    t !: IShowData


}