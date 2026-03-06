"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require('chai'), sinon = require('sinon');
const expect = chai.expect;
const stub = sinon.stub;
const colorscale_1 = require("../source/colorscale");
const color_1 = require("../source/color");
/* spellchecker: enable */
describe('ColorScale', () => {
    let colors;
    let positions;
    let color;
    let emptyColorScale;
    let oneColorScale;
    let defaultColorScale;
    let consoleLogStub;
    before(() => {
        color = new color_1.Color([255, 0, 255]);
        colors = [255, 0, 255];
        let stepCount = 7;
        oneColorScale = colorscale_1.ColorScale.fromArray(colors, colorscale_1.ColorScale.ArrayType.RGB, stepCount);
        colors = [255, 0, 128, 121, 12, 42, 21, 0, 90];
        stepCount = 7;
        positions = [2, 0, 1];
        defaultColorScale = colorscale_1.ColorScale.fromArray(colors, colorscale_1.ColorScale.ArrayType.RGB, stepCount, positions);
        emptyColorScale = colorscale_1.ColorScale.fromArray([], colorscale_1.ColorScale.ArrayType.RGB, 0);
        consoleLogStub = stub(console, 'log');
    });
    after(() => {
        consoleLogStub.restore();
    });
    it('should be loadable from preset', () => {
        /* eslint-disable-next-line no-unused-expressions */
        colorscale_1.ColorScale.fromPreset('../source/data/colorbrewer', 'YlGnBu', 7).
            then((value) => expect(value).to.not.be.undefined);
    });
    it('should be creatable from an array', () => {
        /* eslint-disable-next-line no-unused-expressions */
        expect(defaultColorScale).to.not.be.undefined;
        expect(defaultColorScale instanceof colorscale_1.ColorScale).to.be.true;
    });
    it('should be creatable from an array with positions', () => {
        const colorScale = colorscale_1.ColorScale.fromArray(colors, colorscale_1.ColorScale.ArrayType.RGB, 2, positions);
        /* eslint-disable-next-line no-unused-expressions */
        expect(colorScale).to.not.be.undefined;
    });
    it('should be creatable from an array with positions', () => {
        const colorScale = colorscale_1.ColorScale.fromArray(colors, colorscale_1.ColorScale.ArrayType.RGB, 1, positions);
        /* eslint-disable-next-line no-unused-expressions */
        expect(colorScale).to.not.be.undefined;
    });
    it('should be creatable from an array with alpha values', () => {
        const colorScale = colorscale_1.ColorScale.fromArray([0.5, 0.5, 0.5, 0.2], colorscale_1.ColorScale.ArrayType.RGBA, 1);
        /* eslint-disable-next-line no-unused-expressions */
        expect(colorScale).to.not.be.undefined;
    });
    it('should be creatable from float an array', () => {
        const colorScale = colorscale_1.ColorScale.fromArray([0.5, 0.5, 0.5], colorscale_1.ColorScale.ArrayType.RGBf, 1);
        /* eslint-disable-next-line no-unused-expressions */
        expect(colorScale).to.not.be.undefined;
    });
    it('should be creatable from float an array', () => {
        const colorScale = colorscale_1.ColorScale.fromArray([0.5, 0.5, 0.5], colorscale_1.ColorScale.ArrayType.RGBf, 3);
        /* eslint-disable-next-line no-unused-expressions */
        expect(colorScale).to.not.be.undefined;
    });
    it('should be creatable from an array with alpha values', () => {
        const colorScale = colorscale_1.ColorScale.fromArray([0.5, 0.5, 0.5, 0.2], colorscale_1.ColorScale.ArrayType.RGBAf, 1);
        /* eslint-disable-next-line no-unused-expressions */
        expect(colorScale).to.not.be.undefined;
    });
    it('should be creatable from an array with empty arrays', () => {
        const colorScale = colorscale_1.ColorScale.fromArray([], colorscale_1.ColorScale.ArrayType.RGB, 0);
        /* eslint-disable-next-line no-unused-expressions */
        expect(colorScale).to.not.be.undefined;
    });
    it('should be linear interpolate-able with only one color', () => {
        const interpolatedColor = oneColorScale.lerp(1, color_1.Color.Space.RGB);
        /* eslint-disable-next-line no-unused-expressions */
        expect(interpolatedColor).to.not.be.undefined;
        if (interpolatedColor) {
            expect(interpolatedColor.tuple(color_1.Color.Space.RGB, false))
                .to.eql(color.tuple(color_1.Color.Space.RGB, false));
        }
    });
    it('should be linear interpolate-able', () => {
        const interpolatedColor = defaultColorScale.lerp(-0.1, color_1.Color.Space.RGB);
        /* eslint-disable-next-line no-unused-expressions */
        expect(interpolatedColor).to.not.be.undefined;
        if (interpolatedColor) {
            expect(interpolatedColor.tuple(color_1.Color.Space.RGB, false))
                .to.not.eql(color.tuple(color_1.Color.Space.RGB, false));
        }
    });
    it('should be linear interpolate-able with nearest', () => {
        defaultColorScale.hint = colorscale_1.ColorScale.InterpolationHint.Nearest;
        const interpolatedColor = defaultColorScale.lerp(-0.1, color_1.Color.Space.RGB);
        /* eslint-disable-next-line no-unused-expressions */
        expect(interpolatedColor).to.not.be.undefined;
        if (interpolatedColor) {
            expect(interpolatedColor.tuple(color_1.Color.Space.RGB, false))
                .to.not.eql(color.tuple(color_1.Color.Space.RGB, false));
        }
    });
    it('should be undefined when calling lerp on ColorScale without colors', () => {
        const interpolatedColor = emptyColorScale.lerp(1, color_1.Color.Space.RGB);
        /* eslint-disable-next-line no-unused-expressions */
        expect(interpolatedColor).to.be.undefined;
    });
    it('should return the colors', () => {
        let color = defaultColorScale.color(0);
        /* eslint-disable-next-line no-unused-expressions */
        expect(color).not.to.be.undefined;
        color = defaultColorScale.color(1);
        /* eslint-disable-next-line no-unused-expressions */
        expect(color).not.to.be.undefined;
        color = defaultColorScale.color(2);
        /* eslint-disable-next-line no-unused-expressions */
        expect(color).not.to.be.undefined;
    });
    it('should return undefined when calling colors on empty ColorScale', () => {
        const color = emptyColorScale.color(0);
        /* eslint-disable-next-line no-unused-expressions */
        expect(color).to.be.undefined;
    });
    it('should return undefined when calling colors on out of range', () => {
        let color = defaultColorScale.color(defaultColorScale.length + 1);
        /* eslint-disable-next-line no-unused-expressions */
        expect(color).to.be.undefined;
        color = defaultColorScale.color(-1);
        /* eslint-disable-next-line no-unused-expressions */
        expect(color).to.be.undefined;
    });
    it('colors should be set and readable', () => {
        const newColors = [new color_1.Color(), new color_1.Color(), new color_1.Color()];
        const colorScale = new colorscale_1.ColorScale();
        colorScale.colors = newColors;
        expect(colorScale.colors).to.be.eql(newColors);
    });
    it('colors should be set and readable', () => {
        const colorScale = new colorscale_1.ColorScale();
        colorScale.hint = colorscale_1.ColorScale.InterpolationHint.Nearest;
        expect(colorScale.hint).to.eq(colorscale_1.ColorScale.InterpolationHint.Nearest);
        colorScale.hint = colorscale_1.ColorScale.InterpolationHint.Linear;
        expect(colorScale.hint).to.eq(colorscale_1.ColorScale.InterpolationHint.Linear);
    });
    it('should be invertible', () => {
        expect(defaultColorScale.inverted).to.be.false;
        defaultColorScale.invert();
        expect(defaultColorScale.inverted).to.be.true;
    });
    it('should be able to turn to UInt8 bits', () => {
        let uint8Array = defaultColorScale.bitsUI8(color_1.Color.Space.RGB, false);
        expect(uint8Array.length).to.eq(defaultColorScale.length * 3);
        uint8Array = defaultColorScale.bitsUI8(color_1.Color.Space.RGB, true);
        expect(uint8Array.length).to.eq(defaultColorScale.length * 4);
        uint8Array = emptyColorScale.bitsUI8(color_1.Color.Space.RGB, false);
        expect(uint8Array.length).to.eq(0);
    });
    it('should be able to turn to float32 bits', () => {
        let uint8Array = defaultColorScale.bitsF32(color_1.Color.Space.RGB, false);
        expect(uint8Array.length).to.eq(defaultColorScale.length * 3);
        uint8Array = defaultColorScale.bitsF32(color_1.Color.Space.RGB, true);
        expect(uint8Array.length).to.eq(defaultColorScale.length * 4);
        uint8Array = emptyColorScale.bitsF32(color_1.Color.Space.RGB, false);
        expect(uint8Array.length).to.eq(0);
    });
});
//# sourceMappingURL=colorscale.test.js.map