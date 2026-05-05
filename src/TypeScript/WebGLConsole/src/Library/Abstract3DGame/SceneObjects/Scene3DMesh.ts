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
import { IResourceCollection } from "../../Resources/Infrefaces/IResouceCollection";
import { IResourceItem } from "../../Resources/Infrefaces/IResourceItem";

export class Scene3DMesh extends AssociatedSceneObject implements IMeshHolder,
    ISelfLoad, IResourceCollection
{
    setScene(scene: IScene): void {
    }

    shape !: Basic3DShape
    meshes: IMesh[] = []
    isLoaded: boolean = false

    textReader !: ITextReaderFactory;

    constructor(scene: IScene, object: Basic3DShape) {
        super(scene, object)
        this.types.push("IMeshHolder")
        this.types.push("ISelfLoad")
        this.types.push("Scene3DMesh")
        this.types.push("IResourceCollection")
        this.typeName = "Scene3DMesh"
        this.shape = object
    }
    getResources(): IResourceItem[] {
        return this.shape.getResources()
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
        var res = this.shape.getResources()
        for (var r of res) {
            if (r.ext == ".obj") {
                var creator = new Obj3DCreator(r.url, "", this.scene, this.factory);
                this.meshes = creator.getMeshCreatorMeshes()
                break;
            }
        }
    }
}