import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import type { IOrientation } from "../Motion6D/Interfaces/IOrientation";

export class FictiveOrientation implements IOrientation{
    getQuaternion(): number[] {
        throw new OwnNotImplemented();
    }
    getMatrix(): number[][] {
        throw new OwnNotImplemented();
    }
    
}