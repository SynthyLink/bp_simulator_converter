import { IMesh } from "../../Abstract3DConverters/Interfaces/IMesh";
import { IMeshHolder } from "../../Abstract3DConverters/Interfaces/IMeshHolder";
import { Basic3DShape } from "../../Motion6D/Objects/Shapes/Basic3DShape";
import { IURLResourceHolder } from "../../Web/Interface/IURLResourseHolder";
import { ResourceItem } from "../../Web/ResourceItem";
import { AssociatedSceneObject } from "../Abstract/AssociatedSceneObject";
import { IScene } from "../Interfaces/IScene";

export class Scene3DMesh extends AssociatedSceneObject implements IMeshHolder, IURLResourceHolder {
    shape !: Basic3DShape
    meshes: IMesh[] = []

     constructor(scene: IScene, object: Basic3DShape) {
        super(scene, object)
        this.types.push("IMeshHolder")
        this.types.push("IURLResourceHolder")
        this.types.push("Scene3DMesh")
        this.typeName = "Scene3DMesh"
    }

    getURLResources(): ResourceItem[] {
        return this.shape.getURLResources();
    }

    addURLRource(name: string, url: string, type: string): void {
    }

    getHolderMeshes(): IMesh[] {
        return this.meshes
    }

}