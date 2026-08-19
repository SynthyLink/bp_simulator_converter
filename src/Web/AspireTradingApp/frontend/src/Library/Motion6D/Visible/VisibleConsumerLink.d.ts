import { CategoryArrow } from "../../CategoryArrow";
import type { ICategoryObject } from "../../Interfaces/ICategoryObject";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { IVisible } from "./Interfaces/IVisible";
import type { IVisibleConsumer } from "./Interfaces/IVisibleConsumer";
export declare class VisibleConsumerLink extends CategoryArrow {
    constructor(desktop: IDesktop, name: string);
    getSource(): ICategoryObject;
    getTagret(): ICategoryObject;
    setSource(source: ICategoryObject): void;
    setTarget(target: ICategoryObject): void;
    consumer: IVisibleConsumer;
    visible: IVisible;
}
//# sourceMappingURL=VisibleConsumerLink.d.ts.map