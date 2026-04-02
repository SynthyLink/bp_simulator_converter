import type { ICategoryArrow } from "./ICategoryArrow";
import type { ICategoryObject } from "./ICategoryObject";
import type { IObject } from "./IObject";

export interface IComponentCollection
{

    getCategoryObjects(): ICategoryObject[];

    getCategoryArrows(): ICategoryArrow[];

    getObjects(): IObject[];

    getCategoryObject(name: string): ICategoryObject;
}