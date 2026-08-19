import type { IActionT } from "../Interfaces/IActionT";
import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IEventStart } from "../Interfaces/IEventStart";
import type { ITimerConsumer } from "../Interfaces/ITimerConsumer";
import type { ITimerFactory } from "../Interfaces/ITimerFactory";
import { Performer } from "../Performer";
export declare class PerformerEvents implements IActionT<IEventStart> {
    actionT(t: IEventStart): void;
    isEnabled: boolean;
    static timeScale: number;
    performer: Performer;
    timerAction: TimerAction;
    static getTimeScale(): number;
    static setTimeScale(timeScale: number): void;
    setComponentCollectionEnabled(collection: IComponentCollection, enabled: boolean): void;
    setComponentCollectionTimer(collection: IComponentCollection, factory: ITimerFactory): void;
    isEmptyActionT(): boolean;
}
declare class TimerAction implements IActionT<ITimerConsumer> {
    actionT(t: ITimerConsumer): void;
    isEmptyActionT(): boolean;
    set(factory: ITimerFactory): void;
    factory: ITimerFactory;
}
export {};
//# sourceMappingURL=PerformerEvents.d.ts.map