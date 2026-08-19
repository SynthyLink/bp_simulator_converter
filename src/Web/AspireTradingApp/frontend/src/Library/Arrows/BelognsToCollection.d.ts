import { CategoryArrow } from "../CategoryArrow";
import type { IAddRemove } from "../Interfaces/IAddRemove";
import type { ICategoryObject } from "../Interfaces/ICategoryObject";
import type { IDesktop } from "../Interfaces/IDesktop";
export declare class BelongsToCollection extends CategoryArrow {
    constructor(desktop: IDesktop, name: string);
    setSource(source: ICategoryObject): void;
    setTarget(target: ICategoryObject): void;
    protected ar: IAddRemove;
}
//# sourceMappingURL=BelognsToCollection.d.ts.map