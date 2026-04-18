import { ITextReader } from "./Interfaces/ITextReader";


export class LinesTextReader implements ITextReader {

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
        this.strings = this.text.split("\n")
    }

    strings: string[] = [];

    text: string = "";

    end: boolean = false;

    n = 0;

}
