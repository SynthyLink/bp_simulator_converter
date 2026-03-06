"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initializable = void 0;
const auxiliaries_1 = require("./auxiliaries");
/**
 * Mixin that incorporates basic (un-)initialization workflow. The inheritor should specialize initialize and
 * uninitialize and decorate them with @initialize and @uninitialize respectively. When the object gets constructed it
 * is not initialized. It can be initialized only when it is not initialized and uninitialized vice versa. Failure
 * states result in invalid asserts.
 * The initialization status within the inheritor can be asserted using assertInitialized and assertUninitialized.
 * Note that the use of this class requires decorator support (compilerOptions: experimentalDecorators: true).
 * ```
 * class Test extends Initializable {
 *
 *     @initialize()
 *     initialize(name: string): boolean {
 *         ....
 *         return true;
 *     }
 *
 *     @uninitialize()
 *     uninitialize(): void {
 *         ...
 *     }
 *
 *     doStuffWhenInitialized(): void {
 *         this.assertInitialized();
 *         ...
 *     }
 *     // ... or alternatively:
 *     @assert_initialized()
 *     doOtherStuffWhenInitialized(): void {
 *         ...
 *     }
 * ```
 */
class Initializable {
    /** @see {@link initialized} */
    _initialized = false;
    static assertInitializedFalse = (object) => 
    /* tslint:disable-next-line:semicolon */
    (0, auxiliaries_1.assert)(false, `instance of ${object.constructor.name} expected to be initialized`);
    static assertUninitializedFalse = (object) => 
    /* tslint:disable-next-line:semicolon */
    (0, auxiliaries_1.assert)(false, `instance of ${object.constructor.name} not expected to be initialized`);
    /**
     * Method decorator for initialization of Initializable inheritors. This decorator asserts the initialization status
     * of the instance that is to be initialized, invokes its initialization with arbitrary number of parameters,
     * and sets the initialization status to the initialization success (either false or true).
     * In order to encourage the use of `assertInitialized` and `assertUninitialized` they are dynamically
     * bound to either a static, always-failing assert or an empty/undefined function.
     */
    static initialize() {
        return (target, propertyKey, descriptor) => {
            const initialize = descriptor.value;
            /* tslint:disable-next-line:space-before-function-paren only-arrow-functions */
            descriptor.value = function () {
                (0, auxiliaries_1.assert)(this._initialized === false, `re-initialization of initialized object not anticipated`);
                /* Call actual initialization and set initialization status. */
                // eslint-disable-next-line prefer-rest-params
                this._initialized = initialize.apply(this, arguments);
                /* Assign assert functions for better performance when initialized. */
                if (this._initialized) {
                    this.assertInitialized = () => undefined;
                    this.assertUninitialized = () => Initializable.assertUninitializedFalse(this);
                }
                else {
                    this.assertUninitialized = () => undefined;
                    this.assertInitialized = () => Initializable.assertInitializedFalse(this);
                }
                return this._initialized;
            };
            return descriptor;
        };
    }
    /**
     * Method decorator for uninitialization of Initializable inheritors. This decorator asserts the initialization
     * status of the instance that is to be uninitialized, invokes its uninitialization, and falsifies the
     * initialization status. In order to encourage the use of `assertInitialized` and `assertUninitialized` they are
     * dynamically bound to a static, always-failing assert and an empty/undefined function respectively.
     */
    static uninitialize() {
        return (target, propertyKey, descriptor) => {
            const uninitialize = descriptor.value;
            /* tslint:disable-next-line:space-before-function-paren only-arrow-functions */
            descriptor.value = function () {
                (0, auxiliaries_1.assert)(this._initialized === true, `expected object to be initialized in order to uninitialize`);
                /* call actual uninitialization */
                uninitialize.apply(this);
                this._initialized = false;
                /* assign assert functions for better performance when uninitialized */
                this.assertUninitialized = () => undefined;
                this.assertInitialized = () => Initializable.assertInitializedFalse(this);
            };
            return descriptor;
        };
    }
    /**
     * Method decorator for discarding of Initializable inheritors. This decorator asserts the initialization
     * status of the instance that is to be discarded, invokes its uninitialization, and falsifies the
     * initialization status. In order to encourage the use of `assertInitialized` and `assertUninitialized` they are
     * dynamically bound to a static, always-failing assert and an empty/undefined function respectively.
     */
    static discard() {
        return (target, propertyKey, descriptor) => {
            const discard = descriptor.value;
            /* tslint:disable-next-line:space-before-function-paren only-arrow-functions */
            descriptor.value = function () {
                (0, auxiliaries_1.assert)(this._initialized === true, `expected object to be initialized in order to uninitialize`);
                /* call actual uninitialization */
                discard.apply(this);
                this._initialized = false;
                /* assign assert functions for better performance when uninitialized */
                this.assertUninitialized = () => undefined;
                this.assertInitialized = () => Initializable.assertInitializedFalse(this);
            };
            return descriptor;
        };
    }
    /**
     * Method decorator for asserting the initialization status of an initializable to be true.
     * @see {@link assertInitialized}
     */
    static assert_initialized() {
        return (target, propertyKey, descriptor) => {
            const initialize = descriptor.value;
            /* tslint:disable-next-line:space-before-function-paren only-arrow-functions */
            descriptor.value = function () {
                this.assertInitialized();
                /* call actual initialization and set initialization status */
                // eslint-disable-next-line prefer-rest-params
                return initialize.apply(this, arguments);
            };
            return descriptor;
        };
    }
    /**
     * Method decorator for asserting the initialization status of an initializable to be false.
     * @see {@link assertUninitialized}
     */
    static assert_uninitialized() {
        return (target, propertyKey, descriptor) => {
            const initialize = descriptor.value;
            /* tslint:disable-next-line:space-before-function-paren only-arrow-functions */
            descriptor.value = function () {
                this.assertUninitialized();
                /* Call actual initialization and set initialization status. */
                // eslint-disable-next-line prefer-rest-params
                initialize.apply(this, arguments);
            };
            return descriptor;
        };
    }
    /**
     * Asserts the objects initialization status to be true. Note that the implementation is cached and forwarded to
     * either an empty function when initialized and to an acutal assert(false) otherwise.
     */
    assertInitialized = () => Initializable.assertInitializedFalse(this);
    /**
     * Asserts the objects initialization status to be false. Note that the implementation is cached and forwarded to
     * either an empty function when uninitialized and to an acutal assert(false) otherwise.
     */
    assertUninitialized = () => undefined;
    /**
     * Property getter for readonly access to the initialization status of an initializable instance.
     */
    get initialized() {
        return this._initialized;
    }
}
exports.Initializable = Initializable;
//# sourceMappingURL=initializable.js.map