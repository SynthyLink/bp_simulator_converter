import { ITextReader } from "./ITextReader";

export interface ITextReaderFactory {
    getTextReader(obj: any, url: string): ITextReader
}