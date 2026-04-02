import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import type { IAngularVelocityMotion6D } from "../Motion6D/Interfaces/IAngularVelocityMotion6D";

export class FictiveAngularVelocityMotion6D implements IAngularVelocityMotion6D  {
    getOmega(): number[] {
        throw new OwnNotImplemented();
    }

}