import { IGame } from "../src/Library/Game/Interfaces/IGame";
import { ScadaScene } from "../src/Library/Game/Scenes/ScadaScene";
import { Airplane } from "./Airplane";



export class AirplaneScene extends ScadaScene {
    constructor(game: IGame, chart: string) {
        super(game, new Airplane(), chart)
			this.addResource("static/models/pLANE/Cessna_208_Caravan.obj")
			this.addResource("static/models/pLANE/master.mtl")
			this.addResource("static/models/pLANE/mat0_c.jpg")
    }
}
