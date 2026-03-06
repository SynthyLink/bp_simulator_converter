import { Camera } from 'webgl-operate';
import { DiskLight, SphereLight } from './arealight';
export declare class Scene {
    protected _uri: string;
    protected _camera: Camera;
    protected _sphereLights: Array<SphereLight>;
    protected _diskLights: Array<DiskLight>;
    constructor(uri: string, camera: Camera, nearPlane: number, farPlane: number);
    addSphereLight(light: SphereLight): void;
    addDiskLight(light: DiskLight): void;
    get uri(): string;
    get camera(): Camera;
    get sphereLights(): Array<SphereLight>;
    get diskLights(): Array<DiskLight>;
}
//# sourceMappingURL=scene.d.ts.map