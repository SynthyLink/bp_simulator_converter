/* eslint-disable @typescript-eslint/no-unused-vars */

export interface OrbitalForecastConditionNumber {
    Begin: number;
    End: number;
    X: number;
    Y: number;
    Z: number;
    Vx: number;
    Vy: number;
    Vz: number;
}

export interface OrbitalForecastItemNumber {
    OrbitalTime: number;
    X: number;
    Y: number;
    Z: number;
    Vx: number;
    Vy: number;
    Vz: number;
}

export interface OrbitalForecastConditionString {
    Begin: string;
    End: string;
    X: string;
    Y: string;
    Z: string;
    Vx: string;
    Vy: string;
    Vz: string;
}

export interface OrbitalForecastItemString {
    OrbitalTime: string;
    X: string;
    Y: string;
    Z: string;
    Vx: string;
    Vy: string;
    Vz: string;
}

import { http_cancel } from "../../../Library/Communications/http/http"
export interface OrbitalForecastConditionNumber {
    Begin: number;
    End: number;
    X: number;
    Y: number;
    Z: number;
    Vx: number;
    Vy: number;
    Vz: number;
}

export interface OrbitalForecastItemNumber {
    OrbitalTime: number;
    X: number;
    Y: number;
    Z: number;
    Vx: number;
    Vy: number;
    Vz: number;
}

export interface OrbitalForecastConditionString {
    Begin: string;
    End: string;
    X: string;
    Y: string;
    Z: string;
    Vx: string;
    Vy: string;
    Vz: string;
}

export interface OrbitalForecastItemString {
    OrbitalTime: string;
    X: string;
    Y: string;
    Z: string;
    Vx: string;
    Vy: string;
    Vz: string;
}
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



