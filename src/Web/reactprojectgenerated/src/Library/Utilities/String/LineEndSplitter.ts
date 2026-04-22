import { IObject } from "../../Interfaces/IObject";
import { IStringSplitter } from "./Interfaces/IStringSplitter";

export class LineEndSplitter implements IObject, IStringSplitter {

    splitStrings(object: any, str: string): string[] {
        return str.split('\n')
    }

    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected typeName: string = "LineEndSplitter";

    protected types: string[] = ["IObject", "IStringSplitter", "LineEndSplitter"];

    protected name: string = "";

}