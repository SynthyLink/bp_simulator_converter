import { Cessna } from "../Cessna";
import  Game  from "../common/game";
import { GameFactory } from "../common/GameFactory";
import { ScadaScene } from "../common/ScadaScene";


export class CessnaScene extends ScadaScene {
    public load(): void {
        this.game.loader.load({
            // LOAD
        })
    }
    constructor(game: Game) {
        super(game, new GameFactory(), new Cessna())
    }
}
