import type { IActionAddRemoveT } from "../../Interfaces/IActionAddRemoveT";
import type { IPlayEngine } from "../../Interfaces/IPlayEngine";
export declare class EngineWatch implements IPlayEngine {
    constructor(interval: number);
    isEngineEnabled(): boolean;
    setEngineEnabled(enabled: boolean): boolean;
    getEngineAction(): IActionAddRemoveT<number>;
    setTime(time: number): void;
    currentTime(): number;
    enabled: boolean;
    action: IActionAddRemoveT<number>;
    timerID: any;
    start: number;
    interval: number;
}
//# sourceMappingURL=EnfineWatch.d.ts.map