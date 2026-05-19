import type { IGameActionConverter } from "../../Game/Interfaces/IGameActionConverter";
import type { IGameActionConverterFactory } from "../../Game/Interfaces/IGameActionConverterFactory";
import type { IAction } from "../../Interfaces/IAction";
import type { IFactory } from "../../Interfaces/IFactory";
import type { IPlayEngine } from "../../Interfaces/IPlayEngine";
import type { IFindCamera } from "../Interfaces/IFindCamera";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";
import { EngineGame } from "../../Game/Abstract/EngineGame";
export declare class EngineGameCameraAction extends EngineGame implements IGameActionConverterFactory {
    constructor(name: string, factory: IFactory, engine: IPlayEngine, useLoader: boolean);
    functT(s: IAction): IAction | undefined;
    getGameActionConverter(object: any): IGameActionConverter | undefined;
    protected getGameActionConverterCamera(camera: BasicCamera): IGameActionConverter;
    camera: BasicCamera;
    findCamera: IFindCamera;
}
//# sourceMappingURL=EngineGameCameraAction.d.ts.map