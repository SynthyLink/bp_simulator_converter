"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversalFactory = void 0;
const Performer_1 = require("./Performer");
const OwnError_1 = require("./ErrorHandler/OwnError");
class UniversalFactory {
    constructor() {
        this.typeName = "UniversalFactory";
        this.types = ["IObject", "IFactory", "UniversalFactory"];
        this.name = "";
        this.performer = new Performer_1.Performer();
        this.factories = new Map();
    }
    getFactory(typeName) {
        var p = this.factories.get(typeName);
        var pp = this.performer.convertObject(p, typeName);
        return (pp.length == 0) ? undefined : pp[0];
    }
    addFactory(t, type) {
        if (this.factories.has(type))
            throw new OwnError_1.OwnError("Factory", type, "aleady exists");
        var tt = this.performer.convertObject(t, type);
        if (tt.length > 0)
            this.factories.set(type, tt[0]);
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
}
exports.UniversalFactory = UniversalFactory;
//# sourceMappingURL=UniversalFactory.js.map