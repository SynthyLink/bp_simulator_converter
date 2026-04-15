import { Cessna } from "../Cessna";
import Game from "../common/game";
import { GameFactory } from "../common/GameFactory";
import { ScadaScene } from "../common/ScadaScene";
import { ScadaDesktopEngine } from "../Library/Scada/ScadaDesktopEngine";


export class CessnaScene extends ScadaScene {
    public load(): void {
        this.game.loader.load({
            // LOAD
        }
        )
    }
    constructor(game: Game) {
        super(game, new ScadaDesktopEngine(new Cessna(), game, new GameFactory(), "Chart"))
    }
}


