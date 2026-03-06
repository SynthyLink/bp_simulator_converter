"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
/**
 * The text object is intended as character sequence manipulation interface. A text can be referenced by multiple labels
 * for rendering and interaction. E.g., a single text could be rendered multiple times at different locations or using
 * different font faces, alignments, etc. The text object will probably increase in complexity when additional features
 * such as text formatting (bold, italic, varying size), (multi)cursor, (multi)selection, etc. will be added.
 */
class Text {
    static DEFAULT_LINE_FEED = '\x0A';
    /** @see {@link text} */
    _text;
    /** @see {@link lineFeed} */
    _lineFeed = Text.DEFAULT_LINE_FEED;
    /** @see {@link altered} */
    _altered = false;
    /**
     * Constructs a Text to be used for a Label.
     * @param text - the actual content of this Text.
     * @param lineFeed - char for lineFeed, default is LF.
     */
    constructor(text, lineFeed) {
        this._text = text ? text : '';
        this._lineFeed = lineFeed !== undefined ? lineFeed : this._lineFeed;
    }
    /**
     * Length of the text, i.e., number of characters within the text.
     */
    get length() {
        return this._text.length;
    }
    /**
     * Returns the character at the specified index.
     * @param index - The zero-based index of the desired character.
     * @returns character at the specified index
     */
    charAt(index) {
        return this._text.charAt(index);
    }
    /**
     * Returns the Unicode value (codepoint) of the character at the specified location.
     * @param index - The zero-based index of the desired character.
     * @returns - Codepoint of the character at given index or NaN, if no character exists at index.
     */
    charCodeAt(index) {
        return this._text.charCodeAt(index);
    }
    /**
     * Text that is to be rendered.
     */
    set text(text) {
        if (this._text === text) {
            return;
        }
        this._altered = true;
        this._text = text;
    }
    get text() {
        return this._text;
    }
    /**
     * Character that is to be used for Line feed.
     */
    set lineFeed(lineFeed) {
        if (this._lineFeed === lineFeed) {
            return;
        }
        this._altered = true;
        this._lineFeed = lineFeed;
        return;
    }
    get lineFeed() {
        return this._lineFeed;
    }
    /**
     * Intended for resetting alteration status.
     */
    set altered(altered) {
        this._altered = altered;
    }
    /*
     * Whether or not any other public property has changed.
     */
    get altered() {
        return this._altered;
    }
}
exports.Text = Text;
//# sourceMappingURL=text.js.map