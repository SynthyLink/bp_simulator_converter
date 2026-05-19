import { FactoryObject } from "../FactorytObject";
import type { IGame } from "../Game/Interfaces/IGame";
import type { IActionT } from "../Interfaces/IActionT";
import type { IFactory } from "../Interfaces/IFactory";
import type { IShowData } from "./Interfaces/IShowData";
export declare class GameAction extends FactoryObject implements IActionT<IShowData> {
    constructor(name: string, factory: IFactory | undefined, action: IActionT<IGame>);
    actionT(t: IShowData): void;
    isEmptyActionT(): boolean;
    protected detectGame(): void;
    name: string;
    action: IActionT<IGame>;
    game: IGame;
    t: IShowData;
}
//# sourceMappingURL=GameAction.d.ts.map