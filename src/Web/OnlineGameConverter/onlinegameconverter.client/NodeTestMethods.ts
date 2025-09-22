/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { http_cancel, http } from "./Library/Communications/http/http_interface";
import { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from "./Algorithms/OrbitalForecastCalculation/OrbitalData";
import { OrbitalForecastCalculation } from "./Algorithms/OrbitalForecastCalculation/OrbitalForecastCalculation";

import { OwnError } from "./Library/ErrorHandler/OwnError";
import { OwnNotImplemented } from "./Library/ErrorHandler/OwnNotImplemented";


export async function actOrbitCalculation(): Promise<void> {
      let o = new OrbitalForecastCalculation();
       const cond = {
           Begin: 0, End: 20000, X: -5448.34815324, Y: -4463.93698421, Z: 0, Vx: -0.98539477743, Vy: 1.21681893834, Vz: 7.45047785592
       };
       const ab = new AbortController();
       const t = await o.calculate(cond, ab);
       console.log("IMITATION", t);
       //*/
  
  
};


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
    const controller = new AbortController();
    console.log('ForecastFromNumber');
    const result = await http_cancel<OrbitalForecastItemNumber[], OrbitalForecastConditionNumber>({
        path: `/orbital`,
        method: "post",
        body: condition,
    }, controller);
    console.log("ok", result.ok);
    console.log("body", result.body);
    if (result.ok && result.body) {
        return result.body;
    } else {
        return null;
    }
};


export const getOrbitalInitialCancel = async (): Promise<OrbitalForecastConditionNumber | null> => {
    const controller = new AbortController();
    const result = await http_cancel<OrbitalForecastConditionNumber>({
        path: '/orbital/initial',
    }, controller);
    if (result.ok && result.body) {
        return result.body;
    } else {
        return null;
    }
};


export async function nodeWheatherForecastClick(): Promise<void> {

    try {
        const response = await fetch('weatherforecast/ttts');
        if (response.ok) {
            console.log("WHEATHER", response)
            const data = await response.json();
            console.log("WHEATHER", data)
        }
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
};



export async function nodeOrbitalIClickCanlel(): Promise<void> {

    try {

        //      const cond = {
        //          Begin: 0, End: 20000, X: -5448.34815324, Y: -4463.93698421, Z: 0, Vx: 0.98539477743, Vy: 1.21681893834, Vz: 7.45047785592
        //       };
        console.log("ORBITAL INITIAL");

        const response = await getOrbitalInitialCancel();
        console.log("ORBITAL INITIAL", response);
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
};







export async function nodeOrbitalClick(): Promise<void> {

    try {

        const cond = {
            Begin: 0, End: 20000, X: -5448.34815324, Y: -4463.93698421, Z: 0, Vx: 0.98539477743, Vy: 1.21681893834, Vz: 7.45047785592
        };
        const response = await getOrbitalForecastFromNumber(cond);
        console.log("ORBITAL SERVER", response);
   
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
};













