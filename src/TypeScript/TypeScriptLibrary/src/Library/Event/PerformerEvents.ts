import type { IActionT } from "../Interfaces/IActionT";
import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IEventStart } from "../Interfaces/IEventStart";
import type { ITimerConsumer } from "../Interfaces/ITimerConsumer";
import type { ITimerFactory } from "../Interfaces/ITimerFactory";
import { Performer } from "../Performer";

export class PerformerEvents implements IActionT<IEventStart> {
    action(t: IEventStart): void
    {
        t.setEnabled(this.isEnabled)
    }

    isEnabled: boolean = false;


    performer: Performer = new Performer()

    timerAction: TimerAction = new TimerAction()

    public setComponentCollectionEnabled(collection: IComponentCollection, isEnabled: boolean): void {
        this.isEnabled = this.isEnabled
        this.performer.forEach<IEventStart>(collection, this, "IEventStart")
    }

    public setComponentCollectionTimer(collection: IComponentCollection, factory: ITimerFactory) {
        if (factory === null) return
        this.timerAction.set(factory)
        this.performer.forEach<ITimerConsumer>(collection, this.timerAction, "ITimerConsumer")
    }

}

class TimerAction implements IActionT<ITimerConsumer> {
    action(t: ITimerConsumer): void {
        console.log("ST")
        t.setTimer(this.factory)
    }

    set(factory: ITimerFactory) {
        this.factory = factory;
    }

    factory !: ITimerFactory;

}