/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { types } from "node:util";
import { OwnNotImplemented } from "../../../Library/ErrorHandler/OwnNotImplemented";
import { ICategoryObject } from "../../../Library/Interfaces/ICategoryObject";
import { IDesktop } from "../../../Library/Interfaces/IDesktop";
import { IObject } from "../../../Library/Interfaces/IObject";
import { AtmospherePure } from "./AtmospherePure";
import { IObjectTransformer } from "../../../Library/Measurements/Interfaces/IObjectTransformer";
import { ICheck } from "../../../Library/Interfaces/ICheck";


export class AtmosphereCategoryObject extends AtmospherePure implements ICategoryObject, IObject,
    IObjectTransformer {

    constructor(desktop: IDesktop, name: string) {
        super();
        this.desktop = desktop;
        this.name = name;
        desktop.addCategoryObject(this);
        desktop.addObject(this);
        this.checker = desktop.getCheck();
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

    getClassName(): string {
        throw "AtmosphereCategoryObject";
    }
    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) > 0;
    }
    getName(): string {
        return this.name;
    }
    getObject(): Object {
        throw new OwnNotImplemented();
    }
    setObject(obj: Object): void {
        throw new OwnNotImplemented();
    }
    getCategoryObjectName(): string {
        return this.name;
    }
    getDesktop(): IDesktop {
        return this.desktop;
    }

    name: string = "";

    protected types: string[] = ["IObject", "ICategoryObject", "IObjectTransformer", "AtmospherePure", "AtmosphereCategoryObject"];


    desktop !: IDesktop;

    protected checker !: ICheck;

    inp: string[] = ["t", "x", "y", "z"];
    ooutp: string[] = ["Density"];

    a: number = 0;
}
