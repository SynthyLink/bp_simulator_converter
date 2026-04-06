import type { IExceptionHandler } from "../../Interfaces/IExceptionHandler";
import type { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import type { IActionAddRemoveT } from "../../Interfaces/IActionAddRemoveT";
import type { IFunc } from "../../Interfaces/IFunc";
import type { INamed } from "../../NamedTree/Interfaces/INamed";
import type { IScadaEvent } from "./IScadaEvent";

export interface IScadaInterface extends INamed
{

    getScadaInputs(): Map<string, any>

    getScadaOutputs(): Map<string, any>

    setScadaConstant(name: string, value: any): void

    getScadaConstant(name: string): any

    getScadaConstants(): Map<string, any>

    getScadaEventsArray(): string[]

    getScadaEventsMap(): Map<string, string[]>

    getScadaObects(): Map<string, string[]>

    getScadaInput(name: string)  : IActionAddRemoveT<any>

    getScadaInputsEvent(name: string): IActionAddRemoveT<any[]>

    getScadaConstantEvent(name: string): IActionAddRemoveT<any>

    getScadaOutputsFunc(name: string): IFunc<any[]>

    getScadaOutputFunc(name: string): IFunc<any>

    getScadaEvent(name: string): IScadaEvent

    getScadaObject<T>(name: string): T

    setScadaEnabled(enabled: boolean) : void

    isScadaEnabled(): boolean

    getScadaStop(): IActionAddRemove

    getScadaStart(): IActionAddRemove

    getScadaExceptionHanler(): IExceptionHandler

    setScadaExceptionHanler(e: IExceptionHandler): void

    refreshScada(): void

    onRefresh(): IActionAddRemove

}

