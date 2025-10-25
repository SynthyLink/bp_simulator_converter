/* eslint-disable @typescript-eslint/no-unused-vars */

import { DateTimeConverter } from "../../Library/Utilities/DateTime/DateTimeConverter";

const converter = new DateTimeConverter();
export interface OrbitalForecastConditionNumber
{
    begin: number;
    end: number;
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
}

/*
    public record  class OrbitalForecastConditionNumber 
    {


        public double begin { get; init; }

        public double end { get; init; }

        public double x { get; init; }

        public double y { get; init; }
        
        public double z { get; init; }

        public double vx { get; init; }

        public double vy { get; init; }

        public double vz { get; set; }

    }

*/

export interface OrbitalForecastItemNumber {
    orbitalTime: number;
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    duration: number;
}

export interface OrbitalForecastItemDateTime {
    orbitalTime: Date;
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    duration: number;
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

export function toDateTime(time: OrbitalForecastItemNumber): OrbitalForecastItemDateTime {
    return {
        orbitalTime: converter.fromOADate(time.orbitalTime / 86400.
        ), x: time.x, y: time.y, z: time.z, vx: time.vx, vy: time.vy, vz: time.vz, duration: time.duration
    }

}




