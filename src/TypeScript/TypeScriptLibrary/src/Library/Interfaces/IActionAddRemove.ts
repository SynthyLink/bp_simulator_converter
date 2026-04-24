import { IAction } from "./IAction";

export interface IActionAddRemove extends IAction {
    addAction(action: IAction | undefined): void
    isEmptyAction(): boolean
    removeAction(action: IAction | undefined): void
    clearActions(): void
}