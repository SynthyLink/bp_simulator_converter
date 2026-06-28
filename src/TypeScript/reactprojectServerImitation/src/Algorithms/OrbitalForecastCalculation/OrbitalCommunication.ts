
import { HttpCommunication, setCommunicationServer } from "../../Library/Communications/http/http_interface";
import type { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from "./OrbitalData";
import { OrbitalForecastCalculation } from "./OrbitalForecastCalculation";

export class OrbitalCommunication extends HttpCommunication {

    url: string = "";
    public async actOrbitCalculation(): Promise<void> {

    }

    public async orbitCalculation(condition: OrbitalForecastConditionNumber,
    ): Promise<OrbitalForecastItemNumber[] | undefined> {
        let o = new OrbitalForecastCalculation();
        this.any = o
        const ab = new AbortController();
        const t = await o.calculate(condition, ab);
        return t;
    }

    public async getOrbitalForecastFromNumber(
        condition: OrbitalForecastConditionNumber,
    ): Promise<OrbitalForecastItemNumber[] | undefined> {
        this.any = condition
        const controller = new AbortController();
        const result = await this.http_cancel<OrbitalForecastItemNumber[], OrbitalForecastConditionNumber>({
            path: "/api/forecastfromnumber",
            method: "post",
            body: condition,
        }, controller);
        if (result.ok && result.body) {
            return result.body;
        }
        else {
            return undefined;
        }
    }

    public async getOrbitalInitialCancel(): Promise<OrbitalForecastConditionNumber | undefined>  {
        try {
            let s = "/api/initial"
            const response = await fetch(s)
            if (!response.ok) {
                console.log(response)
            }
            else {
                let u = response.url;
                this.url = u.substring(0, u.length - s.length)
                console.log(this.url)
                setCommunicationServer(this.url)
                const data = await response.json();
                return data
            }
        }
        catch (err) {
            //setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
            console.error('Error fetching weather forecast:', err);
        } finally {
            //setLoading(false);
        }        return undefined

    }

    public async nodeWheatherForecastClick(): Promise<void> {

    }

    public async nodeOrbitalIClickCanlel(): Promise<void> {

    }

    public async nodeOrbitalClick(): Promise<void> {

    }

    any : any

}

