"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene3DMesh = void 0;
const Obj3DCreator_1 = require("../../Abstract3DConverters/MeshCreators/Obj3DCreator");
const OwnNotImplemented_1 = require("../../ErrorHandler/OwnNotImplemented");
const AssociatedSceneObject_1 = require("../../Game/Abstract/AssociatedSceneObject");
const TextReaderFromResource_1 = require("../../Resources/TextReaderFromResource");
class Scene3DMesh extends AssociatedSceneObject_1.AssociatedSceneObject {
    constructor(scene, object) {
        super(scene, object);
        this.meshes = [];
        this.isLoaded = false;
        this.types.push("IMeshHolder");
        this.types.push("ISelfLoad");
        this.types.push("Scene3DMesh");
        this.types.push("IResourceCollection");
        this.typeName = "Scene3DMesh";
        this.shape = object;
        this.createTextReaderFactory();
    }
    createTextReaderFactory() {
        var ff = this.factory.getFactory("IResourceFuncFactory");
        if (ff != undefined) {
            var fact = ff.functT("text");
            if (fact != undefined) {
                this.func = new TextReaderFromResource_1.TextReaderFromResource(this.getResources(), fact);
                return;
            }
        }
        var f = this.factory.getFactory("IResourceFunc");
        if (f === undefined)
            return;
        this.func = new TextReaderFromResource_1.TextReaderFromResource(this.getResources(), f);
    }
    setScene(scene) {
    }
    getResources() {
        return this.shape.getResources();
    }
    loadItself(load) {
        if (load == this.isLoaded)
            return false;
        this.isLoaded = load;
        this.loadMesh(load);
        return true;
    }
    setConsumerFactory(factory) {
        super.setConsumerFactory(factory);
        let tr = factory.getFactory("ITextReaderFactory");
        if (tr === undefined) {
            throw new OwnNotImplemented_1.OwnNotImplemented();
        }
        this.textReader = tr;
    }
    addURLRource(name, url, type) {
    }
    getHolderMeshes() {
        return this.meshes;
    }
    loadMesh(load) {
        if (!load)
            return;
        var res = this.shape.getResources();
        for (var r of res) {
            if (r.ext == ".obj") {
                var creator = new Obj3DCreator_1.Obj3DCreator(r.url, r.name, "", this.scene, this.factory, this.func);
                this.meshes = creator.getMeshCreatorMeshes();
                break;
            }
        }
    }
}
exports.Scene3DMesh = Scene3DMesh;
//# sourceMappingURL=Scene3DMesh.js.map