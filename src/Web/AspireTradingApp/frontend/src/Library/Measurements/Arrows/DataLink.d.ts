import { CategoryArrow } from "../../CategoryArrow";
import type { ICategoryObject } from "../../Interfaces/ICategoryObject";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { IDataConsumer } from "../Interfaces/IDataConsumer";
import type { IMeasurements } from "../Interfaces/IMeasurements";
export declare class DataLink extends CategoryArrow {
    constructor(desktop: IDesktop, name: string);
    getSource(): ICategoryObject;
    getTagret(): ICategoryObject;
    setSource(source: ICategoryObject): void;
    setTarget(target: ICategoryObject): void;
    consumer: IDataConsumer;
    measurements: IMeasurements;
}
//# sourceMappingURL=DataLink.d.ts.map