import { IMesh } from "../../Abstract3DConverters/Interfaces/IMesh";
import { IMeshHolder } from "../../Abstract3DConverters/Interfaces/IMeshHolder";
import { Basic3DShape } from "../../Motion6D/Objects/Shapes/Basic3DShape";
import { AssociatedSceneObject } from "../Abstract/AssociatedSceneObject";
import { IScene } from "../Interfaces/IScene";

export class Scene3DMesh extends AssociatedSceneObject implements IMeshHolder {
    shape !: Basic3DShape
    meshes : IMesh[] = []
    constructor(scene: IScene, object: Basic3DShape) {
        super(scene, object)
        this.types.push("IMeshHolder")
        this.types.push("Scene3DMesh")
        this.typeName = "Scene3DMesh"
    }
    getHolderMeshes(): IMesh[] {
        return this.meshes
    }
}