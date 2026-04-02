import { CategoryObject } from "../../CategoryObject";
import { ActionArray } from "../../Utilities/Generic/ActionArray";
import  { TimeSpan } from "../../Utilities/DateTime/TimeSpan";
import type { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { IEvent } from "../../Interfaces/IEvent";
import type { ITimer } from "../../Interfaces/ITimer";
import type { ITimerConsumer } from "../../Interfaces/ITimerConsumer";
import type { ITimerFactory } from "../../Interfaces/ITimerFactory";

export class TimerObject extends CategoryObject implements IEvent, ITimerConsumer {

    constructor(desktop: IDesktop, name: string) {
        super(desktop, name)
        this.typeName = "TimerObject"
        this.types.push("IEvent")
        this.types.push("ITimerConsumer")
    }
    getTimeSpan(): TimeSpan {
        return this.span;
    }

    setTimer(timerFactory: ITimerFactory): void {
        this.timer = timerFactory.getTimerFromFactory(this.span)
    }


    eventAction(): IActionAddRemove {
        return this.action;
    }

    isEventEnabled(): boolean {
        return this.isEnabled;
    }
    async setEnabled(enabled: boolean): Promise<void> {
        if (this.isEnabled == enabled)
            return;
        this.isEnabled = enabled;
        this.timer.setTimerEnabled(enabled)
    }


    action: IActionAddRemove = new ActionArray();

    timer !: ITimer;

    protected span: TimeSpan = new TimeSpan(1.0);

    isEnabled: boolean = false;


}