"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMesh = void 0;
const Performer_1 = require("../Performer");
const Effect_1 = require("./Effect");
class AbstractMesh {
    constructor() {
        this.typeName = "AbstractMesh";
        this.types = ["IObject", "IMesh", "INodeT<IMesh>", "IGeometry", "INamed", "AbstractMesh"];
        this.name = "";
        this.performer = new Performer_1.Performer();
        this.nodes = [];
        this.effect = new Effect_1.Effect();
        this.transformationMatrix = [];
        this.textures = [];
        this.normals = [];
        this.vertices = [];
        this.absolutevertices = [];
    }
    getAbsoluteVertices() {
        return this.absolutevertices;
    }
    getEffect() {
        return this.effect;
    }
    calculateAbsolute() {
    }
    getVertices() {
        return this.vertices;
    }
    getNormals() {
        return this.normals;
    }
    getTextures() {
        return this.textures;
    }
    getTransformationMatrix() {
        return this.transformationMatrix;
    }
    getNamedName() {
        return this.name;
    }
    setNamedName(name) {
        this.name = name;
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
    getParentT() {
        return this.parent;
    }
    setParentT(parent) {
        this.parent = parent;
    }
    getNodesT() {
        return this.nodes;
    }
    addNodeT(node) {
        this.nodes.push(node);
    }
    removeNodeT(node) {
        this.performer.remove(this.nodes, node);
    }
    getNodeValueT() {
        return this;
    }
}
exports.AbstractMesh = AbstractMesh;
//# sourceMappingURL=AbstractMesh.js.map