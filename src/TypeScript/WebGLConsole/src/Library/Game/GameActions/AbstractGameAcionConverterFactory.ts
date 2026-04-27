import { EmptyObject } from "../../EmptyObject";
import { IGame } from "../Interfaces/IGame";
import { IGameAcionConverter } from "../Interfaces/IGameAcionConverter";
import { IGameAcionConverterFactory } from "../Interfaces/IGameAcionConverterFactory";

export abstract class AbstractGameAcionConverterFactory extends EmptyObject implements
    IGameAcionConverterFactory {

    constructor() {
        super("")
        this.typeName = "AbstractGameAcionConverterFactory"
        this.types.push("IGameAcionConverterFactory")
        this.types.push("AbstractGameAcionConverterFactory")
    }


    abstract getGameAcionConverter(game: IGame): IGameAcionConverter | undefined

}