import { Airplane } from "../Airplane";
import  Game  from "../common/game";
import { GameFactory } from "../common/GameFactory";
import { ScadaScene } from "../common/ScadaScene";


export class AirplaneScene extends ScadaScene {
    public load(): void {
        this.game.loader.load({
			["Cessna_208_Caravan.obj"]:{ url: 'models/pLANE/Cessna_208_Caravan.obj', type: 'text'},
			["master.mtl"]:{ url: 'models/pLANE/master.mtl', type: 'text'},
			["mat0_c.jpg"]:{ url: 'models/pLANE/mat0_c.jpg', type: 'image'}
			})
			this.addResource("models/pLANE/Cessna_208_Caravan.obj")
			this.addResource("models/pLANE/master.mtl")
			this.addResource("models/pLANE/mat0_c.jpg")
    }
    constructor(game: Game) {
        super(game, new GameFactory(), new Airplane())
    }
}
