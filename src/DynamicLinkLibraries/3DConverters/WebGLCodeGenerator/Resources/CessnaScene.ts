import type { IGame } from "../src/Library/Abstract3Game/Interfaces/IGame"
import { ScadaScene } from "../src/Library/Abstract3Game/Scenes/ScadaScene"
import { Cessna } from "./Cessna"


export class CessnaScene extends ScadaScene {
    constructor(game: IGame, chart: string) {
        super(game, new Cessna(), chart)
        // LOAD
    }
}
