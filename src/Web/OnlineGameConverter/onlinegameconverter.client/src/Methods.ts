/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */


import type { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from "./Algorithms/OrbitalForecastCalculation/OrbitalData";
import { OrbitalForecastCalculation } from "./Algorithms/OrbitalForecastCalculation/OrbitalForecastCalculation";

import { OwnError } from "./Library/ErrorHandler/OwnError";
import { OwnNotImplemented } from "./Library/ErrorHandler/OwnNotImplemented";
import { OrbitalCommunication } from "./Orbital/OrbitalCommunication";

let orbitalCommunication = new OrbitalCommunication();

export async function actOrbitCalculation(): Promise<void> {
    await orbitalCommunication.actOrbitCalculation();
  
  
};

   export async function orbitCalculation(condition: OrbitalForecastConditionNumber,
   ): Promise<OrbitalForecastItemNumber[] | undefined> {
       const t = await orbitalCommunication.orbitCalculation(condition);
       return t;
   }



//import { CategoryObject } from '../../Library/Fiction/FictiveDesktop'
//import { OrbitalForecastCalculation } from "../../ExternalObjects/Algorithms/OrbitalForecastCalculation/OrbitalForecastCalculation"
//import { OrbitalForecast} from "./ExternalObjects/Algorithms/OrbitalForecastCalculation/OrbitalForecast"
/*export function actOrbitCalculation(): void {
    console.log("IMITATION");
    const o = new OrbitalForecast();

}*/
export const getOrbitalForecastFromNumber = async (
    condition: OrbitalForecastConditionNumber,
): Promise<OrbitalForecastItemNumber[] | null> => {
    var t = await orbitalCommunication.getOrbitalForecastFromNumber(condition);
    return t;
};



export const getOrbitalInitialCancel = async (): Promise<OrbitalForecastConditionNumber | null> => {
    return await orbitalCommunication.getOrbitalInitialCancel();
};


export async function nodeWheatherForecastClick(): Promise<void> {
    await orbitalCommunication.nodeWheatherForecastClick();
};



export async function nodeOrbitalIClickCanlel(): Promise<void> {
    await orbitalCommunication.nodeOrbitalIClickCanlel();
};



export async function nodeOrbitalClick(): Promise<void> {
    await orbitalCommunication.nodeOrbitalClick();
};













