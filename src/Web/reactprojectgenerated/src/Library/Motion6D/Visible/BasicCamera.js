"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCamera = void 0;
const BasicPosition_1 = require("../Objects/BasicPosition");
class BasicCamera extends BasicPosition_1.BasicPosition {
    constructor(desktop, name) {
        super(desktop, name);
        this.visible = [];
        this.typeName = "BasicCamera";
        this.types.push("IDataConsumer");
        this.types.push("IMeasurements");
        this.types.push("IPostSetArrow");
        this.types.push("BasicCamera");
    }
    addVisible(visible) {
        this.visible.push(visible);
    }
    removeVisible(visible) {
        this.performer.remove(this.visible, visible);
    }
    postVisible(visible) {
    }
}
exports.BasicCamera = BasicCamera;
//# sourceMappingURL=BasicCamera.js.map