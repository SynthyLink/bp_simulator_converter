import type { IMesh } from "../../Abstract3DConverters/Interfaces/IMesh";
import type { IMeshHolder } from "../../Abstract3DConverters/Interfaces/IMeshHolder";
import type { IScene } from "../../Game/Interfaces/IScene";
import type { IFactory } from "../../Interfaces/IFactory";
import type { IFuncT } from "../../Interfaces/IFuncT";
import type { ISelfLoad } from "../../Interfaces/ISelfLoad";
import type { ITextReader } from "../../IO/Interfaces/ITextReader";
import type { ITextReaderFactory } from "../../IO/Interfaces/ITextReaderFactory";
import type { IResourceCollection } from "../../Resources/Infrefaces/IResouceCollection";
import type { IResourceFunc } from "../../Resources/Infrefaces/IResourceFunc";
import type { IResourceFuncFactory } from "../../Resources/Infrefaces/IResourceFuncFactory";
import type { IResourceItem } from "../../Resources/Infrefaces/IResourceItem";
import { TextReaderFromResource } from "../../Resources/TextReaderFromResource";
import { Obj3DCreator } from "../../Abstract3DConverters/MeshCreators/Obj3DCreator";
import { OwnNotImplemented } from "../../ErrorHandler/OwnNotImplemented";
import { AssociatedSceneObject } from "../../Game/Abstract/AssociatedSceneObject";
import { Basic3DShape } from "../../Motion6D/Objects/Shapes/Basic3DShape";

export class Scene3DMesh extends AssociatedSceneObject implements IMeshHolder,
    ISelfLoad, IResourceCollection
{
    constructor(scene: IScene, object: Basic3DShape) {
        super(scene, object)
        this.types.push("IMeshHolder")
        this.types.push("ISelfLoad")
        this.types.push("Scene3DMesh")
        this.types.push("IResourceCollection")
        this.typeName = "Scene3DMesh"
        this.shape = object
        this.createTextReaderFactory()
    }

  
    createTextReaderFactory(): void {
        var ff = this.factory.getFactory<IResourceFuncFactory>("IResourceFuncFactory")
        
        if (ff != undefined) {
            var fact = ff.functT("text")
            if (fact != undefined) {
                this.func = new TextReaderFromResource(this.getResources(), fact)
                return
            }
        }

        var f = this.factory.getFactory<IResourceFunc>("IResourceFunc")
        if (f === undefined) return
        this.func = new TextReaderFromResource(this.getResources(), f)
    }

    func !: IFuncT<ITextReader | undefined, string>

    setScene(scene: IScene): void {
        this.scene = scene
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
        this.showObject(tr, "ITextReaderFactory")
        if (tr === undefined) {
            throw new OwnNotImplemented("Text Reader Scene3DMesh")
        }
        this.textReader = tr
    }
 

    getHolderMeshes(): IMesh[] {
        return this.meshes
    }

    loadMesh(load: boolean): void {
        if (!load) return
        var res = this.shape.getResources()
        for (var r of res) {
            if (r.ext == ".obj") {
                var creator = new Obj3DCreator(r.url, r.name,
                    "", this.scene, this.factory, this.func);
                this.meshes = creator.getMeshCreatorMeshes()
                break;
            }
        }
    }

 
    shape !: Basic3DShape
    meshes: IMesh[] = []
    isLoaded: boolean = false

    textReader !: ITextReaderFactory;



}