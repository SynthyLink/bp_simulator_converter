import { IMesh } from "../../Abstract3DConverters/Interfaces/IMesh";
import { ReferenceFrame } from "../../Motion6D/ReferenceFrame";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";

export interface IMeshFrame { mesh: IMesh[], frame: ReferenceFrame}