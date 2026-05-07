"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLGamePerformer = void 0;
const GamePerformer_1 = require("../Game/GamePerformer");
const ResourceFuncFactory_1 = require("../Resources/ResourceFuncFactory");
class GLGamePerformer extends GamePerformer_1.GamePerformer {
    convertResourceInfo(input, output) {
        for (let item of input) {
            let o = { url: item.url, type: item.type };
            output.set(item.name, o);
        }
    }
    createFactory(loader, factory) {
        var fact = new ResourceFuncFactory_1.ResourceFuncFactory("", factory);
        return fact;
    }
}
exports.GLGamePerformer = GLGamePerformer;
class TextFactory {
    functT(s) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=GLGamePerformer.js.map