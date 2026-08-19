import type { IDesktop } from "../../Interfaces/IDesktop";
import type { ICamera } from "../Interfaces/ICamera";
import { BasicPosition } from "../Objects/BasicPosition";
import type { IVisible } from "./Interfaces/IVisible";
import type { IVisibleConsumer } from "./Interfaces/IVisibleConsumer";
export declare class BasicCamera extends BasicPosition implements IVisibleConsumer, ICamera {
    constructor(desktop: IDesktop, name: string);
    getCameraType(): 'orthographic' | 'perspective';
    getFieldOfView(): number;
    getNearDistance(): number;
    getFarDistance(): number;
    protected fieldOfView: number;
    protected nearDistance: number;
    protected farDistance: number;
    addVisibleObject(object: IVisible): void;
    removeVisibleObject(object: IVisible): void;
    postVisibleObject(object: IVisible): void;
    protected visible: IVisible[];
}
//# sourceMappingURL=BasicCamera.d.ts.map