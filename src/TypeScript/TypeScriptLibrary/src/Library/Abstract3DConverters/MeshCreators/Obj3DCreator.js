"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Obj3DCreator = void 0;
const LinesMeshCreator_1 = require("./LinesMeshCreator");
class Obj3DCreator extends LinesMeshCreator_1.LinesMeshCreator {
    constructor(url, sep, obj, factory) {
        super(url, "\n", obj, factory);
        this.effects = new Map();
        this.meshes = [];
        this.lines = [];
        this.materialLines = [];
        this.mtll = "mtllib ";
        let mtl = factory.getFactory("IMtlDetector");
        if (mtl != null)
            this.mtlDetetctor = mtl;
    }
    loadText(text) {
        this.lines = text;
        this.createMaterials();
    }
    getMeshes() {
        return this.meshes;
    }
    getEffects() {
        return this.effects;
    }
    createMaterials() {
        for (let line in this.lines) {
            if (line.indexOf(this.mtll) == 0) {
                var url = line.substring(this.mtll.length);
                this.materialLines = this.mtlDetetctor.detectMtl(url, this.obj);
            }
        }
    }
}
exports.Obj3DCreator = Obj3DCreator;
//# sourceMappingURL=Obj3DCreator.js.map