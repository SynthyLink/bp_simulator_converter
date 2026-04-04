import { IActionAddRemoveT } from "../../../../Library/Interfaces/IActionAddRemoveT";
import { IPlayEngine } from "../../../../Library/Interfaces/IPlayEngine";

export class WatchEngine implements IPlayEngine {
    getEngineAction(): IActionAddRemoveT<number> {
        throw new Error("Method not implemented.");
    }
    isEngineEnabled(): boolean {
        throw new Error("Method not implemented.");
    }
    setEngineEnabled(enabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    getPlayEngineTime(): number {
        throw new Error("Method not implemented.");
    }

}