import type { IGame } from "../Library/Abstract3Game/Interfaces/IGame"
import { ScadaScene } from "../Library/Abstract3Game/Scenes/ScadaScene"
import { Cessna } from "./Cessna"


export class CessnaScene extends ScadaScene {
    constructor(game: IGame) {
        super(game, new Cessna())
        //LOAD
    }
}
