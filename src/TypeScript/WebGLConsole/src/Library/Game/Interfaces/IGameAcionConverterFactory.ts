import { IGame } from "./IGame";
import { IGameAcionConverter } from "./IGameAcionConverter";

export interface IGameAcionConverterFactory {
    getGameAcionConverter(game: IGame): IGameAcionConverter | undefined
}