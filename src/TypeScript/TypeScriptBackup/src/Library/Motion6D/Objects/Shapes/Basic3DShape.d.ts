import { CategoryObject } from "../../../CategoryObject";
import type { IDesktop } from "../../../Interfaces/IDesktop";
import type { IResourceCollection } from "../../../Resources/Infrefaces/IResouceCollection";
import type { IResourceItem } from "../../../Resources/Infrefaces/IResourceItem";
import type { IStartPrimitive } from "../../../UI/IStartPrimitive";
import type { IPosition } from "../../Interfaces/IPosition";
import type { IVisible } from "../../Visible/Interfaces/IVisible";
export declare class Basic3DShape extends CategoryObject implements IVisible, IStartPrimitive, IResourceCollection {
    constructor(desktop: IDesktop, name: string);
    getResources(): IResourceItem[];
    startPrimitive(): void;
    getSaveGrahicalData(): Map<string, string>;
    getVisibleSize(): number[][];
    setVisibleSize(size: number[][]): void;
    protected addResource(name: string, url: string, type: 'text' | 'json' | 'image', ext: string): void;
    resources: IResourceItem[];
    grahicalData: Map<string, string>;
    position: IPosition;
    size: number[][];
    getObjectPosition(): IPosition;
    setObjectPosition(position: IPosition): void;
}
//# sourceMappingURL=Basic3DShape.d.ts.map