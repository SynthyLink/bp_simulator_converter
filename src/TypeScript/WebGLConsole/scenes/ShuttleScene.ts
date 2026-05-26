import type { IGame } from "../src/Library/Game/Interfaces/IGame";
import { ScadaScene } from "../src/Library/Game/Scenes/ScadaScene";
import { Shuttle } from "./Shuttle";



export class ShuttleScene extends ScadaScene {
    constructor(game: IGame, chart: string) {
        super(game, new Shuttle(), chart)
    }
}
