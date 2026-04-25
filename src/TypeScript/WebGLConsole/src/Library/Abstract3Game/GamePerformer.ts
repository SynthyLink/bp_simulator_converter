import { IFactory } from "../Interfaces/IFactory";
import { Performer } from "../Performer";
import { IGame } from "./Interfaces/IGame";

export class GamePerformer extends Performer {
   protected game !: IGame
   protected factory !: IFactory

    constructor(game: IGame) {
        super()
        this.game = game
        this.factory = game.getConsumerFactory()
    }

}