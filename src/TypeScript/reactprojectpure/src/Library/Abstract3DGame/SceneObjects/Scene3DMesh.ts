import { IMesh } from "../../Abstract3DConverters/Interfaces/IMesh";
import { IMeshHolder } from "../../Abstract3DConverters/Interfaces/IMeshHolder";
import { Obj3DCreator } from "../../Abstract3DConverters/MeshCreators/Obj3DCreator";
import { OwnNotImplemented } from "../../ErrorHandler/OwnNotImplemented";
import { AssociatedSceneObject } from "../../Game/Abstract/AssociatedSceneObject";
import { IScene } from "../../Game/Interfaces/IScene";
import { IFactory } from "../../Interfaces/IFactory";
import { IFuncT } from "../../Interfaces/IFuncT";
import { ISelfLoad } from "../../Interfaces/ISelfLoad";
import { ITextReader } from "../../IO/Interfaces/ITextReader";
import { ITextReaderFactory } from "../../IO/Interfaces/ITextReaderFactory";
import { Basic3DShape } from "../../Motion6D/Objects/Shapes/Basic3DShape";
import { IResourceCollection } from "../../Resources/Infrefaces/IResouceCollection";
import { IResourceFunc } from "../../Resources/Infrefaces/IResourceFunc";
import { IResourceFuncFactory } from "../../Resources/Infrefaces/IResourceFuncFactory";
import { IResourceItem } from "../../Resources/Infrefaces/IResourceItem";
import { TextReaderFromResource } from "../../Resources/TextReaderFromResource";

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