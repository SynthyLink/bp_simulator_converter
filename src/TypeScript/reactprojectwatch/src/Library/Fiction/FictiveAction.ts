import { IAction } from "../Interfaces/IAction";

export class FictiveAction implements IAction {
    action(): void {
    }
    isEmptyAction(): boolean { return false }

}