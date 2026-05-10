import type { ITextReaderFactory } from "../../IO/Interfaces/ITextReaderFactory";
import type { IMtlDetector } from "../Interfaces/IMtlDetector";

export class MtlDetectorTextReader implements IMtlDetector
{
    factory !: ITextReaderFactory

    constructor(factory: ITextReaderFactory) {
        this.factory = factory;
    }

    detectMtl(url: string, obj: any): string[] {
        var reader = this.factory.getTextReader(obj, url);
        if (reader === undefined) return []
        return reader.getStrings();
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

    protected typeName: string = "CategoryArrow";

    protected types: string[] = ["IObject", "ICategoryArrow", "CategoryArrow"];

    protected name: string = "";


}