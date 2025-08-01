import { ICategoryArrow } from "./Interfaces/ICategoryArrow";
import { ICategoryObject } from "./Interfaces/ICategoryObject";
import { IDesktop } from "./Interfaces/IDesktop";
import { IObject } from "./Interfaces/IObject";

export class CategoryArrow implements ICategoryArrow, IObject
{
    constructor(desktop: IDesktop, name: string)
    {
        this.desktop = desktop;
        this.name = name;
        desktop.addCategoryArrow(this);
    }
    getName(): string {
        throw new Error("Method not implemented.");
    }

    getCategoryArrowName(): string
    {
        return this.name;
    }

    getClassName(): string {
        return this.typeName;
    }
    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected name !: string;

    protected desktop !: IDesktop;

    getDesktop(): IDesktop {
        return this.desktop;
    }

    source!: ICategoryObject;

    target!: ICategoryObject;

    protected typeName: string = "CategoryArrow";

    protected types: string[] = ["ICategoryArrow", "CategoryArrow"];


    getSource(): ICategoryObject {
        return this.source;
    }
    getTagret(): ICategoryObject {
        return this.target;
    }
    setSource(source: ICategoryObject): void {
        this.source = source;
    }
    setTarget(target: ICategoryObject): void {
        this.target = target;
    }
}

