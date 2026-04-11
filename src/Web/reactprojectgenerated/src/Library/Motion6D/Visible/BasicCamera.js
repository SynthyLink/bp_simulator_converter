"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCamera = void 0;
const BasicPosition_1 = require("../Objects/BasicPosition");
class BasicCamera extends BasicPosition_1.BasicPosition {
    constructor(desktop, name) {
        super(desktop, name);
        this.visible = [];
        this.typeName = "BasicCamera";
        this.types.push("IVisibleConsumer");
        this.types.push("BasicCamera");
    }
    addVisibleObject(object) {
        this.visible.push(object);
    }
    removeVisibleObject(object) {
        this.performer.remove(this.visible, object);
    }
    postVisibleObject(object) {
    }
}
exports.BasicCamera = BasicCamera;
//# sourceMappingURL=BasicCamera.js.map