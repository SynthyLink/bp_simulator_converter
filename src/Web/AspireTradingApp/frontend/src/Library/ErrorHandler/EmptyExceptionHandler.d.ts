import type { IExceptionHandler } from "../Interfaces/IExceptionHandler";
export declare class EmptyExceptionHandler implements IExceptionHandler {
    handleException<T>(exception: T, obj: any[]): void;
    log(message: string, obj: any[]): void;
    any: any;
}
//# sourceMappingURL=EmptyExceptionHandler.d.ts.map