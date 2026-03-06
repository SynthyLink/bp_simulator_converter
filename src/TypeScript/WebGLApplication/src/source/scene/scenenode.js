"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneNode = void 0;
const scenenodecomponent_1 = require("./scenenodecomponent");
/**
 * This class describes a node in a scene hierarchy. To render a scene, a renderer can traverse the hierarchy
 * of SceneNodes, while recursively applying the transformations specfied by each node.
 * Every node contains components that describe the contents of the node, e.g. the contained geometry or the
 * applied transformation.
 */
class SceneNode {
    /** @see {@link name} */
    _name;
    /** @see {@link parent} */
    _parent;
    /** @see {@link nodes} */
    _nodes = new Array();
    /** @see {@link components} */
    _components = new Array();
    /**
     * Constucts a new scene node
     * @param name - The name of the new node
     */
    constructor(name) {
        this._name = name;
        this._parent = undefined;
    }
    /**
     * Traverses the node hierarchy starting at this node and applies the given callback to each node.
     * @param callback - Function that will be called for each node in the tree.
     */
    traverse(callback) {
        callback(this);
        /* Forwarding traversal. */
        for (const child of this._nodes) {
            child.traverse(callback);
        }
    }
    /**
     * Add a child node to this node.
     * @param node - The child that will be added
     */
    addNode(node) {
        node._parent = this;
        this._nodes.push(node);
        return node;
    }
    /**
     * Add a component to this node.
     * @param component - Component to add
     */
    addComponent(component) {
        this._components.push(component);
        return component;
    }
    /**
     * Find all components of a specfic type that are registered on this node.
     * @param type - @todo Name of component type to search for
     */
    componentsOfType(type) {
        return this._components.filter((component) => type === component.type);
    }
    /**
     * Read-only access to the name of this node.
     */
    get name() {
        return this._name;
    }
    /**
     * Read-only access to the parent node of this node if one exists.
     */
    get parent() {
        return this._parent;
    }
    /**
     * Read-only access to the child nodes of this node.
     */
    get nodes() {
        return this._nodes;
    }
    /**
     * Read-only access to the components attached to this node.
     */
    get components() {
        return this._components;
    }
    /**
     * Returns whether this node is a leaf, i.e. there are no child nodes attached to it.
     */
    get isLeaf() {
        return this._nodes.length === 0;
    }
    /**
     * Returns whether this is the root node, i.e. it has no parent.
     */
    get isRoot() {
        return this._parent === undefined;
    }
}
exports.SceneNode = SceneNode;
//# sourceMappingURL=scenenode.js.map