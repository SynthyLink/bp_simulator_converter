import { CategoryArrow } from "../../CategoryArrow";
import type { ICategoryObject } from "../../Interfaces/ICategoryObject";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { IObjectTransformer } from "../Interfaces/IObjectTransformer";
import type { IObjectTransformerConsumer } from "../Interfaces/IObjectTransformerConsumer";
export declare class ObjectTransformerLink extends CategoryArrow {
    constructor(desktop: IDesktop, name: string);
    getSource(): ICategoryObject;
    getTagret(): ICategoryObject;
    setSource(source: ICategoryObject): void;
    setTarget(target: ICategoryObject): void;
    getName(): string;
    consumer: IObjectTransformerConsumer;
    transformer: IObjectTransformer;
}
//# sourceMappingURL=ObjectTransformerLink.d.ts.map