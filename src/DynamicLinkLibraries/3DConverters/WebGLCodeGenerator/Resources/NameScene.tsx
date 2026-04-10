import { Cessna } from "../Cessna";
import Game from "../common/game";
import { ScadaScene } from "../common/ScadaScene";
import { ScadaDesktopEngine } from "../Library/Scada/ScadaDesktopEngine";
import { Motion6DRealtimeFactory } from "../Library/Motion6D/Runtime/Event/Motion6DRealtimeFactory";

export class CessnaScene extends ScadaScene {
    public load(): void {
        this.game.loader.load({
			["Cessna_208_Caravan.obj"]:{ url: 'models/pLANE/Cessna_208_Caravan.obj', type: 'text'},
			["master.mtl"]:{ url: 'models/pLANE/master.mtl', type: 'text'},
			["mat0_c.jpg"]:{ url: 'models/pLANE/mat0_c.jpg', type: 'image'}
        }
        )
    }
    constructor(game: Game) {
        super(game, new ScadaDesktopEngine(new Cessna(), game, new Motion6DRealtimeFactory(), "Chart" ))
    }
}
