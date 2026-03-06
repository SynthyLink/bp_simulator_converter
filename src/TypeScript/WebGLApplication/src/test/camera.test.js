"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require('chai'), spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
const camera_1 = require("../source/camera");
/* spellchecker: enable */
describe('field of view', () => {
    it('should be initializable as fovy', () => {
        const camera = new camera_1.Camera();
        camera.fovy = 90.0;
        expect(camera.fovy).to.be.closeTo(90.0, 1e-8);
    });
    it('should be initializable as fovx', () => {
        const camera = new camera_1.Camera();
        camera.aspect = 16 / 9;
        camera.fovx = 90.0;
        expect(camera.fovy).to.be.closeTo(58.7155, 0.0001);
    });
    it('should be initializable via physical camera settings', () => {
        const camera = new camera_1.Camera();
        camera.aspect = 16 / 9;
        camera.fovFromLens(50, 50);
        expect(camera.fovy).to.be.closeTo(31.4172, 0.0001);
    });
});
//# sourceMappingURL=camera.test.js.map