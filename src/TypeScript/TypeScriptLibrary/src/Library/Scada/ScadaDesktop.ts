import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IActionAddRemoveT } from "../Interfaces/IActionAddRemoveT";
import type { IExceptionHandler } from "../Interfaces/IExceptionHandler";
import type { IFunc } from "../Interfaces/IFunc";
import type { IScadaEvent } from "./Interfaces/IScadaEvent";
import type { IScadaInterface } from "./Interfaces/IScadaInterface";

export class ScadaDesktop implements IScadaInterface {
    getScadaInputs(): Map<string, any> {
        throw new Error("Method not implemented.");
    }
    getScadaOutputs(): Map<string, any> {
        throw new Error("Method not implemented.");
    }
    setScadaConstant(name: string, value: any): void {
        throw new Error("Method not implemented.");
    }
    getScadaConstant(name: string) {
        throw new Error("Method not implemented.");
    }
    getScadaConstants(): Map<string, any> {
        throw new Error("Method not implemented.");
    }
    getScadaEventsArray(): string[] {
        throw new Error("Method not implemented.");
    }
    getScadaEventsMap(): Map<string, string[]> {
        throw new Error("Method not implemented.");
    }
    getScadaObects(): Map<string, string[]> {
        throw new Error("Method not implemented.");
    }
    getScadaInput(name: string): IActionAddRemoveT<any> {
        throw new Error("Method not implemented.");
    }
    getScadaInputsEvent(name: string): IActionAddRemoveT<any[]> {
        throw new Error("Method not implemented.");
    }
    getScadaConstantEvent(name: string): IActionAddRemoveT<any> {
        throw new Error("Method not implemented.");
    }
    getScadaOutputsFunc(name: string): IFunc<any[]> {
        throw new Error("Method not implemented.");
    }
    getScadaOutputFunc(name: string): IFunc<any> {
        throw new Error("Method not implemented.");
    }
    getScadaEvent(name: string): IScadaEvent {
        throw new Error("Method not implemented.");
    }
    getScadaObject<T>(name: string): T {
        throw new Error("Method not implemented.");
    }
    setScadaEnabled(enabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    isScadaEnabled(): boolean {
        throw new Error("Method not implemented.");
    }
    getScadaStop(): IActionAddRemove {
        throw new Error("Method not implemented.");
    }
    getScadaStart(): IActionAddRemove {
        throw new Error("Method not implemented.");
    }
    getScadaExceptionHanler(): IExceptionHandler {
        throw new Error("Method not implemented.");
    }
    setScadaExceptionHanler(e: IExceptionHandler): void {
        throw new Error("Method not implemented.");
    }
    refreshScada(): void {
        throw new Error("Method not implemented.");
    }
    onRefresh(): IActionAddRemove {
        throw new Error("Method not implemented.");
    }
    getNamedName(): string {
        throw new Error("Method not implemented.");
    }
    setNamedName(name: string): void {
        throw new Error("Method not implemented.");
    }
}