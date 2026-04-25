import { IActionAddRemoveT } from "./IActionAddRemoveT"

export interface IPlayEngine {

    isEngineEnabled(): boolean

    setEngineEnabled(enabled: boolean): boolean

    getEngineAction(): IActionAddRemoveT<number>
}
