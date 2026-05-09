"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGameAcionConverter = void 0;
const EmptyGameObject_1 = require("../Abstract/EmptyGameObject");
class AbstractGameAcionConverter extends EmptyGameObject_1.EmptyGameObject {
    constructor() {
        super("", undefined);
        this.typeName = "AbstractGameAcionConverter";
        this.types.push("IGameAcionConverter");
        this.types.push("AbstractGameAcionConverter");
    }
}
exports.AbstractGameAcionConverter = AbstractGameAcionConverter;
//# sourceMappingURL=AbstractGameAcionConverter.js.map