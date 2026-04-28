import { IMesh } from "../../Abstract3DConverters/Interfaces/IMesh";
import { EmptyObject } from "../../EmptyObject";
import { ReferenceFrame } from "../../Motion6D/ReferenceFrame";
import { IDrawMesh } from "../GameActions/Interfaces/IDrawMesh";

export class AbstractDrawMesh extends EmptyObject implements IDrawMesh {
    constructor() {
        super("")
        this.typeName = "TrivialDrawMesh"
        this.types.push("IDrawMesh")
        this.types.push("TrivialDrawMesh")
    }


    drawMesh(mehshes: IMesh[], frame: ReferenceFrame): void {

    }

}