import { IGame } from "../Library/Abstract3Game/Interfaces/IGame"
import { ScadaScene } from "../Library/Abstract3Game/Scenes/ScadaScene"
import { Airplane } from "./Airplane"


export class AirplaneScene extends ScadaScene {
    constructor(game: IGame) {
        super(game, new Airplane())
			this.addResource("models/pLANE/Cessna_208_Caravan.obj")
			this.addResource("models/pLANE/master.mtl")
			this.addResource("models/pLANE/mat0_c.jpg")
    }
}
