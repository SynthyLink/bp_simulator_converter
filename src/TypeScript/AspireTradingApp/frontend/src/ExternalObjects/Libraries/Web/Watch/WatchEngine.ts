import type { IActionAddRemoveT } from "../../../../Library/Interfaces/IActionAddRemoveT";
import type { IPlayEngine } from "../../../../Library/Interfaces/IPlayEngine";

export class WatchEngine implements IPlayEngine {
    getEngineAction(): IActionAddRemoveT<number> {
        throw new Error("Method not implemented.");
    }
    isEngineEnabled(): boolean {
        throw new Error("Method not implemented.");
    }

    setEngineEnabled(enabled: boolean): void {
        this.b = enabled
        throw new Error("Method not implemented.");
    }
    getPlayEngineTime(): number {
        throw new Error("Method not implemented.");
    }

    any: any

    b: boolean = false

}