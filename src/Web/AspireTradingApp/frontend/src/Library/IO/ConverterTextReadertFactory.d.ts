import type { IFuncT } from "../Interfaces/IFuncT";
import type { ITextReader } from "./Interfaces/ITextReader";
import type { ITextReaderFactory } from "./Interfaces/ITextReaderFactory";
export declare class ConverterTextReadertFactory implements ITextReaderFactory {
    constructor(factory: ITextReaderFactory, func: IFuncT<string, string>);
    getTextReader(obj: any, url: string): ITextReader | undefined;
    factory: ITextReaderFactory;
    func: IFuncT<string, string>;
    any: any;
}
//# sourceMappingURL=ConverterTextReadertFactory.d.ts.map