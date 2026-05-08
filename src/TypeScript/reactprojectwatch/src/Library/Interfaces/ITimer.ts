import type { TimeSpan } from "../Utilities/DateTime/TimeSpan";
import type { IActionAddRemove } from "./IActionAddRemove";
import { IActionT } from "./IActionT";

export interface ITimer  {

    getTimerTimeSpan(): TimeSpan

    isTimerEnabled(): boolean

    setTimerEnabled(enabled: boolean): void

    getTimerEvent(): IActionAddRemove

    setTimerEventT(action: IActionT<number>): void

}


