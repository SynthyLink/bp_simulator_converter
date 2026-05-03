import { IGame } from "../src/Library/Game/Interfaces/IGame";
import { ScadaScene } from "../src/Library/Game/Scenes/ScadaScene";
import { Cessna } from "./Cessna";



export class CessnaScene extends ScadaScene {
    constructor(game: IGame, chart: string) {
        super(game, new Cessna(), chart)
        // LOAD
    }
}
