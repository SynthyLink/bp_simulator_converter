import { CategoryArrow } from "../../CategoryArrow";
import type { IDesktop } from "../../Interfaces/IDesktop";
import { RelativeMeasurements } from "../Objects/RelativeMeasurements";
import type { ICategoryObject } from "../../Interfaces/ICategoryObject";
export declare class RelativeMeasurementsLink extends CategoryArrow {
    constructor(desktop: IDesktop, name: string);
    getRelativeMeasurerements(): RelativeMeasurements[];
    getSourceObject(obj: ICategoryObject): ICategoryObject;
    setSource(source: ICategoryObject): void;
    setTarget(target: ICategoryObject): void;
}
//# sourceMappingURL=RelativeMeasurementsLink.d.ts.map