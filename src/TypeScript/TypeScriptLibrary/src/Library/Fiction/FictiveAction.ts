import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { IAction } from "../Interfaces/IAction";

export class FictiveAction implements IAction {
    action(): void {
        throw new OwnNotImplemented();
    }

}