import { EmptyObject } from "../../EmptyObject";
import { IGameAcionConverter } from "../../Game/Interfaces/IGameAcionConverter";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";
import { ICameraMeshDrawing } from "../GameActions/Interfaces/ICameraMeshDrawing";

export class CameraMeshDrawing extends EmptyObject implements ICameraMeshDrawing {

    constructor() {
        super("")
    }
    functT(s: BasicCamera): IGameAcionConverter | undefined {
        return undefined
    }
}