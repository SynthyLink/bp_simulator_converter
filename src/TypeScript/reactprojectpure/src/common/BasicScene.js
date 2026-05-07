"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicScene = void 0;
const camera_1 = __importDefault(require("./camera"));
const game_1 = require("./game");
const ActionArray_1 = require("../Library/Utilities/Generic/ActionArray");
class BasicScene extends game_1.Scene {
    constructor(game, factory) {
        super(game);
        this.programs = {};
        this.camera = new camera_1.default();
        this.meshes = {};
        this.textures = {};
        this.samplers = {};
        this.iobjects = [];
        this.update = new ActionArray_1.ActionArray();
        this.time = 0;
        this.Score = 0;
        this.lifes = 15;
        this.Space_Displacement = -70;
        this.typeName = "BasicScene";
        this.types = ["IObject", "IObjectCollection", "BasicScene"];
        this.name = "";
        this.resourceFiles = [];
        this.factory = factory;
        let l = factory.getFactory("ILoaderFactory");
        if (l != undefined) {
            this.loader = l.getLoader(this);
        }
    }
    addResource(url) {
        if (!this.resourceFiles.includes(url))
            this.resourceFiles.push(url);
    }
    getResources() {
        return this.resourceFiles;
    }
    addUpdate(action) {
        this.update.addAction(action);
    }
    removeUpdate(action) {
        this.update.removeAction(action);
    }
    getDirectoryFiles(dir) {
        let l = [];
        for (let d of this.resourceFiles) {
            if (d.startsWith(dir))
                l.push(d);
        }
        l.sort();
        return l;
    }
    fileExists(fileName) {
        return this.resourceFiles.includes(fileName);
    }
    getFactory() {
        return this.factory;
    }
    getName() {
        return this.name;
    }
    getClassName() {
        return this.typeName;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) >= 0;
    }
    getGame() {
        return this.game;
    }
    addObjectToScene(object) {
        this.iobjects.push(object);
    }
    getObjectCollection() {
        return this.iobjects;
    }
    getResourceText(url) {
        return this.game.loader.resources[url];
    }
    getCamera() {
        return this.camera;
    }
}
exports.BasicScene = BasicScene;
//# sourceMappingURL=BasicScene.js.map