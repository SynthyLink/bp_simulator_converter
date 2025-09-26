import type { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from "../Algorithms/OrbitalForecastCalculation/OrbitalData";
import { OrbitalForecastCalculation } from "../Algorithms/OrbitalForecastCalculation/OrbitalForecastCalculation";
import { HttpCommunication } from "../Library/Communications/http/http_interface";
import { getOrbitalInitialCancel, getOrbitalForecastFromNumber } from "../Methods";

export class OrbitalCommunication extends HttpCommunication {

    public async actOrbitCalculation(): Promise<void> {
        let o = new OrbitalForecastCalculation();
        const cond = {
            begin: 0, end: 20000, x: -5448.34815324, y: -4463.93698421, z: 0, vx: -0.98539477743, vy: 1.21681893834, vz: 7.45047785592
        };
        const ab = new AbortController();
        const t = await o.calculate(cond, ab);
        console.log("IMITATION", t);

        //*/
    }

    public async orbitCalculation(condition: OrbitalForecastConditionNumber,
    ): Promise<OrbitalForecastItemNumber[] | undefined> {
        let o = new OrbitalForecastCalculation();
        const ab = new AbortController();
        const t = await o.calculate(condition, ab);
        return t;
    }




    public async getOrbitalForecastFromNumber(
        condition: OrbitalForecastConditionNumber,
    ): Promise<OrbitalForecastItemNumber[] | undefined> {
        const controller = new AbortController();
        console.log('ForecastFromNumber');
        const result = await this.http_cancel<OrbitalForecastItemNumber[], OrbitalForecastConditionNumber>({
            path: `/orbital`,
            method: "post",
            body: condition,
        }, controller);
        if (result.ok && result.body)
        {
            return result.body;
        }
        else
        {
            return undefined;
        }
    }


    public getOrbitalInitialCancel = async (): Promise<OrbitalForecastConditionNumber | null> => {
        const controller = new AbortController();
        const result = await this.http_cancel<OrbitalForecastConditionNumber>({
            path: '/orbital/initial',
        }, controller);
        if (result.ok && result.body) {
            return result.body;
        } else {
            return null;
        }
    }


    public async nodeWheatherForecastClick(): Promise<void> {

        try {
            const response = await fetch('weatherforecastt/ttts');
            if (response.ok) {
                console.log("WHEATHER", response)
                const data = await response.json();
                console.log("WHEATHER", data)
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }



    public async nodeOrbitalIClickCanlel(): Promise<void> {

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
    }







    public async nodeOrbitalClick(): Promise<void> {

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
    }
};
