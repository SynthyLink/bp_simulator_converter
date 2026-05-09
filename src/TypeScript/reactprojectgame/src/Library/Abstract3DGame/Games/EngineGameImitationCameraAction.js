"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineGameImitationCameraAction = void 0;
const EngineGame_1 = require("../../Game/Abstract/EngineGame");
const DrawMeshGameCameraAcionConverter_1 = require("../Objects/DrawMeshGameCameraAcionConverter");
class EngineGameImitationCameraAction extends EngineGame_1.EngineGame {
    constructor(name, factory, engine) {
        super(name, factory, engine);
        this.types.push("IGameActionConverterFactory");
        this.types.push("IGameActionConverter");
        this.types.push("EngineGameImitationCameraAction");
        factory.addFactory(this, "IGameActionConverterFactory");
        var fc = factory.getFactory("IFindCamera");
        if (fc != undefined) {
            this.findCamera = fc;
        }
    }
    functT(s) {
        return s;
    }
    getGameActionConverter(object) {
        var scene = object;
        if (scene == undefined) {
            return undefined;
        }
        let camera = this.findCamera.functT(scene);
        if (camera == undefined) {
            return undefined;
        }
        return new DrawMeshGameCameraAcionConverter_1.DrawMeshGameCameraAcionConverter(camera);
    }
    getGameActionConverterCamera(camera) {
    }
}
exports.EngineGameImitationCameraAction = EngineGameImitationCameraAction;
//# sourceMappingURL=EngineGameImitationCameraAction.js.map