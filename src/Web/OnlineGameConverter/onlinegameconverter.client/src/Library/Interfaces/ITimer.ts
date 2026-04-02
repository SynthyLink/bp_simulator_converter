import type { TimeSpan } from "../Utilities/DateTime/TimeSpan";
import type { IActionAddRemove } from "./IActionAddRemove";

export interface ITimer  {

    getTimerTimeSpan(): TimeSpan

    isTimerEnabled(): boolean

    setTimerEnabled(enabled: boolean): Promise<void>

    getTimerEvent(): IActionAddRemove


}


