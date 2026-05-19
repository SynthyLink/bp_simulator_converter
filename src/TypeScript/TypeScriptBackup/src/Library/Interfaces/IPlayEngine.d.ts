import type { IActionAddRemoveT } from "./IActionAddRemoveT";
export interface IPlayEngine {
    isEngineEnabled(): boolean;
    setEngineEnabled(enabled: boolean): boolean;
    getEngineAction(): IActionAddRemoveT<number>;
}
//# sourceMappingURL=IPlayEngine.d.ts.map