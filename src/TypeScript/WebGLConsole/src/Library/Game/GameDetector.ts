import { FactoryObject } from "../FactorytObject";
import { IFactory } from "../Interfaces/IFactory";
import type { IGame } from "./Interfaces/IGame";
import type{ IGameDetector } from "./Interfaces/IGameDetector";

export class GameDetector extends FactoryObject implements IGameDetector {
    detectGame(): IGame {
        return this.game
    }

    constructor(game: IGame, factory: IFactory | undefined) {
        super("", factory)
        this.game = game
    }

    game !: IGame
}