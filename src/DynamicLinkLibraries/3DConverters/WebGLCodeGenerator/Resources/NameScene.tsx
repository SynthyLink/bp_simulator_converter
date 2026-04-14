import { Cessna } from "../Cessna";
import Game from "../common/game";
import { ScadaScene } from "../common/ScadaScene";
import { Motion6DFactory } from "../Library/Motion6D/Motion6DFactory";
import { ScadaDesktopEngine } from "../Library/Scada/ScadaDesktopEngine";


export class CessnaScene extends ScadaScene {
    public load(): void {
        this.game.loader.load({
            // LOAD
        }
        )
    }
    constructor(game: Game) {
        super(game, new ScadaDesktopEngine(new Cessna(), game, new Motion6DFactory(), "Chart"))
    }
}


