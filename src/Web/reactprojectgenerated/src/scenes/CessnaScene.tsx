import { Cessna } from "../Cessna";
import Game from "../common/game";
import { ScadaScene } from "../common/ScadaScene";
import { ScadaDesktop } from "../Library/Scada/ScadsDessktop";


export class CessnaScene extends ScadaScene {
    public load(): void {
        this.game.loader.load({
            // LOAD
        });
    }
    constructor(game: Game) {
        super(game, new ScadaDesktop(new Cessna()))
    }
}
