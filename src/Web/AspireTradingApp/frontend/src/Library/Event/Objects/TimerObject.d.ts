import { CategoryObject } from "../../CategoryObject";
import { TimeSpan } from "../../Utilities/DateTime/TimeSpan";
import type { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { IEvent } from "../../Interfaces/IEvent";
import type { ITimer } from "../../Interfaces/ITimer";
import type { ITimerConsumer } from "../../Interfaces/ITimerConsumer";
import type { ITimerFactory } from "../../Interfaces/ITimerFactory";
import type { IPostSetArrow } from "../../Interfaces/IPostSetArrow";
import type { IActionAddRemoveT } from "../../Interfaces/IActionAddRemoveT";
export declare class TimerObject extends CategoryObject implements IEvent, ITimerConsumer, IPostSetArrow {
    constructor(desktop: IDesktop, name: string);
    postSetArrow(): void;
    getTimeSpan(): TimeSpan;
    setTimer(timerFactory: ITimerFactory): void;
    eventAction(): IActionAddRemove;
    eventActionT(): IActionAddRemoveT<number>;
    isEventEnabled(): boolean;
    setEventEnabled(enabled: boolean): void;
    action: IActionAddRemove;
    actionT: IActionAddRemoveT<number>;
    timer: ITimer;
    protected span: TimeSpan;
    isEnabled: boolean;
}
//# sourceMappingURL=TimerObject.d.ts.map