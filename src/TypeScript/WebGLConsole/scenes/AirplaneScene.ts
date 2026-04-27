import { ScadaScene } from "../src/Library/Abstract3Game/Scenes/ScadaScene"
import { IGame } from "../src/Library/Game/Interfaces/IGame"
import { Airplane } from "./Airplane"


export class AirplaneScene extends ScadaScene {
    constructor(game: IGame, chart: string) {
        super(game, new Airplane(), chart)
			this.addResource("models/pLANE/Cessna_208_Caravan.obj")
			this.addResource("models/pLANE/master.mtl")
			this.addResource("models/pLANE/mat0_c.jpg")
    }
}
