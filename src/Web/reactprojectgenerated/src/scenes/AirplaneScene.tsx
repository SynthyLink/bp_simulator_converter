import Game from "../common/game";
import { ScadaScene } from "../common/ScadaScene";
import { ScadaDesktopEngine } from "../Library/Scada/ScadaDesktopEngine";
import { Airplane } from "../Airplane";
import { Motion6DRealtimeFactory } from "../Library/Motion6D/Runtime/Event/Motion6DRealtimeFactory";
import { UniversalFactory } from "../Library/UniversalFactory";

let factory = new UniversalFactory();

export class AirplaneScene extends ScadaScene {
    public load(): void {
        this.game.loader.load({
			["Airplane_208_Caravan.obj"]:{ url: 'models/pLANE/Airplane_208_Caravan.obj', type: 'text'},
			["master.mtl"]:{ url: 'models/pLANE/master.mtl', type: 'text'},
			["mat0_c.jpg"]:{ url: 'models/pLANE/mat0_c.jpg', type: 'image'}
        }
        )
    }
    constructor(game: Game) {
        super(game, new ScadaDesktopEngine(new Airplane(), game, factory, "Chart"))
    }
}
