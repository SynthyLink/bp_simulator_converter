import type { IAction } from "../Interfaces/IAction";
import type { IMeasurements } from "./Interfaces/IMeasurements";

export class UpdateMeasurementsAction implements IAction {
    action(): void {
        console.log(this.m)
       this.m.updateMeasurements()
    }

    constructor(m: IMeasurements) {
        this.m = m;
        console.log("MMM", this.m)
    }

    m !: IMeasurements

}