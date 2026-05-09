import type { IActionAddRemoveT } from "../../Interfaces/IActionAddRemoveT";
import type { IPlayEngine } from "../../Interfaces/IPlayEngine";
import type { ISelfStart } from "../../Interfaces/ISelfStart";
import { TscWatchClient } from "../Watch/client";
import { ListenerEventT } from "./ListenerEventT";

export class TimerListener extends ListenerEventT<number> implements ISelfStart, IPlayEngine {
    constructor(client: TscWatchClient) {
        super(client)
        this.client = client;
    }
    isEngineEnabled(): boolean {
        return this.isRunning();
    }
    setEngineEnabled(enabled: boolean): boolean {
        throw new Error("Method not implemented.");
    }
    getEngineAction(): IActionAddRemoveT<number> {
        return this
    }

    startItself(start: boolean): boolean {
        this.client.kill()
        return true;
    }
    isRunning(): boolean {
        return true;
    }

    

    client !: TscWatchClient
}