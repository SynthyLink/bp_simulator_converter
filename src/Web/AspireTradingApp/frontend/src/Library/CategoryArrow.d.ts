import { EmptyObject } from "./EmptyObject";
import type { ICategoryArrow } from "./Interfaces/ICategoryArrow";
import type { ICategoryObject } from "./Interfaces/ICategoryObject";
import type { IDesktop } from "./Interfaces/IDesktop";
import { Performer } from "./Performer";
export declare class CategoryArrow extends EmptyObject implements ICategoryArrow {
    constructor(desktop: IDesktop, name: string);
    protected desktop: IDesktop;
    protected source: ICategoryObject;
    protected target: ICategoryObject;
    protected performer: Performer;
    getDesktop(): IDesktop;
    getArrowName(): string;
    getSource(): ICategoryObject;
    getTarget(): ICategoryObject;
    setSource(source: ICategoryObject): void;
    setTarget(target: ICategoryObject): void;
    protected getObjectT<T, S>(s: S, type: string): T[];
}
//# sourceMappingURL=CategoryArrow.d.ts.map