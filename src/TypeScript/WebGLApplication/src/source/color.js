"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const auxiliaries_1 = require("./auxiliaries");
const tuples_1 = require("./tuples");
/**
 * Color class that allows for specification and conversion of colors in various color spaces. Please not that most of
 * the color conversion math is based on  {@link https://www.easyrgb.com/en/math.php}. The internal color representation
 * is a 4-tuple of GLclampf components in RGB color space and additional alpha. All color conversion, e.g., getters is
 * computed on the fly, not cached, and is not optimized for, e.g., massive pixel processing.
 */
class Color {
    static DEFAULT_ALPHA = 1.0;
    static HEX_FORMAT_REGEX = new RegExp(/^(#|0x)?(([0-9a-f]{3}){1,2}|([0-9a-f]{4}){1,2})$/i);
    _rgba = [0.0, 0.0, 0.0, Color.DEFAULT_ALPHA];
    /** @see {@link altered} */
    _altered = false;
    /**
     * Converts a hue value into an rgb value.
     */
    static hue2rgb(p, q, t) {
        (0, auxiliaries_1.assert)(t >= -1.0 && t <= 2.0, `t is expected to be between -1 and 2`);
        if (t < 0.0) {
            t += 1.0;
        }
        else if (t > 1.0) {
            t -= 1.0;
        }
        if ((6.0 * t) < 1.0) {
            return p + (q - p) * 6.0 * t;
        }
        if ((2.0 * t) < 1.0) {
            return q;
        }
        if ((3.0 * t) < 2.0) {
            return p + (q - p) * 6.0 * (2.0 / 3.0 - t);
        }
        return p;
    }
    /**
     * Converts a float value to two-character HEX code.
     * @param value - A float value in [0.0, 1.0].
     * @returns - Two-character hexadecimal representation in [00, FF].
     */
    static to2CharHexCode(value) {
        return (value < 15.5 / 255.0 ? '0' : '') + Math.round(value * 255.0).toString(16);
    }
    /**
     * Converts a color from HSL space to RGB space.
     * @param hsl - HSL color tuple: hue, saturation, and lightness, each in [0.0, 1.0].
     * @returns - RGB color tuple: red, green, and blue, each in [0.0, 1.0].
     */
    static hsl2rgb(hsl) {
        const hslF = (0, tuples_1.clampf3)(hsl, 'HSL input');
        if (hslF[1] === 0.0) {
            return [hslF[2], hslF[2], hslF[2]];
        }
        const q = hslF[2] < 0.5 ? hslF[2] * (1.0 + hslF[1]) : (hslF[2] + hslF[1]) - (hslF[1] * hslF[2]);
        const p = 2.0 * hslF[2] - q;
        return [Color.hue2rgb(p, q, hslF[0] + (1.0 / 3.0)),
            Color.hue2rgb(p, q, hslF[0]), Color.hue2rgb(p, q, hslF[0] - (1.0 / 3.0))];
    }
    /**
     * Converts a color from HSL space to RGB space.
     * @param rgb - RGB color tuple: red, green, and blue, each in [0.0, 1.0].
     * @returns - HSL color tuple: hue, saturation, and lightness, each in [0.0, 1.0].
     */
    static rgb2hsl(rgb) {
        const rgbF = (0, tuples_1.clampf3)(rgb, 'RGB input');
        const hsl = [0.0, 0.0, 0.0];
        const min = Math.min(rgbF[0], rgbF[1], rgbF[2]);
        const max = Math.max(rgbF[0], rgbF[1], rgbF[2]);
        const delta = max - min;
        hsl[2] = (max + min) * 0.5;
        if (delta === 0.0) {
            return hsl;
        }
        hsl[1] = hsl[2] < 0.5 ? delta / (max + min) : delta / (2.0 - max - min);
        const deltaR = (((max - rgbF[0]) / 6.0) + (delta / 2.0)) / delta;
        const deltaG = (((max - rgbF[1]) / 6.0) + (delta / 2.0)) / delta;
        const deltaB = (((max - rgbF[2]) / 6.0) + (delta / 2.0)) / delta;
        if (rgbF[0] === max) {
            hsl[0] = deltaB - deltaG;
        }
        else if (rgbF[1] === max) {
            hsl[0] = deltaR - deltaB + (1.0 / 3.0);
        }
        else { // if (rgbF[2] === max) {
            hsl[0] = deltaG - deltaR + (2.0 / 3.0);
        }
        return hsl;
    }
    /**
     * Converts a color from LAB space to XYZ space (D65/2° illuminant)
     * @param lab - LAB color tuple: lightness, greenRed, and blueYellow, each in [0.0, 1.0].
     * @returns - XYZ color tuple: x, y, and z, each in [0.0, 1.0].
     */
    static lab2xyz(lab) {
        const labF = (0, tuples_1.clampf3)(lab, 'LAB input');
        /** The following computation assumes the value ranges:
         *  L: [0, 100], a: [-128, 127], b: [-128, 127]
         */
        const yr = (100.0 * labF[0] + 16.0) / 116.0;
        const xr = (256.0 * labF[1] - 128.0) / 500.0 + yr;
        const zr = yr - (256.0 * labF[2] - 128.0) / 200.0;
        const xr3 = Math.pow(xr, 3.0);
        const yr3 = Math.pow(yr, 3.0);
        const zr3 = Math.pow(zr, 3.0);
        /* D65/2° illuminant for XYZ conversion */
        const x = 0.95047 * (xr3 > 0.008856 ? xr3 : (xr - 16.0 / 116.0) / 7.787);
        const y = 1.00000 * (yr3 > 0.008856 ? yr3 : (yr - 16.0 / 116.0) / 7.787);
        const z = 1.08883 * (zr3 > 0.008856 ? zr3 : (zr - 16.0 / 116.0) / 7.787);
        return [x, y, z];
    }
    /**
     * Converts a color from XYZ space to CIE-Lab space.
     * @param xyz - XYZ color tuple: x, y, and z, and refer to the D65/2° illuminant.
     * @returns - LAB color tuple: lightness, greenRed, and blueYellow, each in [0.0, 1.0].
     */
    static xyz2lab(xyz) {
        // DO NOT CLAMP! const xyzF = clampf3(xyz, 'XYZ input');
        const xyzF = [xyz[0] / 0.95047, xyz[1] / 1.00000, xyz[2] / 1.08883];
        /* implicit illuminant of [1.0, 1.0, 1.0] assumed */
        const x = xyzF[0] > 0.008856 ? Math.cbrt(xyzF[0]) : (7.787 * xyzF[0] + (16.0 / 116.0));
        const y = xyzF[1] > 0.008856 ? Math.cbrt(xyzF[1]) : (7.787 * xyzF[1] + (16.0 / 116.0));
        const z = xyzF[2] > 0.008856 ? Math.cbrt(xyzF[2]) : (7.787 * xyzF[2] + (16.0 / 116.0));
        /* scale to range [0.0, 1.0] - typically L is in [0,-100], a and b in [-128,+127] */
        return (0, tuples_1.clampf3)([
            (116.0 * y - 16.0) / 100.0,
            (500.0 * (x - y) + 128.0) / 256.0,
            (200.0 * (y - z) + 128.0) / 256.0
        ]);
    }
    /**
     * Converts a color from XYZ space to Adobe-RGB space.
     * @param xyz - XYZ color tuple: x, y, and z, and refer to the D65/2° illuminant.
     * @returns - RGB color tuple: red, green, and blue, each in [0.0, 1.0]
     */
    static xyz2rgb(xyz) {
        // DO NOT CLAMP! const xyzF = clampf3(xyz, 'XYZ input');
        const r = xyz[0] * +2.04137 + xyz[1] * -0.56495 + xyz[2] * -0.34469;
        const g = xyz[0] * -0.96927 + xyz[1] * +1.87601 + xyz[2] * +0.04156;
        const b = xyz[0] * +0.01345 + xyz[1] * -0.11839 + xyz[2] * +1.01541;
        return (0, tuples_1.clampf3)([
            r > 0.0 ? Math.pow(r, 1.0 / 2.19921875) : 0,
            g > 0.0 ? Math.pow(g, 1.0 / 2.19921875) : 0,
            b > 0.0 ? Math.pow(b, 1.0 / 2.19921875) : 0
        ]);
        // Standard-RGB
        // let r = xyz[0] * +3.2406 + xyz[1] * -1.5372 + xyz[2] * -0.4986;
        // let g = xyz[0] * -0.9689 + xyz[1] * +1.8758 + xyz[2] * +0.0415;
        // let b = xyz[0] * +0.0557 + xyz[1] * -0.2040 + xyz[2] * +1.0570;
        // r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : 12.92 * r;
        // g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : 12.92 * g;
        // b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : 12.92 * b;
        // return [r, g, b];
    }
    /**
     * Converts a color from Adobe-RGB space to XYZ space.
     * @param rgb - RGB color tuple: red, green, and blue, each in [0.0, 1.0]
     * @returns - XYZ color tuple: x, y, and z, each in [0.0, 1.0].
     */
    static rgb2xyz(rgb) {
        const rgbF = (0, tuples_1.clampf3)(rgb, 'RGB input');
        const r = Math.pow(rgbF[0], 2.19921875);
        const g = Math.pow(rgbF[1], 2.19921875);
        const b = Math.pow(rgbF[2], 2.19921875);
        const x = r * 0.57667 + g * 0.18555 + b * 0.18819;
        const y = r * 0.29738 + g * 0.62735 + b * 0.07527;
        const z = r * 0.02703 + g * 0.07069 + b * 0.99110;
        return [x, y, z];
    }
    /**
     * Converts a color from LAB space to RGB space.
     * @param lab - LAB color tuple: lightness, greenRed, and blueYellow, each in [0.0, 1.0].
     * @returns - RGB color tuple: red, green, and blue, each in [0.0, 1.0]
     */
    static lab2rgb(lab) {
        return Color.xyz2rgb(Color.lab2xyz(lab));
    }
    /**
     * Converts a color from RGB space to LAB space.
     * @param lab - LAB color tuple: lightness, greenRed, and blueYellow, each in [0.0, 1.0].
     * @returns - RGB color tuple: red, green, and blue, each in [0.0, 1.0]
     */
    static rgb2lab(rgb) {
        return Color.xyz2lab(Color.rgb2xyz(rgb));
    }
    /**
     * Converts a color from CMYK space to RGB space.
     * @param cmyk - CMYK color tuple: cyan, magenta, yellow, and key, each in [0.0, 1.0].
     * @returns - RGB color tuple: red, green, and blue, each in [0.0, 1.0]
     */
    static cmyk2rgb(cmyk) {
        const cmykF = (0, tuples_1.clampf4)(cmyk, 'CMYK input');
        const k = 1.0 - cmykF[3];
        return [(1.0 - cmykF[0]) * k, (1.0 - cmykF[1]) * k, (1.0 - cmykF[2]) * k];
    }
    /**
     * Converts a color from RGB space to CMYK space.
     * @param rgb - RGB color tuple: red, green, and blue, each in [0.0, 1.0]
     * @returns - CMYK color tuple: cyan, magenta, yellow, and key, each in [0.0, 1.0].
     */
    static rgb2cmyk(rgb) {
        const rgbF = (0, tuples_1.clampf3)(rgb, 'RGB input');
        const k1 = 1.0 - Math.max(rgbF[0], rgbF[1], rgbF[2]);
        const k2 = 1.0 - k1;
        const k3 = k2 === 0.0 ? 0.0 : 1.0 / k2;
        return [(k2 - rgbF[0]) * k3, (k2 - rgbF[1]) * k3, (k2 - rgbF[2]) * k3, k1];
    }
    /**
     * Converts a color from HEX string to RGBA space. The hex string can start with '#' or '0x' or neither of these.
     * @param hex - Hexadecimal color string: red, green, and blue, each in ['00', 'ff'].
     * @returns - RGBA color tuple: red, green, blue, and alpha, each in [0.0, 1.0]. On error [0, 0, 0, 0] is returned.
     */
    static hex2rgba(hex) {
        const rgba = [0.0, 0.0, 0.0, Color.DEFAULT_ALPHA];
        if (!Color.HEX_FORMAT_REGEX.test(hex)) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, `hexadecimal RGBA color string must conform to either \
'0x0000', '#0000', '0000', '0x00000000', '#00000000', or '00000000', given '${hex}'`);
            return rgba;
        }
        const offset = hex.startsWith('0x') ? 2 : hex.startsWith('#') ? 1 : 0;
        const length = Math.floor((hex.length - offset) / 3);
        const stride = length - 1;
        rgba[0] = parseInt(hex[offset + 0 * length] + hex[offset + 0 * length + stride], 16) / 255.0;
        rgba[1] = parseInt(hex[offset + 1 * length] + hex[offset + 1 * length + stride], 16) / 255.0;
        rgba[2] = parseInt(hex[offset + 2 * length] + hex[offset + 2 * length + stride], 16) / 255.0;
        if ((hex.length - offset) === 4 || (hex.length - offset) === 8) {
            rgba[3] = parseInt(hex[offset + 3 * length] + hex[offset + 3 * length + stride], 16) / 255.0;
        }
        (0, auxiliaries_1.assert)(!isNaN(rgba[0]) && !isNaN(rgba[1]) && !isNaN(rgba[2]) && !isNaN(rgba[3]), `expected well formated hexadecimal RGBA string, given '${hex}'`);
        return rgba;
    }
    /**
     * Converts a color from RGB space to HEX string.
     * @param rgb - RGB color tuple: red, green, and blue, each in [0.0, 1.0]
     * @returns - Hexadecimal color string: red, green, and blue, each in ['00', 'ff'], with '#' prefix
     */
    static rgb2hex(rgb) {
        const rgbF = (0, tuples_1.clampf3)(rgb, 'RGB input');
        const r = Color.to2CharHexCode(rgbF[0]);
        const g = Color.to2CharHexCode(rgbF[1]);
        const b = Color.to2CharHexCode(rgbF[2]);
        return '#' + r + g + b;
    }
    /**
     * Converts a color from RGBA space to HEX string.
     * @param rgba - RGBA color tuple: red, green, blue, and alpha, each in [0.0, 1.0]
     * @returns - Hexadecimal color string: red, green, blue, and alpha, each in ['00', 'ff'], with '#' prefix
     */
    static rgba2hex(rgba) {
        const rgbaF = (0, tuples_1.clampf4)(rgba, 'RGBA input');
        const r = Color.to2CharHexCode(rgbaF[0]);
        const g = Color.to2CharHexCode(rgbaF[1]);
        const b = Color.to2CharHexCode(rgbaF[2]);
        const a = Color.to2CharHexCode(rgbaF[3]);
        return '#' + r + g + b + a;
    }
    /**
     * Performs a linear interpolation between x and y using a to weight between them within the specified color space.
     * @param x - First color stop for lerp/linear interpolation.
     * @param y - Second color stop for lerp/linear interpolation.
     * @param a - Specify the value to use to interpolate between x and y.
     * @param space - The color space that is to be used for linear interpolation of two colors.
     */
    static lerp(x, y, a, space = Color.Space.LAB) {
        if (a <= 0.0) {
            return new Color(x.rgba);
        }
        else if (a >= 1.0) {
            return new Color(y.rgba);
        }
        const result = gl_matrix_1.vec4.create();
        // eslint-disable-next-line default-case
        switch (space) {
            case Color.Space.CMYK:
                gl_matrix_1.vec4.lerp(result, x.cmyk, y.cmyk, a);
                const alpha = (0, gl_matrix_extensions_1.mix)(x.a, y.a, a);
                return new Color().fromCMYK(result[0], result[1], result[2], result[3], alpha);
            case Color.Space.LAB:
                gl_matrix_1.vec4.lerp(result, x.laba, y.laba, a);
                return new Color().fromLAB(result[0], result[1], result[2], result[3]);
            case Color.Space.HSL:
                gl_matrix_1.vec4.lerp(result, x.hsla, y.hsla, a);
                return new Color().fromHSL(result[0], result[1], result[2], result[3]);
            case Color.Space.RGB:
                gl_matrix_1.vec4.lerp(result, x.rgba, y.rgba, a);
                return new Color().fromRGB(result[0], result[1], result[2], result[3]);
        }
    }
    /**
     * Creates an instance of color (a 4-tuple in RGBA space).
     * @param rgba - Either RGB tuple or RGBA tuple. If none is provided, default will be kept.
     * @param alpha - If RGB tuple is provided an additional alpha value can be specified.
     */
    constructor(rgba, alpha) {
        if (rgba === undefined) {
            return;
        }
        if (rgba.length === 3 && alpha !== undefined) {
            this.fromF32(rgba[0], rgba[1], rgba[2], alpha);
        }
        else if (rgba.length === 4) {
            this.fromF32(rgba[0], rgba[1], rgba[2], rgba[3]);
            (0, auxiliaries_1.assert)(alpha === undefined, `expected alpha to be undefined when given an 4-tuple in RGBA`);
        }
        else {
            this.fromF32(rgba[0], rgba[1], rgba[2]);
        }
    }
    /**
     * Checks whether or not this color matches a second color (based on internal rgba floating representation).
     * @param other - Color to compare color values to.
     * @returns - True iff both colors have the exact same rgba floating point values.
     */
    equals(other) {
        return (0, tuples_1.equals4)(this._rgba, other._rgba);
    }
    /**
     * Specifies the internal rgba store using a color in float (32bit) RGBA colors.
     * @param red - Red color component in [0.0, 1.0]
     * @param green - Green color component in [0.0, 1.0]
     * @param blue - Blue color component in [0.0, 1.0]
     * @param alpha - Alpha color component in [0.0, 1.0]
     * @returns - The color instance (this).
     */
    fromF32(red, green, blue, alpha = Color.DEFAULT_ALPHA) {
        const previous = (0, tuples_1.duplicate4)(this._rgba);
        this._rgba[0] = (0, tuples_1.clampf)(red, `red value`);
        this._rgba[1] = (0, tuples_1.clampf)(green, `green value`);
        this._rgba[2] = (0, tuples_1.clampf)(blue, `blue value`);
        this._rgba[3] = (0, tuples_1.clampf)(alpha, `alpha value`);
        this._altered = !(0, tuples_1.equals4)(this._rgba, previous);
        return this;
    }
    /**
     * Specifies the internal rgba store using a color in unsigned int (8bit) RGBA colors.
     * @param red - Red color component in [0, 255]
     * @param green - Green color component in [0, 255]
     * @param blue - Blue color component in [0, 255]
     * @param alpha - Alpha color component in [0, 255]
     * @returns - The color instance (this).
     */
    fromUI8(red, green, blue, alpha = Math.floor(Color.DEFAULT_ALPHA * 255)) {
        const previous = (0, tuples_1.duplicate4)(this._rgba);
        this._rgba[0] = (0, gl_matrix_extensions_1.clamp)(red, 0, 255) / 255.0;
        this._rgba[1] = (0, gl_matrix_extensions_1.clamp)(green, 0, 255) / 255.0;
        this._rgba[2] = (0, gl_matrix_extensions_1.clamp)(blue, 0, 255) / 255.0;
        this._rgba[3] = (0, gl_matrix_extensions_1.clamp)(alpha, 0, 255) / 255.0;
        this._altered = !(0, tuples_1.equals4)(this._rgba, previous);
        return this;
    }
    /**
     * Specifies the internal rgba store using a color in RGB color space.
     * @param red - Red color component in [0.0, 1.0]
     * @param green - Green color component in [0.0, 1.0]
     * @param blue - Blue color component in [0.0, 1.0]
     * @param alpha - Alpha color component in [0.0, 1.0]
     * @returns - The color instance (this).
     */
    fromRGB(red, green, blue, alpha = Color.DEFAULT_ALPHA) {
        const previous = (0, tuples_1.duplicate4)(this._rgba);
        this._rgba = (0, tuples_1.clampf4)([red, green, blue, alpha], 'RGBA input');
        this._altered = !(0, tuples_1.equals4)(this._rgba, previous);
        return this;
    }
    /**
     * Specifies the internal rgba store using a color in HSL color space.
     * @param hue - Hue color component in [0.0, 1.0]
     * @param saturation - Saturation color component in [0.0, 1.0]
     * @param lightness - Lightness color component in [0.0, 1.0]
     * @param alpha - Alpha color component in [0.0, 1.0]
     * @returns - The color instance (this).
     */
    fromHSL(hue, saturation, lightness, alpha = Color.DEFAULT_ALPHA) {
        const previous = (0, tuples_1.duplicate4)(this._rgba);
        const rgb = Color.hsl2rgb([hue, saturation, lightness]);
        const alphaf = (0, tuples_1.clampf)(alpha, 'ALPHA input');
        this._rgba = [rgb[0], rgb[1], rgb[2], alphaf];
        this._altered = !(0, tuples_1.equals4)(this._rgba, previous);
        return this;
    }
    /**
     * Specifies the internal rgba store using a color in CIE-Lab color space.
     * @param lightness - Lightness color component in [0.0, 1.0]
     * @param greenRed - Green-Red/a color component in [0.0, 1.0]
     * @param blueYellow - Blue-Yellow/b color component in [0.0, 1.0]
     * @param alpha - Alpha color component in [0.0, 1.0]
     * @returns - The color instance (this).
     */
    fromLAB(lightness, greenRed, blueYellow, alpha = Color.DEFAULT_ALPHA) {
        const previous = (0, tuples_1.duplicate4)(this._rgba);
        const rgb = Color.lab2rgb([lightness, greenRed, blueYellow]);
        const alphaf = (0, tuples_1.clampf)(alpha, 'ALPHA input');
        this._rgba = [rgb[0], rgb[1], rgb[2], alphaf];
        this._altered = !(0, tuples_1.equals4)(this._rgba, previous);
        return this;
    }
    /**
     * Specifies the internal rgba store using a color in CMYK color space.
     * @param cyan - Cyan color component in [0.0, 1.0]
     * @param magenta - Magenta color component in [0.0, 1.0]
     * @param yellow - Yellow color component in [0.0, 1.0]
     * @param key - Key/Black color component in [0.0, 1.0]
     * @param alpha - Alpha color component in [0.0, 1.0]
     * @returns - The color instance (this).
     */
    fromCMYK(cyan, magenta, yellow, key, alpha = Color.DEFAULT_ALPHA) {
        const previous = (0, tuples_1.duplicate4)(this._rgba);
        const rgb = Color.cmyk2rgb([cyan, magenta, yellow, key]);
        const alphaf = (0, tuples_1.clampf)(alpha, 'ALPHA input');
        this._rgba = [rgb[0], rgb[1], rgb[2], alphaf];
        this._altered = !(0, tuples_1.equals4)(this._rgba, previous);
        return this;
    }
    /**
     * Specifies the internal rgba store using a hexadecimal color string.
     * @param hex - Hexadecimal color string: red, green, blue, and alpha (optional) each in ['00', 'ff'].
     * @returns - The color instance (this).
     */
    fromHex(hex) {
        const previous = (0, tuples_1.duplicate4)(this._rgba);
        this._rgba = Color.hex2rgba(hex);
        this._altered = !(0, tuples_1.equals4)(this._rgba, previous);
        return this;
    }
    /**
     * Converts the color to a gray value using the specified algorithm.
     * @param algorithm - The algorithm used for color to gray conversion.
     */
    gray(algorithm = Color.GrayscaleAlgorithm.LinearLuminance) {
        // eslint-disable-next-line default-case
        switch (algorithm) {
            /* Does not represent shades of grayscale w.r.t. human perception of luminosity. */
            case Color.GrayscaleAlgorithm.Average:
                return (this._rgba[0] + this._rgba[1] + this._rgba[2]) / 3.0;
            /* flat (reduced contrast) and dark grayscale */
            case Color.GrayscaleAlgorithm.LeastSaturatedVariant:
                return (Math.max(this._rgba[0], this._rgba[1], this._rgba[2])
                    - Math.min(this._rgba[0], this._rgba[1], this._rgba[2])) * 0.5;
            /* provides a darker grayscale */
            case Color.GrayscaleAlgorithm.MinimumDecomposition:
                return Math.min(this._rgba[0], this._rgba[1], this._rgba[2]);
            /* provides a brighter grayscale */
            case Color.GrayscaleAlgorithm.MaximumDecomposition:
                return Math.max(this._rgba[0], this._rgba[1], this._rgba[2]);
            case Color.GrayscaleAlgorithm.LinearLuminance:
                return this._rgba[0] * 0.2126 + this._rgba[1] * 0.7152 + this._rgba[2] * 0.0722;
        }
    }
    /**
     * Enables generic color access within a specified color space.
     * @param space - Expected color space of the requested color values.
     * @param alpha - Whether or not alpha channel should be provided as well.
     */
    tuple(space, alpha = true) {
        // eslint-disable-next-line default-case
        switch (space) {
            case Color.Space.RGB:
                return alpha ? this.rgba : this.rgb;
            case Color.Space.LAB:
                return alpha ? this.laba : this.lab;
            case Color.Space.CMYK:
                return alpha ? this.cmyka : this.cmyk;
            case Color.Space.HSL:
                return alpha ? this.hsla : this.hsl;
        }
    }
    /**
     * Read access to the RGB components as floating point 3-tuple, each value in range [0.0, 1.0].
     */
    get rgb() {
        return [this._rgba[0], this._rgba[1], this._rgba[2]];
    }
    /**
     * Read access to the RGB components as array of three bytes (8bit unsigned int), each in range [0, 255].
     */
    get rgbUI8() {
        const ui8Array = new Uint8Array(3);
        ui8Array[0] = Math.round(this._rgba[0] * 255.0);
        ui8Array[1] = Math.round(this._rgba[1] * 255.0);
        ui8Array[2] = Math.round(this._rgba[2] * 255.0);
        return ui8Array;
    }
    /**
     * Read access to the RGB components as array of three 32bit floats, each in range [0.0, 1.0].
     */
    get rgbF32() {
        const f32Array = new Float32Array(3);
        f32Array[0] = this._rgba[0];
        f32Array[1] = this._rgba[1];
        f32Array[2] = this._rgba[2];
        return f32Array;
    }
    /**
     * Read access to the RGBA components as floating point 4-tuple, each value in range [0.0, 1.0].
     */
    get rgba() {
        return this._rgba;
    }
    /**
     * Read access to the RGBA components as array of four bytes (8bit unsigned int), each in range [0, 255].
     */
    get rgbaUI8() {
        const ui8Array = new Uint8Array(4);
        ui8Array[0] = Math.round(this._rgba[0] * 255.0);
        ui8Array[1] = Math.round(this._rgba[1] * 255.0);
        ui8Array[2] = Math.round(this._rgba[2] * 255.0);
        ui8Array[3] = Math.round(this._rgba[3] * 255.0);
        return ui8Array;
    }
    /**
     * Read access to the RGBA components as array of four 32bit floats, each in range [0.0, 1.0].
     */
    get rgbaF32() {
        return new Float32Array(this._rgba);
    }
    /**
     * Read access to the Red component as float value in range [0.0, 1.0].
     */
    get r() {
        return this._rgba[0];
    }
    /**
     * Read access to the Green component as float value in range [0.0, 1.0].
     */
    get g() {
        return this._rgba[1];
    }
    /**
     * Read access to the Blue component as float value in range [0.0, 1.0].
     */
    get b() {
        return this._rgba[2];
    }
    /**
     * Read access to the Alpha component as float value in range [0.0, 1.0].
     */
    get a() {
        return this._rgba[3];
    }
    /**
     * Read access to the RGB components as hexadecimal string.
     */
    get hexRGB() {
        return Color.rgb2hex(this.rgb);
    }
    /**
     * Read access to the RGBA components as hexadecimal string.
     */
    get hexRGBA() {
        return Color.rgba2hex(this._rgba);
    }
    /**
     * Read access to the HSL components as floating point 3-tuple, each value in range [0.0, 1.0].
     */
    get hsl() {
        return Color.rgb2hsl(this.rgb);
    }
    /**
     * Read access to the HSLA components as floating point 4-tuple, each value in range [0.0, 1.0].
     */
    get hsla() {
        const hsl = Color.rgb2hsl(this.rgb);
        return [hsl[0], hsl[1], hsl[2], this._rgba[3]];
    }
    /**
     * Read access to the LAB components as floating point 3-tuple, each value in range [0.0, 1.0].
     */
    get lab() {
        return Color.rgb2lab(this.rgb);
    }
    /**
     * Read access to the LABA components as floating point 4-tuple, each value in range [0.0, 1.0].
     */
    get laba() {
        const lab = Color.rgb2lab(this.rgb);
        return [lab[0], lab[1], lab[2], this._rgba[3]];
    }
    /**
     * Read access to the CMYK components as floating point 4-tuple, each value in range [0.0, 1.0].
     */
    get cmyk() {
        return Color.rgb2cmyk(this.rgb);
    }
    /**
     * Read access to the CMYKA components as floating point 5-tuple, each value in range [0.0, 1.0].
     */
    get cmyka() {
        const cmyk = Color.rgb2cmyk(this.rgb);
        return [cmyk[0], cmyk[1], cmyk[2], cmyk[3], this._rgba[3]];
    }
    /**
     * Whether or not color value has changed.
     */
    get altered() {
        return this._altered;
    }
    /**
     * Intended for resetting alteration status.
     */
    set altered(status) {
        this._altered = status;
    }
}
exports.Color = Color;
/* istanbul ignore next */
(function (Color) {
    let GrayscaleAlgorithm;
    (function (GrayscaleAlgorithm) {
        GrayscaleAlgorithm["Average"] = "average";
        GrayscaleAlgorithm["LinearLuminance"] = "linear-luminance";
        GrayscaleAlgorithm["LeastSaturatedVariant"] = "least-saturated-variant";
        GrayscaleAlgorithm["MinimumDecomposition"] = "minimum-decomposition";
        GrayscaleAlgorithm["MaximumDecomposition"] = "maximum-decomposition";
    })(GrayscaleAlgorithm = Color.GrayscaleAlgorithm || (Color.GrayscaleAlgorithm = {}));
    /**
     * Color spaces covered by this class.
     */
    let Space;
    (function (Space) {
        Space["RGB"] = "rgb";
        Space["HSL"] = "hsl";
        Space["LAB"] = "lab";
        Space["CMYK"] = "cmyk";
    })(Space = Color.Space || (Color.Space = {}));
})(Color || (exports.Color = Color = {}));
//# sourceMappingURL=color.js.map