import type { IAngularVelocity } from "../Vector3D/Interfaces/IAngularVelocity";

export class FictiveAngularVelocity implements IAngularVelocity {
    getAngularVelocityX(): number {
        return 0;
    }
    getAngularVelocityY(): number {
        return 0;
    }
    getAngularVelocityZ(): number {
        return 0;
    }

}