import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { ITextReader } from "../Interfaces/ITextReader";
import * as fs from 'fs';
export class StreamReader implements ITextReader {
    constructor(fullpath: string) {
        this.text = fs.readFileSync(fullpath, 'utf-8')

    }
    readToEnd(): string {
        this.end = true
        return this.text
    }

    readLine(): string {
        throw new OwnNotImplemented()
    }

    eof(): boolean {
        return this.end
    }

    strings: string[] = []

    text: string = ""

    end: boolean = false
}