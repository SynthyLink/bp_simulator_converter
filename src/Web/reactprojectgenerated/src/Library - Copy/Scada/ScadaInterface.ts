import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IActionAddRemoveT } from "../Interfaces/IActionAddRemoveT";
import type { IEventOutput } from "../Interfaces/IEventOutput";
import type { IExceptionHandler } from "../Interfaces/IExceptionHandler";
import type { IFunc } from "../Interfaces/IFunc";
import type { IScadaEvent } from "./Interfaces/IScadaEvent";
import type { IScadaInterface } from "./Interfaces/IScadaInterface";
import type { IObject } from "../Interfaces/IObject";
import { ActionArray } from "../Utilities/Generic/ActionArray";
import { Performer } from "../Performer";

export abstract class ScadaInterface implements IScadaInterface, IObject
{
    getClassName(): string {
        return this.typeName
    }
    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }
    getName(): string {
        return this.name
    }

    protected name: string = "";
    protected typeName: string = "ScadaInterface";

    protected types: string[] = ["IObject", "IScadaInterface", "IObjectCollection", "ScadaInterface"];


    performer: Performer = new Performer()


    protected inputs: Map<string, any> = new Map();

    protected outputs: Map<string, any> = new Map();

    protected constants: Map<string, any> = new Map();

    protected objects: Map<string, string[]> = new Map()

    protected events: string[] = []



    //  !!! FOR LATER EVENTS WITH ARGUMENTS   protected List<string> eventOutputs = new List<string>();

    protected dInput: Map<string, IActionAddRemoveT<any>> = new Map()

    protected dConstant : Map<string, IActionAddRemoveT<any>> = new Map()

    protected fConstant  : Map<string, IFunc<any>> = new Map()

    protected dEvents: Map<string, IScadaEvent> = new Map() 

    protected dEventOutputs: Map<string, IEventOutput> = new Map();

    protected dOutput: Map<string, IFunc<any>> = new Map()

       /// <summary>
        /// On start event
    /// </summary>
    protected onStart :  IActionAddRemove = new ActionArray()

        /// <summary>
        /// On Stop event
        /// </summary>
    protected onStop: IActionAddRemove = new ActionArray()

    protected onRefresh: IActionAddRemove = new ActionArray()


    protected isEnabled: boolean = false

    protected exceptionHandler !: IExceptionHandler




    getScadaInputs(): Map<string, any> {
        return this.inputs
    }
    getScadaOutputs(): Map<string, any> {
        return this.outputs
    }
    setScadaConstant(name: string, value: any): void {
        this.constants.set(name, value)
    }
    getScadaConstant(name: string) {
        return this.constants.get(name)
    }
    getScadaConstants(): Map<string, any> {
        return this.constants
    }
    getScadaEventsArray(): string[] {
        return this.events
    }

    getScadaObects(): Map<string, string[]> {
        return this.objects
    }


    getScadaInputEvent(name: string): IActionAddRemoveT<any> | undefined
    {
        return this.dInput.get(name)
    }


    getScadaConstantEvent(name: string): IActionAddRemoveT<any> | undefined {
        return this.dConstant.get(name)
    }
    getScadaOutputsFunc(name: string): IFunc<any[]> | undefined {
        return undefined;
    }

    getScadaOutputFunc(name: string): IFunc<any> | undefined {
        return this.dOutput.get(name);
    }
    getScadaEvent(name: string): IScadaEvent | undefined {
        return this.dEvents.get(name)
    }

    abstract getScadaObject<T>(name: string, type: string): T[]

    abstract getObjectCollection(): IObject[]

   
    setScadaEnabled(enabled: boolean): void {
        this.isEnabled = enabled
    }
    isScadaEnabled(): boolean {
        return this.isEnabled
    }
    getScadaStop(): IActionAddRemove {
        return this.onStop;
    }
    getScadaStart(): IActionAddRemove {
        return this.onStart;
    }
    getScadaExceptionHanler(): IExceptionHandler {
        return this.exceptionHandler;
    }
    setScadaExceptionHanler(e: IExceptionHandler): void {
        this.exceptionHandler = e
    }
    refreshScada(): void {
    }
    getScadaRefresh(): IActionAddRemove {
        return  this.onRefresh
    }
    getNamedName(): string {
        return this.name
    }
    setNamedName(name: string): void {
        this.name = name
    }

}