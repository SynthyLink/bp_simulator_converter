import { ITextReader } from "../Interfaces/ITextReader";
import { ITextReaderFactory } from "./ITextReaderFactory";
import { StreamReader } from "./StreamReader";

export class FileTextReaderFactory implements ITextReaderFactory{
    getTextReader(obj: any, url: string): ITextReader {
        return new StreamReader(url)
    }

}