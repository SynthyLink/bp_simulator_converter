"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLGamePerformer = void 0;
const EmptyObject_1 = require("../EmptyObject");
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
        let rf = new ResourceFactory(loader);
        fact.addFunction("text", rf);
        let lf = new LoaderFactory(loader);
        fact.addFunction("image", lf);
        return fact;
    }
}
exports.GLGamePerformer = GLGamePerformer;
class AbstractFactory extends EmptyObject_1.EmptyObject {
    constructor(loader) {
        super("");
        this.loader = loader;
        this.types.push("IResourceFunc");
    }
}
class ResourceFactory extends AbstractFactory {
    constructor(loader) {
        super(loader);
    }
    functT(s) {
        return this.loader.resources[s.url];
    }
}
class LoaderFactory extends AbstractFactory {
    constructor(loader) {
        super(loader);
    }
    functT(s) {
        let p = { loader: this.loader, url: s.url };
        return p;
    }
}
//# sourceMappingURL=GLGamePerformer.js.map