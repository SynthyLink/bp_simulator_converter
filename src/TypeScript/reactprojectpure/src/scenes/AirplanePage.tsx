import { AirplaneScene } from "../../scenes/AirplaneScene";
import { IGame } from "../Library/Game/Interfaces/IGame";

export default class AirplanePage extends AirplaneScene {
    constructor(game: IGame) {
        super(game, "")
    }
}