"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryObject = void 0;
const EmptyObject_1 = require("./EmptyObject");
class FactoryObject extends EmptyObject_1.EmptyObject {
    constructor(name, factory) {
        super(name);
        this.types.push("IFactoryConsumer");
        this.types.push("FactoryObject");
        if (factory === undefined)
            return;
        this.factory = factory;
    }
    setConsumerFactory(factory) {
        this.factory = factory;
    }
    getConsumerFactory() {
        return this.factory;
    }
}
exports.FactoryObject = FactoryObject;
//# sourceMappingURL=FactorytObject.js.map