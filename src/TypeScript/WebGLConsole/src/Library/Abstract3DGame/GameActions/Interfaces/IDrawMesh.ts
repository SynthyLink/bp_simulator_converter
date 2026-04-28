import { IMesh } from "../../../Abstract3DConverters/Interfaces/IMesh";
import { ReferenceFrame } from "../../../Motion6D/ReferenceFrame";

export interface IDrawMesh {
    drawMesh(mehshes: IMesh[], frame: ReferenceFrame): void
}
