import type { IVelocity } from "../Motion6D/Interfaces/IVelocity";

export class FictiveVelocity implements IVelocity {
    getVelocity(): number[] {
        return [];
    }

}