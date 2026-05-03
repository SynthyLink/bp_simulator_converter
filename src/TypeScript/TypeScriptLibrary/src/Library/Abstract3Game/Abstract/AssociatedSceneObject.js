"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociatedSceneObject = void 0;
const AbstractSceneObject_1 = require("./AbstractSceneObject");
class AssociatedSceneObject extends AbstractSceneObject_1.AbstractSceneObject {
    constructor(scene, object) {
        super(scene, object.getName());
        this.types.push("IAssociatedObject");
        this.types.push("AbstractSceneObject");
        this.typeName = "AbstractSceneObject";
    }
    getAssociatedObject() {
        return this.object;
    }
    setAssociatedObject(obj) {
    }
}
exports.AssociatedSceneObject = AssociatedSceneObject;
//# sourceMappingURL=AssociatedSceneObject.js.map