import type { IActionAddRemoveT } from "../../Interfaces/IActionAddRemoveT";
import type { IPlayEngine } from "../../Interfaces/IPlayEngine";
export declare abstract class AbstractEngine implements IPlayEngine {
    constructor(interval: number);
    isEngineEnabled(): boolean;
    abstract setEngineEnabled(enabled: boolean): boolean;
    getEngineAction(): IActionAddRemoveT<number>;
    setTime(time: number): void;
    currentTime(): number;
    protected enabled: boolean;
    protected actionT: IActionAddRemoveT<number>;
    protected start: number;
    protected interval: number;
}
//# sourceMappingURL=AbstracrtEngine.d.ts.map