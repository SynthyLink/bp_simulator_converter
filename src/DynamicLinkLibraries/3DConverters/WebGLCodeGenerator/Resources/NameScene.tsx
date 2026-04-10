import { Cessna } from "../Cessna";
import Game from "../common/game";
import { ScadaScene } from "../common/ScadaScene";
import { ScadaDesktopEngine } from "../Library/Scada/ScadaDesktopEngine";
import { Motion6DRealtimeFactory } from "../Library/Motion6D/Runtime/Event/Motion6DRealtimeFactory";

export class CessnaScene extends ScadaScene {
    public load(): void {
        this.game.loader.load({
            // LOAD
        }
        )
    }
        constructor(game: Game) {
            super(game, new ScadaDesktopEngine(new Cessna(), game, new Motion6DRealtimeFactory(), "Chart"))
    }
}