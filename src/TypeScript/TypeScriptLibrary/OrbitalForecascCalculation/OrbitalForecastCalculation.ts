import { IAction } from "../Library/Interfaces/IAction";
import { OrbitalForecast } from "./OrbitalForecast";

export class OrbitalForecastCalculation extends OrbitalForecast implements IAction {
    constructor() {
        super();
    }
    action(): void {
        throw new Error("Method not implemented.");
    }

    
    
}