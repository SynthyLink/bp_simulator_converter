"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicScene = void 0;
const game_1 = require("./game");
class BasicScene extends game_1.Scene {
    constructor(game, factory) {
        super(game);
        this.programs = {};
        this.meshes = {};
        this.textures = {};
        this.samplers = {};
        this.iobjects = [];
        this.time = 0;
        this.Score = 0;
        this.lifes = 15;
        this.Space_Displacement = -70;
        this.typeName = "BasicScene";
        this.types = ["IObject", "IObjectCollection", "BasicScene"];
        this.name = "";
        this.factory = factory;
        let l = factory.getFactory("ILoaderFactory");
        this.loader = l.getLoader(this);
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
}
exports.BasicScene = BasicScene;
//# sourceMappingURL=BasicScene.js.map