"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceManager = void 0;
const auxiliaries_1 = require("../auxiliaries");
const buffer_1 = require("../buffer");
const context_1 = require("../context");
const geometry_1 = require("../geometry");
const scene_1 = require("../scene");
const texture2d_1 = require("../texture2d");
/**
 * @todo add description
 */
class ResourceManager {
    /**
     * Context, used to get context information and WebGL API access.
     */
    _context;
    /**
     * Internal storage of 2D textures.
     */
    _texture2Ds = new Map();
    /**
     * Internal storage of material.
     */
    _materials = new Map();
    /**
     * Internal storage of geometries.
     */
    _geometries = new Map();
    /**
     * Internal storage of buffers.
     */
    _buffers = new Map();
    /**
     * Creates a resource manager that can be used to fetch and store resources such as textures, geometries, etc.
     * @param context - Valid context to created fetched objects for. Note that add external resources are expected to
     * belong to that same context.
     */
    constructor(context) {
        this._context = context;
    }
    /**
     * Creates a Texture2D object and asynchronously loads its image via URL or data URI (@see {@link Texture2D.fetch}).
     * @param url - Uniform resource locator string referencing the image that should be loaded (data URI supported).
     * @param crossOrigin - Enable cross origin data loading.
     * @param identifier - Meaningful name for identification of this instance.
     * @returns - Promise for handling image load status. Returns undefined if identifier already exists.
     */
    fetchTexture2D(identifier, url, crossOrigin = false) {
        if (this._texture2Ds.has(identifier)) {
            return undefined;
        }
        const texture = new texture2d_1.Texture2D(this._context, identifier);
        (0, auxiliaries_1.assert)(texture.identifier === identifier, `expected object identifier to be unchanged`);
        this._texture2Ds.set(identifier, texture);
        return texture.fetch(url, crossOrigin);
    }
    /**
     * Allows to add a resource that, e.g., was not fetched by this resource manager but was loaded or generated
     * somewhere else instead. Please note that by adding the resource, the manager assumes 'taking ownership'.
     * If all given identifiers are already in use, the resource manager does not take ownership of the resource.
     * @param resource - Resource to add.
     * @param identifiers - The identifiers by which the resource can be queried from the ResourceManager.
     * @returns - The array of added indentifiers. If an identifier already exists for another resource it is not added.
     */
    add(resource, identifiers) {
        const addedIdentifiers = new Array();
        if (resource instanceof texture2d_1.Texture2D) {
            const texture = resource;
            for (const identifier of identifiers) {
                if (!this._texture2Ds.has(identifier)) {
                    this._texture2Ds.set(identifier, texture);
                    addedIdentifiers.push(identifier);
                }
            }
        }
        if (resource instanceof scene_1.Material) {
            const material = resource;
            for (const identifier of identifiers) {
                if (!this._materials.has(identifier)) {
                    this._materials.set(identifier, material);
                    addedIdentifiers.push(identifier);
                }
            }
        }
        if (resource instanceof geometry_1.Geometry) {
            const geometry = resource;
            for (const identifier of identifiers) {
                if (!this._geometries.has(identifier)) {
                    this._geometries.set(identifier, geometry);
                    addedIdentifiers.push(identifier);
                }
            }
        }
        if (resource instanceof buffer_1.Buffer) {
            const buffer = resource;
            for (const identifier of identifiers) {
                if (!this._buffers.has(identifier)) {
                    this._buffers.set(identifier, buffer);
                    addedIdentifiers.push(identifier);
                }
            }
        }
        return addedIdentifiers;
    }
    /**
     * Queries a resource based on the given identifier.
     * @param identifier - Name of a previously added resource
     */
    get(identifier) {
        if (this._texture2Ds.has(identifier)) {
            return this._texture2Ds.get(identifier);
        }
        if (this._materials.has(identifier)) {
            return this._materials.get(identifier);
        }
        if (this._geometries.has(identifier)) {
            return this._geometries.get(identifier);
        }
        if (this._buffers.has(identifier)) {
            return this._buffers.get(identifier);
        }
        return undefined;
    }
    uninitialize() {
        for (const geometry of Array.from(this._geometries.values())) {
            if (geometry.initialized) {
                geometry.uninitialize();
            }
        }
        this._geometries.clear();
        for (const tex2D of Array.from(this._texture2Ds.values())) {
            if (tex2D.initialized) {
                tex2D.uninitialize();
            }
        }
        this._texture2Ds.clear();
        for (const buffer of Array.from(this._buffers.values())) {
            if (buffer.initialized) {
                buffer.uninitialize();
            }
        }
        this._buffers.clear();
        this._materials.clear();
    }
}
exports.ResourceManager = ResourceManager;
//# sourceMappingURL=resourcemanager.js.map