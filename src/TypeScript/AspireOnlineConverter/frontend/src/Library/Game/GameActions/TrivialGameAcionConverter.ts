import type { IGameAction } from "../Interfaces/IGameAction";
import { AbstractGameAcionConverter } from "./AbstractGameAcionConverter";

export class TrivialGameAcionConverter extends AbstractGameAcionConverter {
    functT(s: IGameAction): IGameAction | undefined{
        return s;
    }

}