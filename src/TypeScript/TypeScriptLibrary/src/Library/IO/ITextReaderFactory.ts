import { ITextReader } from "../Interfaces/ITextReader";

export interface ITextReaderFactory {
    getTextReader(obj: any, url: string): ITextReader
}