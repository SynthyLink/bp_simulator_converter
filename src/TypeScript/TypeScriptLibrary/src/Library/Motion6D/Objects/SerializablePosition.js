"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializablePosition = void 0;
const BasicPosition_1 = require("./BasicPosition");
class SerializablePosition extends BasicPosition_1.BasicPosition {
    constructor(desktop, name) {
        super(desktop, name);
        this.children = [];
        this.typeName = "SerializablePosition";
        this.types.push("SerializablePosition");
    }
    getChildren() {
        return this.children;
    }
    setParameters(parameters) {
        super.setParameters(parameters);
        var po = this.performer.convertObject(parameters, "IPositionObject");
        if (po.length == 0)
            return;
        po[0].setObjectPosition(this);
    }
}
exports.SerializablePosition = SerializablePosition;
//# sourceMappingURL=SerializablePosition.js.map