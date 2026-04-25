import { OwnNotImplemented } from "../../ErrorHandler/OwnNotImplemented";
import { IAction } from "../../Interfaces/IAction";
import { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import { IFactory } from "../../Interfaces/IFactory";
import { IObject } from "../../Interfaces/IObject";
import { Performer } from "../../Performer";
import { ActionArray } from "../../Utilities/Generic/ActionArray";
import { GamePerformer } from "../GamePerformer";
import { IGame } from "../Interfaces/IGame";
import { IScene } from "../Interfaces/IScene";


export abstract class AbstractGame implements IGame
{
    constructor(name: string, factory: IFactory) {
        this.performer = new GamePerformer(this)
        this.factory = factory
        this.name = name
    }
    addScene(name: string, scene: IScene): void {
        this.scenes.set(name, scene)
        this.objects.push(scene)
    }
    protected performer !: GamePerformer

    protected typeName: string = "AbstractGame";

    protected types: string[] = ["IObject", "IGame", "IChildrenT<IScene>", "ISelfLoad",
        "IAddAction", "SelfStart", "IObjectCollection", "IExternalAction",
        "IFactoryConsumer", "AbstractGame"];

    protected name: string = "";

    protected scenes: Map<string, IScene> = new Map()

    protected children: IScene[] = []


    protected objects: IObject[] = []

    protected factory !: IFactory
   
    protected externalAction: IActionAddRemove = new ActionArray()

    protected internalAction: IActionAddRemove = new ActionArray()
   
    protected isStarted: boolean = false

    protected isLoaded: boolean = false


    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    getScenes(): Map<string, IScene> {
        return this.scenes
    }

    abstract run(): void

    abstract cycle(time: number): void

    getObjectCollection(): IObject[] {
        return this.objects;
    }




    getExternalAction(): IActionAddRemove {
        return this.externalAction
    }
    setConsumerFactory(factory: IFactory): void {
        this.factory = factory;
        this.performer.setFactoryToObjectCollection(this, factory)
    }
    getConsumerFactory(): IFactory {
        return this.factory
    }
    startItself(start: boolean): boolean {
        if (this.isStarted == start) return false
        this.isStarted = start
        this.performer.startCollecion(start, this);
        return true;
    }
    addAction(action: IAction, add: boolean): void {
        if (add) this.externalAction.addAction(action)
        else this.externalAction.removeAction(action)
    }

    loadItself(load: boolean): boolean {
        if (this.isLoaded == load) return false
        this.isLoaded = load
        this.performer.loadCollecion(load, this)
        this.internalAction.clearActions()
        if (load) {
            for (var s of this.scenes) {
                this.internalAction.addAction(s[1].getInternalAction())
            }
        }

        return true;
    }

  
    addChildT(child: IScene): void {
        throw new OwnNotImplemented()
    }
    removeChildT(child: IScene): void {
        throw new OwnNotImplemented()
   }

    getChildernT(): IScene[] {
        return this.children;
    }

}