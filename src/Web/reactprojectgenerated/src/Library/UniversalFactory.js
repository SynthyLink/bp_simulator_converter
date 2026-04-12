"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversalFactory = void 0;
const Performer_1 = require("./Performer");
class UniversalFactory {
    constructor() {
        this.performer = new Performer_1.Performer();
        this.factories = new Map();
    }
    getFactory(typeName) {
        var p = this.factories.get(typeName);
        var pp = this.performer.convertObject(p, typeName);
        return (pp.length == 0) ? undefined : pp[0];
    }
    addFactory(t, type) {
        var tt = this.performer.convertObject(t, type);
        if (tt.length > 0)
            this.factories.set(type, tt[0]);
    }
}
exports.UniversalFactory = UniversalFactory;
//# sourceMappingURL=UniversalFactory.js.map