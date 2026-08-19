import { EmptyObject } from "../EmptyObject";
import type { ITextReader } from "./Interfaces/ITextReader";
export declare class LinesTextReader extends EmptyObject implements ITextReader {
    constructor();
    getStrings(): string[];
    reset(): void;
    readToEnd(): string;
    readLine(): string;
    eof(): boolean;
    protected split(): void;
    protected typeName: string;
    protected types: string[];
    protected name: string;
    strings: string[];
    text: string;
    end: boolean;
    n: number;
}
//# sourceMappingURL=LinesTextReader.d.ts.map