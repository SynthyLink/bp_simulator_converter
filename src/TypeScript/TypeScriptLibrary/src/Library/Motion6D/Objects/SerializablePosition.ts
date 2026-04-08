import type { ICategoryObject } from "../../Interfaces/ICategoryObject";
import type { IChildren } from "../../Interfaces/IChildren";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { IPositionObject } from "../Interfaces/IPositionObject";
import { BasicPosition } from "./BasicPosition";

export class SerializablePosition extends BasicPosition implements IChildren<ICategoryObject>  {

    constructor(desktop: IDesktop, name: string) {
        super(desktop, name);
        this.typeName = "SerializablePosition";
        this.types.push("SerializablePosition");
    }

    getChildren(): ICategoryObject[] {
        return this.children;
    }

    setParameters(parameters: any): void {
        super.setParameters(parameters)
        var po = this.performer.convertObject<IPositionObject, any>(parameters, "IPositionObject")
        if (po.length == 0) return;
        po[0].setObjectPosition(this)
    }

    children: ICategoryObject[] = [];

}