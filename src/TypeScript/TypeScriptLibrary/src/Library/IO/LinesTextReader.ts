import { IObject } from "../Interfaces/IObject";
import { ITextReader } from "./Interfaces/ITextReader";


export class LinesTextReader implements IObject, ITextReader {

    getStrings(): string[] {
        return this.strings
    }

    reset(): void {
        this.n = 0;
        this.end = false
    }

    readToEnd(): string {
        this.end = true;
        return this.text;
    }

    readLine(): string {
        let s = this.strings[this.n];
        this.n++;
        if (this.n >= this.strings.length) this.end = true;
        return s;
    }

    eof(): boolean {
        return this.end;
    }

    protected split(): void {
        var s = this.text.split("\n")
        for (var str of s) {
            this.strings.push(str.replace("\r", ""))
        }
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

    protected types: string[] = ["IObject", "ITextReader", "LinesTextReader"];

    protected name: string = "";


    strings: string[] = [];

    text: string = "";

    end: boolean = false;

    n = 0;

}
