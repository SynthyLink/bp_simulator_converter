import { IDesktop } from "../Interfaces/IDesktop";
import { RelativeMeasurements } from "../Motion6D/Objects/RelativeMeasurements";

export class FictiveRelativeMeasurements extends RelativeMeasurements {
    
    constructor(desktop: IDesktop, name: string) {
        super(desktop, name);
        this.typeName = "FictiveRelativeMeasurements";
        this.types.push("FictiveRelativeMeasurements");
    }
}