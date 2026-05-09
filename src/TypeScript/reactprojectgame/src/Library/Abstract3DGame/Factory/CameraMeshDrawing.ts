import { EmptyObject } from "../../EmptyObject";
import type { IGameActionConverter } from "../../Game/Interfaces/IGameActionConverter";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera.1";
import type { ICameraMeshDrawing } from "../Interfaces/ICameraMeshDrawing";

export class CameraMeshDrawing extends EmptyObject implements ICameraMeshDrawing {

    constructor() {
        super("")
    }

    functT(s: BasicCamera): IGameActionConverter | undefined {
        return undefined
    }
}