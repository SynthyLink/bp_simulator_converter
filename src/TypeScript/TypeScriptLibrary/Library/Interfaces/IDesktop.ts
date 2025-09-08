import { ICategoryArrow } from "./ICategoryArrow";
import { ICategoryObject } from "./ICategoryObject";
import { ICheck } from "./ICheck";
import { IObject } from "./IObject";

export interface IDesktop
{
    getCategoryObjects(): ICategoryObject[];

    getCategoryArrows(): ICategoryArrow[];

    addCategoryObject(obj: ICategoryObject): void;

    addCategoryArrow(arr: ICategoryArrow): void;

    addObject(obj: IObject): void;

    getObjects(): IObject[];


    getCheck(): ICheck;

    setCheck(check: ICheck): void;

    getCategoryObject(name: string): ICategoryObject;

}
