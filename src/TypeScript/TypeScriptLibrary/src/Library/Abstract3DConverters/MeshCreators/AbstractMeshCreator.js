"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMeshCreator = void 0;
const Performer_1 = require("../../Performer");
const Converter3DPerformer_1 = require("../Converter3DPerformer");
class AbstractMeshCreator {
    constructor(url, directory, obj, factory) {
        this.effects = new Map();
        this.meshes = [];
        this.performer = new Performer_1.Performer();
        this.directory = "";
        this.dict = new Map();
        this.url = "";
        this.typeName = "AbstractMeshCreator";
        this.types = ["IObject", "IMeshCreator", "AbstractMeshCreator"];
        this.name = "";
        this.cPerformer = new Converter3DPerformer_1.Converter3DPefrormer();
        this.effectList = [];
        this.vertices = [];
        this.normals = [];
        this.textures = [];
        this.url = url;
        this.directory = directory;
        this.factory = factory;
        this.obj = obj;
        let tc = factory.getFactory("IStringSplitter");
        let tf = factory.getFactory("ITextReaderFactory");
        if (tf != undefined) {
            this.textReaderFactory = tf;
        }
        if (tc != undefined) {
            this.textConverter = tc;
        }
        let tfile = factory.getFactory("IFileFactory");
        if (tfile != undefined) {
            this.fileio = tfile.createFile(obj);
        }
        let tpath = factory.getFactory("IPathFactory");
        if (tpath != undefined) {
            this.path = tpath.createPath(obj);
        }
        if (directory.length == 0) {
            this.directory = this.path.getDirectoryName(url);
        }
        let td = factory.getFactory("IIODirectoryFactory");
        if (td != undefined) {
            this.directoryio = td.createDirectoryFactory(obj);
        }
        let idt = factory.getFactory("IImageDetectorFactory");
        if (idt != undefined)
            this.imageDetector = idt.getImageDetector(obj);
    }
    getMeshCreatorDirectory() {
        return this.directory;
    }
    getName() {
        return "";
    }
    getClassName() {
        return this.typeName;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) >= 0;
    }
    getMeshCreatorURL() {
        return this.url;
    }
    getMeshCreatorMeshes() {
        return this.meshes;
    }
    getMeshCreatorEffects() {
        return this.effects;
    }
    getMeshCreatorFactory() {
        return this.factory;
    }
    getMeshCreatorGenerator() {
        return this.obj;
    }
    detectImage(path) {
        if (this.imageDetector === undefined) {
            return true;
        }
        return this.imageDetector.detectImage(path);
    }
    existsFile(fileName) {
        return this.fileio.existsFile(fileName);
    }
    pathCombine(path1, path2) {
        return this.path.pathCombine(path1, path2);
    }
    toStringT(object) {
        return this.performer.convert(object);
    }
    toShiftString(str, shift) {
        return this.cPerformer.toShiftString(str, shift);
    }
    toReal(s) {
        return this.performer.convert(s);
    }
    toRealArray(str) {
        return this.cPerformer.toRealArray(str);
    }
    addTexture(l, texture) {
        this.cPerformer.addTexture(l, texture);
    }
    toFloat(s) {
        return this.performer.convert(s);
    }
}
exports.AbstractMeshCreator = AbstractMeshCreator;
//# sourceMappingURL=AbstractMeshCreator.js.map