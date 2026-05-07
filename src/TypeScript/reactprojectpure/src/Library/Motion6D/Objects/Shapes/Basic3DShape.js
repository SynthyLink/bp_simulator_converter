"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic3DShape = void 0;
const CategoryObject_1 = require("../../../CategoryObject");
const ResourceItem_1 = require("../../../Web/ResourceItem");
const WebPerformer_1 = require("../../../Web/WebPerformer");
class Basic3DShape extends CategoryObject_1.CategoryObject {
    constructor(desktop, name) {
        super(desktop, name);
        this.wPerformer = new WebPerformer_1.WebPerformer();
        this.resources = [];
        this.grahicalData = new Map();
        this.size = [[0, 0, 0], [0, 0, 0], [0, 0, 0],];
        this.typeName = "Basic3DShape";
        this.types.push("Basic3DShape");
        this.types.push("IVisible");
        this.types.push("IPositionObject");
        this.types.push("ISaveGrahicalData");
        this.types.push("IStartPrimitive");
    }
    getURLResources() {
        return this.resources;
    }
    addURLRource(name, url, type) {
        var r = new ResourceItem_1.ResourceItem(name, url, type);
        this.resources.push(r);
    }
    startPrimitive() {
    }
    getSaveGrahicalData() {
        return this.grahicalData;
    }
    getVisibleSize() {
        return this.size;
    }
    setVisibleSize(size) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.size[i][j] = size[i][j];
            }
        }
    }
    postCreateResources(map) {
        this.resources = this.wPerformer.createResources(map);
    }
    getObjectPosition() {
        return this.position;
    }
    setObjectPosition(position) {
        this.position = position;
    }
}
exports.Basic3DShape = Basic3DShape;
//# sourceMappingURL=Basic3DShape.js.map