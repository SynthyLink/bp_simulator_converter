import { CategoryArrow } from "../../CategoryArrow";
import type { ICategoryObject } from "../../Interfaces/ICategoryObject";
import type { IIterator } from "../Interfaces/IIterator";
import type { IIteratorConsumer } from "../Interfaces/IIteratorConsumer";
export declare class IteratorConsumerLink extends CategoryArrow {
    iterator: IIterator;
    consumer: IIteratorConsumer;
    setSource(source: ICategoryObject): void;
    /**
     * @param target
     */
    setTarget(target: ICategoryObject): void;
}
//# sourceMappingURL=IteratorConsumerLink.d.ts.map