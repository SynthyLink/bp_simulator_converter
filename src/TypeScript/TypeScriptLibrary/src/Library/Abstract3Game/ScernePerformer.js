"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenePerformer = void 0;
const Performer_1 = require("../Performer");
class ScenePerformer extends Performer_1.Performer {
    constructor(scene) {
        super();
        this.scene = scene;
        this.factory = scene.getConsumerFactory();
    }
    createSceneAction() {
        var s = this.scene;
        var act = new SceneObjectAction(s);
        this.forEach(s, act, "ISceneObject");
    }
}
exports.ScenePerformer = ScenePerformer;
class ResourceCollector {
    constructor(items) {
        this.items = [];
        this.items = items;
    }
    actionT(t) {
        var rr = t.getURLResources();
        for (var r of rr) {
            this.items.push(r);
        }
    }
}
class SceneObjectAction {
    actionT(t) {
        var a = this.gameAcion.functT(t);
        this.action.addAction(a);
    }
    constructor(scene) {
        this.scene = scene;
        var f = scene.getConsumerFactory();
        var ff = f.getFactory("IGameActionFactory");
        var a = ff === null || ff === void 0 ? void 0 : ff.getGameAction(scene);
        if (a != undefined) {
            this.gameAcion = a;
        }
        this.action = scene.getInternalAction();
        this.action.clearActions();
    }
}
//# sourceMappingURL=ScernePerformer.js.map