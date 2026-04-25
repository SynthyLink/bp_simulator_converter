import { IGame } from "../src/Library/Abstract3Game/Interfaces/IGame"
import { ScadaScene } from "../src/Library/Abstract3Game/Scenes/ScadaScene"
import { Cessna } from "./Cessna"


export class CessnaScene extends ScadaScene {
    constructor(game: IGame) {
        super(game, new Cessna())
			this.addResource("models/pLANE/Cessna_208_Caravan.obj")
			this.addResource("models/pLANE/master.mtl")
			this.addResource("models/pLANE/mat0_c.jpg")
    }
}
