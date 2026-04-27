import { ScadaScene } from "../src/Library/Abstract3Game/Scenes/ScadaScene";
import { IGame } from "../src/Library/Game/Interfaces/IGame";
import { Cessna } from "./Cessna";



export class CessnaScene extends ScadaScene {
    constructor(game: IGame, chart: string) {
        super(game, new Cessna(), chart)
        // LOAD
    }
}
