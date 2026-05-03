import Game from "../common/game";
import { ScadaScene } from "../common/ScadaScene";
import { IScadaInterface } from "../Library/Scada/Interfaces/IScadaInterface";

export class CessnaScene extends ScadaScene {
    public load(): void {
        // LOAD
    }
    public start(): void {
    }
    public draw(deltaTime: number): void {
    }
    public end(): void {
    }
    constructor(game: Game, scada: IScadaInterface) {
        super(game, scada)
    }
}
