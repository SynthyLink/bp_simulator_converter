"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variable = void 0;
const Performer_1 = require("../../Performer");
class Variable {
    constructor(name, type, value) {
        this.className = "";
        this.types = ["Variable", "IMeasurement", "IObject", "ISetValue"];
        this.performer = new Performer_1.Performer();
        this.name = name;
        this.type = type;
        this.value = value;
    }
    setOwnValue(value) {
        this.value = value;
    }
    getClassName() {
        return this.className;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) >= 0;
    }
    getName() {
        return this.name;
    }
    getMeasurementName() {
        return this.name;
    }
    getMeasurementType() {
        return this.type;
    }
    getMeasurementValue() {
        return this.value;
    }
}
exports.Variable = Variable;
//# sourceMappingURL=Variable.js.map