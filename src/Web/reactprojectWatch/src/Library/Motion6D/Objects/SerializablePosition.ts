import { IDesktop } from "../../Interfaces/IDesktop";
import { IPositionObject } from "../Interfaces/IPositionObject";
import { BasicPosition } from "./BasicPosition";

export class SerializablePosition extends BasicPosition  {

    constructor(desktop: IDesktop, name: string) {
        super(desktop, name);
        this.typeName = "SerializablePosition";
        this.types.push("SerializablePosition");
    }

    setParameters(parameters: any): void {
        super.setParameters(parameters)
        var po = this.performer.convertObject<IPositionObject, any>(parameters, "IPositionObject")
        if (po.length == 0) return;
        po[0].setObjectPosition(this)
    }

}