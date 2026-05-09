"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSceneGameAction = void 0;
const EmptyGameObject_1 = require("../Abstract/EmptyGameObject");
class AbstractSceneGameAction extends EmptyGameObject_1.EmptyGameObject {
    constructor(object) {
        super("", undefined);
        this.typeName = "AbstractSceneGameAction";
        this.types.push("ISceneObjectAction");
        this.types.push("IAction");
        this.types.push("AbstractSceneGameAction");
        this.object = object;
    }
    getActionSceneObject() {
        return this.object;
    }
    isEmptyAction() {
        return false;
    }
}
exports.AbstractSceneGameAction = AbstractSceneGameAction;
//# sourceMappingURL=AbstractSceneGameAction.js.map