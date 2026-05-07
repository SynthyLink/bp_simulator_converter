"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene3DMesh = void 0;
const Obj3DCreator_1 = require("../../Abstract3DConverters/MeshCreators/Obj3DCreator");
const OwnNotImplemented_1 = require("../../ErrorHandler/OwnNotImplemented");
const AssociatedSceneObject_1 = require("../../Game/Abstract/AssociatedSceneObject");
class Scene3DMesh extends AssociatedSceneObject_1.AssociatedSceneObject {
    setScene(scene) {
    }
    constructor(scene, object) {
        super(scene, object);
        this.meshes = [];
        this.isLoaded = false;
        this.resources = [];
        this.types.push("IMeshHolder");
        this.types.push("IURLResourceHolder");
        this.types.push("ISelfLoad");
        this.types.push("Scene3DMesh");
        this.typeName = "Scene3DMesh";
        this.shape = object;
        this.resources = object.getURLResources();
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
    getURLResources() {
        return this.shape.getURLResources();
    }
    addURLRource(name, url, type) {
    }
    getHolderMeshes() {
        return this.meshes;
    }
    loadMesh(load) {
        if (!load)
            return;
        for (var r of this.resources) {
            if (r.getType() == ".obj") {
                var creator = new Obj3DCreator_1.Obj3DCreator(r.getUrl(), "", this.scene, this.factory);
                this.meshes = creator.getMeshCreatorMeshes();
                break;
            }
        }
    }
}
exports.Scene3DMesh = Scene3DMesh;
//# sourceMappingURL=Scene3DMesh.js.map