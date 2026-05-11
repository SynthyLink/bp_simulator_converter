/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { OwnNotImplemented } from "./ErrorHandler/OwnNotImplemented";
import { Performer } from "./Performer";
import type { ICategoryArrow } from "./Interfaces/ICategoryArrow";
import type { ICategoryObject } from "./Interfaces/ICategoryObject";
import type { ICheck } from "./Interfaces/ICheck";
import type { IDesktop } from "./Interfaces/IDesktop";
import type { IObject } from "./Interfaces/IObject";
import type { IInitializeTask } from "./Interfaces/IInitializeTask"

export class Desktop implements IDesktop, IObject
{
    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }
    protected typeName: string = "Desktop";

    protected types: string[] = ["IObject", "IDesktop", "IComponentCollection", "IObjectCollection", "Desktop"];

    protected categoryObjects: ICategoryObject[] = [];

    protected categoryArrows: ICategoryArrow[] = [];

    protected objects: IObject[] = [];

    protected name!: string;

    protected arrow!: ICategoryArrow;


    protected source!: ICategoryObject;


    protected target!: ICategoryObject;

    protected check !: ICheck;

    protected mapObjects: Map<string, ICategoryObject> = new Map()


    protected performer: Performer = new Performer();


     async initializeTaksAsync(cancel: AbortController): Promise<void> {

        var init = [];
        var ii = this.performer.getByInterface(this, "IInitializeTask");
        for (var i of ii) {
            var k = i as unknown as IInitializeTask;
            k.initializeTaskAsync(cancel);
            init.push(k);
        }
        await Promise.all(init);
    }

    public async loadAsync(cancel: AbortController): Promise<void> {
        await this.initializeTaksAsync(cancel);
        this.finish();
    }

    public finish(): void {

    }

    getObjectCollection(): IObject[] {
        return this.objects
    }


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
        return this.check;
    }


    getCategoryObject(name: string): ICategoryObject {
        for (var o of this.categoryObjects) {
            var n = o.getCategoryObjectName();
            if (n == name) {
                return o;
            }
        }
        throw new OwnNotImplemented("DESKTOP");
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