import type { ICategoryArrow } from "./ICategoryArrow";
import type { ICategoryObject } from "./ICategoryObject";
import type { IObject } from "./IObject";
import type { IObjectCollection } from "./IObjectCollection";

export interface IComponentCollection extends IObjectCollection {

    getCategoryObjects(): ICategoryObject[];

    getCategoryArrows(): ICategoryArrow[];

    getCategoryObject(name: string): ICategoryObject;
}