"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMasquerade = void 0;
const auxiliaries_1 = require("./auxiliaries");
const extensionshash_1 = require("./extensionshash");
/* spellchecker: enable */
/**
 * Mask object for context masquerade. It is used to artificially restrict the capabilities of context instances.
 * It is intended to simplify cross-browser testing without actually using different browsers.
 *
 * A mask can be instantiated in four different ways:
 * 1. by creating the object and explicitly configuring all values as required.
 * 2. from a preset identifier (all presets are stored in assets/masquerade.json).
 * 3. from an extension hash
 * 4. from GET parameters, either 'msqrd_p=<Identifer>' or 'msqrd_h=<ExtensionsHash>'.
 *
 * Intended use; when the context's static masquerade is set, all subsequent instances apply that mask:
 * ```
 * Context.masquerade = ContextMasquerade.fromHash('288M01-o');
 * ```
 */
class ContextMasquerade {
    /** @see {@link presets} */
    static MASQUERADE_JSON = require('./data/masquerade.json');
    /** @see {@link backend} */
    _backend;
    /** @see {@link extensionsStrive} */
    _extensionsStrive = new Array();
    /** @see {@link extensionsConceal} */
    _extensionsConceal = new Array();
    /** @see {@link functionsUndefine} */
    _functionsUndefine = new Array();
    /**
     * Generates a mask based on an extensions hash (encoding backend and extensions_strive). If extensions are strived
     * for, all extensions that are not explicitly mentioned will be added to the list of concealed extensions.
     * @param hash - Hash that is to be decoded for backend and extensions data.
     */
    static fromHash(hash) {
        const mask = new ContextMasquerade();
        const tuple = extensionshash_1.ExtensionsHash.decode(hash);
        mask._backend = tuple[0];
        mask._extensionsStrive = tuple[1];
        mask._extensionsConceal = extensionshash_1.ExtensionsHash.complement(mask._backend, mask._extensionsStrive);
        return mask;
    }
    /**
     * Creates a context mask based on a preset. Note that the presence of an extensions_hash overrides the backend,
     * extensions_strive, as well as extensions_conceal. Only the functions_undefine will be preserved in that case.
     * @param identifier - Name of a preset as specified in masquerade.json.
     */
    static fromPreset(identifier) {
        const mask = new ContextMasquerade();
        const identifiers = new Array();
        let preset;
        for (const p of ContextMasquerade.presets()) {
            identifiers.push(p.identifier);
            if (p.identifier !== identifier) {
                continue;
            }
            preset = p;
            break;
        }
        if (preset === undefined) {
            (0, auxiliaries_1.assert)(false, `expected valid identifier, available ['${identifiers.join('\', \'')}'], given '${identifier}'`);
        }
        preset = preset;
        if (preset.extensions_hash !== undefined) {
            const tuple = extensionshash_1.ExtensionsHash.decode(preset.extensions_hash);
            mask._backend = tuple[0];
            mask._extensionsStrive = tuple[1];
        }
        else {
            mask._backend = preset.backend;
        }
        (0, auxiliaries_1.assert)(mask._backend !== undefined, 'expected backend to be included in preset');
        if (preset.extensions_strive === undefined) {
            mask._extensionsStrive = [];
            mask._extensionsConceal = preset.extensions_conceal ? preset.extensions_conceal : [];
        }
        else {
            mask._extensionsStrive = preset.extensions_strive;
            mask._extensionsConceal = extensionshash_1.ExtensionsHash.complement(mask._backend, preset.extensions_strive);
        }
        mask._functionsUndefine = preset.functions_undefine ? preset.functions_undefine : [];
        return mask;
    }
    /**
     * Tries to generate a mask based on GET parameters: if msqrd_h is present, its value is interpreted as
     * extensions hash and a mask is generated from hash. If no hash was found, presence of msqrd_p is evaluated and if
     * found, a mask is generated from preset identifier.
     */
    static fromGET() {
        const msqrdHash = (0, auxiliaries_1.GETparameter)('msqrd_h');
        if (msqrdHash !== undefined) {
            return ContextMasquerade.fromHash(msqrdHash);
        }
        const msqrdPreset = (0, auxiliaries_1.GETparameter)('msqrd_p');
        if (msqrdPreset !== undefined) {
            return ContextMasquerade.fromPreset(msqrdPreset);
        }
        return undefined;
    }
    /*
     * Presets for emulation of various browsers. This can be used to maintain multiple test configurations and
     * simplify cross-browser testing without actually using different browsers.
     */
    static presets() {
        return this.MASQUERADE_JSON;
    }
    /**
     * Defines the backend (currently either 'webgl1' or 'webgl2').
     */
    get backend() {
        return this._backend;
    }
    /**
     * Extensions that the context should strive to support. The support can only go as far as the extensions are
     * actually supported.
     */
    get extensionsStrive() {
        return this._extensionsStrive;
    }
    /**
     * Extensions that the context should conceal support of. This only affects supported extensions, which will
     * be reported to be not supported.
     */
    get extensionsConceal() {
        return this._extensionsConceal;
    }
    /**
     * Functions that the context should delete during construction. Since WebGL context functions cannot be deleted
     * they are undefined instead.
     */
    get functionsUndefine() {
        return this._functionsUndefine;
    }
}
exports.ContextMasquerade = ContextMasquerade;
//# sourceMappingURL=contextmasquerade.js.map