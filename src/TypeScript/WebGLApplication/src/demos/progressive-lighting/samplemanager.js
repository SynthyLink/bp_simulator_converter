"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleManager = exports.LightSample = exports.SpecularEnvironmentSample = exports.DiffuseEnvironmentSample = exports.Sample = void 0;
const webgl_operate_1 = require("webgl-operate");
const gl_matrix_1 = require("gl-matrix");
const scene_1 = require("./scene");
const shadowkernel_1 = require("./shadowkernel");
// tslint:disable:max-classes-per-file
class Sample {
    factor;
    constructor(factor) {
        this.factor = factor;
    }
}
exports.Sample = Sample;
class DiffuseEnvironmentSample extends Sample {
}
exports.DiffuseEnvironmentSample = DiffuseEnvironmentSample;
class SpecularEnvironmentSample extends Sample {
}
exports.SpecularEnvironmentSample = SpecularEnvironmentSample;
class LightSample extends Sample {
    lightIndex;
    eye;
    constructor(factor, lightIndex, eye) {
        super(factor);
        this.lightIndex = lightIndex;
        this.eye = eye;
    }
}
exports.LightSample = LightSample;
class SampleManager {
    _currentFrame;
    _scene;
    _multiframeNumber;
    _lightSampleCount;
    _environmentSampleCount;
    _lightQueue;
    _environmentQueue;
    _perFrameSamples;
    constructor(scene, multiframeNumber, lightSampleCount, environmentSampleCount) {
        this._currentFrame = 0;
        this._scene = scene;
        this._multiframeNumber = multiframeNumber;
        this._lightSampleCount = lightSampleCount;
        this._environmentSampleCount = environmentSampleCount;
        webgl_operate_1.auxiliaries.assert(lightSampleCount * this._scene.diskLights.length <= multiframeNumber, 'Total number of light samples can not be higher than multiframe count.');
        this._lightQueue = new Array();
        this._environmentQueue = new Array();
        this.generateSampleQueue();
    }
    allEmpty(arrays) {
        let result = true;
        for (const array of arrays) {
            if (array.length > 0) {
                result = false;
                break;
            }
        }
        return result;
    }
    mergeArrays(arrays) {
        const result = new Array();
        while (!this.allEmpty(arrays)) {
            for (const array of arrays) {
                if (array.length > 0) {
                    result.push(array.shift());
                }
            }
        }
        return result;
    }
    distributeSamples(samples, destination, startIndex, endIndex) {
        const numIndices = endIndex - startIndex;
        const framesPerSample = numIndices / samples.length;
        let currentIndex = startIndex;
        for (const sample of samples) {
            const sampleIndex = Math.floor(currentIndex);
            webgl_operate_1.auxiliaries.assert(sampleIndex < destination.length, `Index ${sampleIndex} is out of bounds while distributing light samples.`);
            destination[sampleIndex].push(sample);
            currentIndex += framesPerSample;
        }
    }
    generateSampleQueue() {
        const diffuseSampleCount = Math.round(this._environmentSampleCount / 2);
        const diffuseFactor = this._multiframeNumber / diffuseSampleCount;
        const specularSampleCount = this._environmentSampleCount - diffuseSampleCount;
        const specularFactor = this._multiframeNumber / specularSampleCount;
        const lightFactor = this._multiframeNumber / this._lightSampleCount;
        const diffuseSamples = [];
        const specularSamples = [];
        for (let i = 0; i < diffuseSampleCount; ++i) {
            diffuseSamples.push(new DiffuseEnvironmentSample(diffuseFactor));
        }
        for (let i = 0; i < specularSampleCount; ++i) {
            specularSamples.push(new SpecularEnvironmentSample(specularFactor));
        }
        this._environmentQueue = this.mergeArrays([diffuseSamples, specularSamples]);
        const lightArrays = [];
        let lightIndex = 0;
        for (const light of this._scene.diskLights) {
            const shadowKernel = new shadowkernel_1.ShadowKernel(this._lightSampleCount, light);
            const lightSamples = [];
            for (let i = 0; i < this._lightSampleCount; ++i) {
                const eye = shadowKernel.get(i);
                lightSamples.push(new LightSample(lightFactor, lightIndex, gl_matrix_1.vec3.fromValues(eye[0], eye[1], eye[2])));
            }
            lightArrays.push(lightSamples);
            lightIndex++;
        }
        this._lightQueue = this.mergeArrays(lightArrays);
        /**
         * Distribute light samples over the frames of the multi-frame.
         */
        this._perFrameSamples = [];
        for (let i = 0; i < this._multiframeNumber; ++i) {
            this._perFrameSamples.push([]);
        }
        this.distributeSamples(this._lightQueue, this._perFrameSamples, Math.round(0.3 * this._multiframeNumber), this._multiframeNumber - 1);
        this.distributeSamples(this._environmentQueue, this._perFrameSamples, 0, this._multiframeNumber - 1);
    }
    getNextFrameSamples() {
        webgl_operate_1.auxiliaries.assert(this._currentFrame < this._multiframeNumber, 'Samples can only be generated during a multiframe.');
        const samples = this._perFrameSamples[this._currentFrame];
        this._currentFrame++;
        return samples;
    }
}
exports.SampleManager = SampleManager;
//# sourceMappingURL=samplemanager.js.map