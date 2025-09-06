import type { http_cancel, http } from "../http";
import type { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from "./OrbitalData";


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

export const getOrbitalForecastFromNumber1 = async (
   condition: OrbitalForecastConditionNumber,
): Promise<OrbitalForecastItemNumber[] | null> => {
    console.log('ForecastFromNumber');
    const result = await http<OrbitalForecastItemNumber[], OrbitalForecastConditionNumber>({
        path: `/orbitalforecastfronumber`,
        method: "post",
        body: condition,
    });
    console.log("ok", result.ok);
    console.log("body", result.body);
    if (result.ok && result.body) {
        return result.body;
    } else {
        return null;
    }
};

export const getOrbitalInitial = async (): Promise<OrbitalForecastConditionNumber | null> => {
    const result = await http<OrbitalForecastConditionNumber>({
        path: '/orbital/initial',
    });
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


export const obritalInitial = async (
): Promise<OrbitalForecastConditionNumber | null> => {
    try {
        console.log("obritalInitial");

        const response = await fetch('api/orbital');
        if (response.ok) {
            console.log("obritalInitial RESPONSE", response);
            if (response.body) {
                console.log("BI+ODY RESPONSE", response.body);
                const data = await response.body.json();
                return data;
            }
        }
    }
    catch (ex) {
        console.log(ex);
    }
    console.log("obritalInitial null");
    return null;
}

    export async function initCond():void {

    const result = await obritalInitial();
    if (result != null) {
        console.log(result);
        /*    const b = result.Begin + '';
            setBegin(b);
            const e = result.End + '';
            setEnd(e);
            const x = result.X + '';
            setX(x);
            const y = result.Y + '';
            setY(y)
            const z = result.Z + '';
            setZ(z)
            const Vx = result.Vx + '';
            setVx(Vx)
            const Vy = result.Vx + '';
            setVy(Vy)
            const Vz = result.Vx + '';
            setVz(Vz);*/
    }

};


export const weather = async (
):Promise< void> => {
    try {
        console.log("obritalInitial");

        const response = await fetch('/weatherfoecast');
        if (response.ok) {
            console.log("obritalInitial RESPONSE", response);
            if (response.body) {
                console.log("BI+ODY RESPONSE", response.body);
         //       const data = await response.body.json();
                return;
            }
        }
    }
    catch (ex) {
        console.log(ex);
    }
    console.log("obritalInitial null");
}



