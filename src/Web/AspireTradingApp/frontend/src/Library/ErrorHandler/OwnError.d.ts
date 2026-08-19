export declare class OwnError implements Error {
    name: string;
    message: string;
    stack?: string | undefined;
    constructor(name: string | undefined, message: string, stack?: string | undefined);
    protected init(): void;
}
//# sourceMappingURL=OwnError.d.ts.map