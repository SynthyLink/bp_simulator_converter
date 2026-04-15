import { Airplane } from "../Airplane";
import Game from "../common/game";
import { GameFactory } from "../common/GameFactory";
import { ScadaScene } from "../common/ScadaScene";
import { ScadaDesktopEngine } from "../Library/Scada/ScadaDesktopEngine";


export class AirplaneScene extends ScadaScene {
    public load(): void {
        this.game.loader.load({
			["Cessna_208_Caravan.obj"]:{ url: 'models/pLANE/Cessna_208_Caravan.obj', type: 'text'},
			["master.mtl"]:{ url: 'models/pLANE/master.mtl', type: 'text'},
			["mat0_c.jpg"]:{ url: 'models/pLANE/mat0_c.jpg', type: 'image'}
        }
        )
    }
    constructor(game: Game) {
        super(game, new ScadaDesktopEngine(new Airplane(), game, new GameFactory(), "Chart"))
    }
}


