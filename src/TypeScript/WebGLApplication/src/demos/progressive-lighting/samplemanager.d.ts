import { vec3 } from 'gl-matrix';
import { Scene } from './scene';
export declare class Sample {
    factor: number;
    constructor(factor: number);
}
export declare class DiffuseEnvironmentSample extends Sample {
}
export declare class SpecularEnvironmentSample extends Sample {
}
export declare class LightSample extends Sample {
    lightIndex: number;
    eye: vec3;
    constructor(factor: number, lightIndex: number, eye: vec3);
}
export declare class SampleManager {
    protected _currentFrame: number;
    protected _scene: Scene;
    protected _multiframeNumber: number;
    protected _lightSampleCount: number;
    protected _environmentSampleCount: number;
    protected _lightQueue: Array<Sample>;
    protected _environmentQueue: Array<Sample>;
    protected _perFrameSamples: Array<Array<Sample>>;
    constructor(scene: Scene, multiframeNumber: number, lightSampleCount: number, environmentSampleCount: number);
    protected allEmpty(arrays: Array<any>): boolean;
    protected mergeArrays(arrays: Array<any>): Array<Sample>;
    protected distributeSamples(samples: Array<Sample>, destination: Array<Array<Sample>>, startIndex: number, endIndex: number): void;
    protected generateSampleQueue(): void;
    getNextFrameSamples(): Array<Sample>;
}
//# sourceMappingURL=samplemanager.d.ts.map