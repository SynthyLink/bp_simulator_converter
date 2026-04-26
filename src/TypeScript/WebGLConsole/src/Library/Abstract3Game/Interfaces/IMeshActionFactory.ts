import { IMeshAction } from "../../Abstract3DConverters/Interfaces/IMeshAction";
import { ISceneObject } from "./ISceneObject";

export interface IMeshActionFactory {
    createMeshActions(object: ISceneObject): IMeshAction[]
}