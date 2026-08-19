import { CategoryArrow } from "../../CategoryArrow";
import type { ICategoryObject } from "../../Interfaces/ICategoryObject";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { IEvent } from "../../Interfaces/IEvent";
import type { IEventHandler } from "../../Interfaces/IEventHandler";
export declare class EventLink extends CategoryArrow {
    constructor(desktop: IDesktop, name: string);
    setSource(source: ICategoryObject): void;
    setTarget(target: ICategoryObject): void;
    event: IEvent;
    handler: IEventHandler;
}
//# sourceMappingURL=EventLink.d.ts.map