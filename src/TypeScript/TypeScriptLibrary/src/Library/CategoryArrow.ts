
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SrvRecord } from "node:dns";
import { FictiveCategoryObject } from "./Fiction/FictiveCategoryObject";
import { FictiveDesktop } from "./Fiction/FictiveDesktop";
import type { ICategoryArrow } from "./Interfaces/ICategoryArrow";
import type { ICategoryObject } from "./Interfaces/ICategoryObject";
import type { IDesktop } from "./Interfaces/IDesktop";
import type { IObject } from "./Interfaces/IObject";
import { Performer } from "./Performer";

export class CategoryArrow implements ICategoryArrow, IObject
{
    constructor(desktop: IDesktop, name: string) {
        this.desktop = desktop;
        this.name = name;
        desktop.addCategoryArrow(this);
        desktop.addObject(this);
    }


    getArrowName(): string {
        return this.name;
    }
    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected name : string = "";

    protected desktop: IDesktop = new FictiveDesktop();


    protected source: ICategoryObject = new FictiveCategoryObject();
    ;

    protected target: ICategoryObject = new FictiveCategoryObject();

    protected typeName: string = "CategoryArrow";

    protected types: string[] = ["IObject", "ICategoryArrow", "CategoryArrow"];

    protected performer: Performer = new Performer()

   getDesktop(): IDesktop {
        return this.desktop;
    }

    getName(): string {
        return this.name;
    }

    getSource(): ICategoryObject {
        return this.source;
    }

    getTarget(): ICategoryObject {
        return this.target;
    }

    setSource(source: ICategoryObject): void {
        this.source = source;
    }

    setTarget(target: ICategoryObject): void {
        this.target = target;
    }

    protected getObjectT<T, S>(s : S, type: string) : T[]
    {
        return this.performer.convertObject<T, S>(s, type)
    }
}

