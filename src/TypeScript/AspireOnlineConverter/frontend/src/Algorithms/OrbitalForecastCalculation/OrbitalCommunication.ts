import type { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from "./OrbitalData";

export class OrbitalCommunication {
    public async actOrbitCalculation(): Promise<void> {

    }

    public async orbitCalculation(condition: OrbitalForecastConditionNumber,
    ): Promise<OrbitalForecastItemNumber[] | undefined> {
        this.any = condition
        return undefined
    }

    public async getOrbitalForecastFromNumber(
        condition: OrbitalForecastConditionNumber,
    ): Promise<OrbitalForecastItemNumber[] | undefined> {
        this.any = condition
        return undefined;
    }

    public async getOrbitalInitialCancel(): Promise<OrbitalForecastConditionNumber | undefined>  {
        try {
            const response = await fetch('/api/initial')
            console.log(response)
            if (!response.ok) {
                console.log(response)
            }
            else {
                const data = await response.json();
                console.log(data)

            }
        }
        catch (err) {
            //setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
            console.error('Error fetching weather forecast:', err);
        } finally {
            console.log("finally")
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