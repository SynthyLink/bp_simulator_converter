import { AbstractGameAcionConverterFactory } from "../../Game/GameActions/AbstractGameAcionConverterFactory";
import { TrivialGameAcionConverter } from "../../Game/GameActions/TrivialGameAcionConverter";
import { IGame } from "../../Game/Interfaces/IGame";
import { IGameAcionConverter } from "../../Game/Interfaces/IGameAcionConverter";

export class TrivialDrawMeshActionConverterFactory extends AbstractGameAcionConverterFactory
{
    constructor() {
        super()
        this.typeName = "TrivialDrawMeshActionConverterFactory"
        this.types.push("TrivialDrawMeshActionConverterFactory")
    }

    getGameAcionConverter(game: IGame): IGameAcionConverter | undefined {
        return new TrivialGameAcionConverter()
    }

}