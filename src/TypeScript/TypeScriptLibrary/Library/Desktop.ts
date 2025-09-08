import { OwnNotImplemented } from "./ErrorHandler/OwnNotImplemented";
import { ICategoryArrow } from "./Interfaces/ICategoryArrow";
import { ICategoryObject } from "./Interfaces/ICategoryObject";
import { ICheck } from "./Interfaces/ICheck";
import { IDesktop } from "./Interfaces/IDesktop";
import { IObject } from "./Interfaces/IObject";

export class Desktop implements IDesktop
{
    addObject(obj: IObject): void {
        this.objects.push(obj);
    }
    getObjects(): IObject[] {
        return this.objects;
    }
    setCheck(check: ICheck): void {
        this.check = check
    }
    getCheck() {
        return  this.check;
    }


    protected categoryObjects: ICategoryObject[] = [];

    protected categoryArrows: ICategoryArrow[] = [];

    protected objects: IObject[] = [];

    protected name!: string;

    protected arrow!: ICategoryArrow;


    protected source!: ICategoryObject;


    protected target!: ICategoryObject;

    protected check !: ICheck;

    getCategoryObject(name: string): ICategoryObject {
        for (var o of this.categoryObjects) {
            var n = o.getCategoryObjectName();
            if (n == name) {
                return o;
            }
        }
        throw new OwnNotImplemented();
    }

    getCategoryObjects(): ICategoryObject[] {
        return this.categoryObjects;
    }
    getCategoryArrows(): ICategoryArrow[] {
        return this.categoryArrows;
    }
    addCategoryObject(obj: ICategoryObject): void {
        this.categoryObjects.push(obj);
    }
    addCategoryArrow(arr: ICategoryArrow): void {
        this.categoryArrows.push(arr);
    }
    getName(): string {
        return this.name;
    }

}