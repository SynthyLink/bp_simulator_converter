import { AbstractGameAcionConverterFactory } from "./AbstractGameAcionConverterFactory";
import { IGame } from "../Interfaces/IGame";
import { IGameAcionConverter } from "../Interfaces/IGameAcionConverter";
import { TrivialGameAcionConverter } from "./TrivialGameAcionConverter";

export class GameAcionConverterFactory extends AbstractGameAcionConverterFactory {
    protected conv !: IGameAcionConverter
    constructor() {
        super()
        this.typeName = "GameAcionConverterFactory"
        this.types.push("GameAcionConverterFactory")
    }

    getGameAcionConverter(game: IGame): IGameAcionConverter | undefined {
        if (this.conv == undefined) {
            var p = this.performer.convertObject<IGameAcionConverter, IGame>(game, "IGameAcionConverter")
            if (p.length == 0) {
                this.conv = new TrivialGameAcionConverter()
            }
            else {
                this.conv = p[0]
            }
        }
        return this.conv
    }
}