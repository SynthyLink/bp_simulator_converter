/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */


import  { OrbitalCommunication } from "./Algorithms/OrbitalForecastCalculation/OrbitalCommunication";
import type { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from "./Algorithms/OrbitalForecastCalculation/OrbitalData";

let orbitalCommunication : OrbitalCommunication = new OrbitalCommunication
let any: any = ""

export async function actOrbitCalculation(): Promise<void> {
    await orbitalCommunication.actOrbitCalculation();
  
  
};

   export async function orbitCalculation(condition: OrbitalForecastConditionNumber,
   ): Promise<OrbitalForecastItemNumber[] | undefined> {
       return orbitalCommunication.orbitCalculation(condition)
   }




export const getOrbitalForecastFromNumber = async (
    condition: OrbitalForecastConditionNumber,
): Promise<OrbitalForecastItemNumber[] | undefined> => {
    var t = await orbitalCommunication.getOrbitalForecastFromNumber(condition);
    return t;
};



export const getOrbitalInitialCancel = async (): Promise<OrbitalForecastConditionNumber | undefined> => {
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













