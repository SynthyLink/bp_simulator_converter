import { EmptyObject } from "../../EmptyObject";
import { IGameActionConverter } from "../../Game/Interfaces/IGameActionConverter";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";
import { ICameraMeshDrawing } from "../Interfaces/ICameraMeshDrawing";

export class CameraMeshDrawing extends EmptyObject implements ICameraMeshDrawing {

    constructor() {
        super("")
    }

    functT(s: BasicCamera): IGameActionConverter | undefined {
        return undefined
    }
}