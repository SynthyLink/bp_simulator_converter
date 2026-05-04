import { IMesh } from "../../Abstract3DConverters/Interfaces/IMesh";
import { IMeshHolder } from "../../Abstract3DConverters/Interfaces/IMeshHolder";
import { Obj3DCreator } from "../../Abstract3DConverters/MeshCreators/Obj3DCreator";
import { OwnNotImplemented } from "../../ErrorHandler/OwnNotImplemented";
import { AssociatedSceneObject } from "../../Game/Abstract/AssociatedSceneObject";
import { IScene } from "../../Game/Interfaces/IScene";
import { IFactory } from "../../Interfaces/IFactory";
import { ISelfLoad } from "../../Interfaces/ISelfLoad";
import { ITextReaderFactory } from "../../IO/Interfaces/ITextReaderFactory";
import { Basic3DShape } from "../../Motion6D/Objects/Shapes/Basic3DShape";
import { ResourceItem } from "../../Web/ResourceItem";

export class Scene3DMesh extends AssociatedSceneObject implements IMeshHolder,
    ISelfLoad
{
    setScene(scene: IScene): void {
    }
    shape !: Basic3DShape
    meshes: IMesh[] = []
    isLoaded: boolean = false
    resources: ResourceItem[] = []

    textReader !: ITextReaderFactory;

    constructor(scene: IScene, object: Basic3DShape) {
        super(scene, object)
        this.types.push("IMeshHolder")
        this.types.push("IURLResourceHolder")
        this.types.push("ISelfLoad")
        this.types.push("Scene3DMesh")
        this.typeName = "Scene3DMesh"
        this.shape = object
    }

    loadItself(load: boolean): boolean {
        if (load == this.isLoaded) return false
        this.isLoaded = load
        this.loadMesh(load)
        return true;
    }

    setConsumerFactory(factory: IFactory): void {
        super.setConsumerFactory(factory)
        let tr = factory.getFactory<ITextReaderFactory>("ITextReaderFactory")
        if (tr === undefined) {
            throw new OwnNotImplemented()
        }
        this.textReader = tr
    }


 
    addURLRource(name: string, url: string, type: string): void {
    }

    getHolderMeshes(): IMesh[] {
        return this.meshes
    }

    loadMesh(load: boolean): void {
        if (!load) return
        for (var r of this.resources) {
            if (r.getType() == ".obj") {
                var creator = new Obj3DCreator(r.getUrl(), "", this.scene, this.factory);
                this.meshes = creator.getMeshCreatorMeshes()
                break;
            }
        }
    }
}