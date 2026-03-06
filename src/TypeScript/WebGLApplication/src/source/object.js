"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractObject = void 0;
const auxiliaries_1 = require("./auxiliaries");
const context_1 = require("./context");
const initializable_1 = require("./initializable");
/* spellchecker: enable */
/**
 * A generic WebGL object trait that has a size, a status, an identifier, and is initializable. A context and an object
 * handle are provided for internal use and can be read from outside. Furthermore, an object supports optional reference
 * counting. If used, an object cannot be initialized when already referenced, and cannot be delete as long as at least
 * a single reference is active.
 */
class AbstractObject extends initializable_1.Initializable {
    /** @see {@link context} */
    _context;
    /** @see {@link identifier} */
    _identifier;
    /** @see {@link object} */
    _object;
    /** @see {@link valid} */
    _valid = false;
    /**
     * Number of references to this object. If at least a single reference was counted, this object can neither be
     * initialized (and thus created) nor uninitialized (and thus deleted). The reference count is controlled via
     * ref() and unref() functions.
     */
    _referenceCount = 0;
    /**
     * Object constructor, requires a context and a valid identifier.
     * @param context - Valid context to create the object for.
     * @param identifier - Meaningful name for identification of this instance.
     */
    constructor(context, identifier) {
        super();
        this._context = context;
        this._identifier = identifier !== undefined && identifier !== `` ? identifier : 'Object';
    }
    /**
     * @override
     * Ensure that an object handle is created at the point of initialization. When overriding this function
     * super.initialize() has to be invoked immediately/first. Please note that initialization of invalid
     * object raises an assertion in order to prevent further actions without a valid WebGL object. After
     * object creation the valid property is expected to be set accordingly.
     */
    @initializable_1.Initializable.initialize()
    initialize(...args) {
        this._identifier = this._context.allocationRegister.createUniqueIdentifier(this._identifier);
        this.create(...args);
        if (!this._valid) {
            this._context.allocationRegister.deleteUniqueIdentifier(this._identifier);
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Error, `initialization of '${this._identifier}' failed`);
        }
        return this._valid;
    }
    /**
     * @override
     * Ensure that an object handle is deleted, invalidated, and its allocated GPU resources are set to zero.
     * When overriding this function super.uninitialize() has to be invoked last/at the end.
     * Note that an object cannot be uninitialized if it is referenced (reference count > 0).
     */
    @initializable_1.Initializable.uninitialize()
    uninitialize() {
        this._context.allocationRegister.reallocate(this._identifier, 0);
        this._context.allocationRegister.deleteUniqueIdentifier(this._identifier);
        this.delete();
        (0, auxiliaries_1.assert)(this._object === undefined, `expected object '${this._identifier}' to be undefined after delete`);
        (0, auxiliaries_1.assert)(this._valid === false, `expected object '${this._identifier}' to be invalid after delete`);
    }
    /**
     * Read-only access to the objects context, used to get context information and WebGL API access.
     */
    get context() {
        return this._context;
    }
    /**
     * Every GPU asset that allocates memory should provide a human readable identifier for GPU allocation tracking and
     * debugging purposes. Please note that the identifier might changed on initialization due to the generation and
     * assignment of a unique identifier.
     * @returns - This assets identifier used for gpu allocation tracking and debugging.
     */
    get identifier() {
        return this._identifier;
    }
    /**
     * Read-only access to the WebGL object handle.
     */
    get object() {
        (0, auxiliaries_1.assert)(this._object !== undefined, `access to undefined object`);
        return this._object;
    }
    /**
     * Cached object status used to derive validity when initialized.
     * @returns - True if the object status is complete, false otherwise.
     */
    get valid() {
        return this._valid;
    }
    /**
     * Increment the reference count of this object.
     */
    ref() {
        (0, auxiliaries_1.assert)(this.initialized, `expected object to be initialized in order to be referenced`);
        ++this._referenceCount;
    }
    /**
     * Decrement the reference count of this object.
     */
    unref() {
        (0, auxiliaries_1.assert)(this._referenceCount > 0, `expected object to be referenced in order to decrease its reference count`);
        --this._referenceCount;
    }
}
exports.AbstractObject = AbstractObject;
//# sourceMappingURL=object.js.map