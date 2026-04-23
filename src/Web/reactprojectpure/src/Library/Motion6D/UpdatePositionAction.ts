import { IAction } from "../Interfaces/IAction";
import { IPosition } from "./Interfaces/IPosition";

export class UpdatePositionAction implements IAction
{
    position: IPosition;

    constructor(position: IPosition) {
        this.position = position;
    }
    action(): void {
        this.position.updateReferenceFrame()
    }

}