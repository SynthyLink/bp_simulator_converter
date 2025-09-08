/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CategoryObject } from "../../../Library/CategoryObject";
import type { IDesktop } from "../../../Library/Interfaces/IDesktop";
import type { IObjectTransformer } from "../../../Library/Measurements/Interfaces/IObjectTransformer";


export class AtmosphereZero extends CategoryObject implements IObjectTransformer {
    constructor(desktop: IDesktop, name: string) {
        super(desktop, name);
        this.types.push("IObjectTransformer");
        this.types.push("AtmosphereZero");
        this.typeName = "AtmosphereZero";
    }



    getInput(): string[] {
        return this.inp;
    }
    getOutput(): string[] {
        return this.ooutp;
    }
    getInputType(i: number) {
        return this.a;
    }
    getOutputType(i: number) {
        return this.a;
    }
    calculate(input: any[], output: any[]): void {
        output[0] = 0;
    }


    inp: string[] = ["t", "x", "y", "z"];
    ooutp: string[] = ["Density"];

    a: number = 0;

}

