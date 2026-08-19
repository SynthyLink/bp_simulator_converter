import type { ICategoryObject } from "../../Interfaces/ICategoryObject";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { IPostSetArrow } from "../../Interfaces/IPostSetArrow";
import type { IChildrenT } from "../../NamedTree/Interfaces/IChildrenT";
import { BasicPosition } from "./BasicPosition";
export declare class SerializablePosition extends BasicPosition implements IChildrenT<ICategoryObject>, IPostSetArrow {
    constructor(desktop: IDesktop, name: string);
    postSetArrow(): void;
    getChildernT(): ICategoryObject[];
    addChildT(child: ICategoryObject): void;
    removeChildT(child: ICategoryObject): void;
    setParameters(parameters: any): void;
    objects: ICategoryObject[];
    protected map: Map<string, string>;
}
//# sourceMappingURL=SerializablePosition.d.ts.map