import type { IGame } from "../../Game/Interfaces/IGame"
import type { IScene } from "../../Game/Interfaces/IScene"
import type { IAction } from "../../Interfaces/IAction"
import type { IActionAddRemove } from "../../Interfaces/IActionAddRemove"
import type { IFactory } from "../../Interfaces/IFactory"
import type { IObject } from "../../Interfaces/IObject"
import type { IResourceCollection } from "../../Resources/Infrefaces/IResouceCollection"
import type { IResourceItem } from "../../Resources/Infrefaces/IResourceItem"
import { ActionArray } from "../../Utilities/Generic/ActionArray"
import { GamePerformer } from "../GamePerformer"
import { EmptyGameObject } from "./EmptyGameObject"

export abstract class AbstractGame extends EmptyGameObject implements IGame, IResourceCollection {

    constructor(name: string, factory: IFactory | undefined) {
        super(name, factory)
        this.types.push("IGame")
        this.types.push("IObjectCollection")
        this.types.push("ISelfStart")
        this.types.push("IAddAction")
        this.types.push("ISelfLoad")
        this.types.push("IExternalAction")
        this.types.push("IResourceCollection")
        this.types.push("AbstractGame")
        this.typeName = "AbstractGame"
    }

    getResources(): IResourceItem[] {
        return this.resources
    }

  
    abstract run(): void 

    isRunning(): boolean {
        return this.isStarted;
    }


    addScene(name: string, scene: IScene): void {
        this.scenes.set(name, scene)
        this.objects.push(scene)
    }

 

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

 
    cycle(time: number): void {
        if (!this.isStarted) return
        this.ft = time
        this.intAct.action()
        this.externalAction.action()
        this.internalAction.action()
    }


    getObjectCollection(): IObject[] {
        return this.objects;
    }

    getExternalAction(): IActionAddRemove {
        return this.externalAction
    }
    setConsumerFactory(factory: IFactory): void {
        super.setConsumerFactory(factory)
        this.performer.setFactoryToObjectCollection(this, factory)
    }

    startItself(start: boolean): boolean {
        if (this.isStarted == start) return false
        this.isStarted = start
        this.performer.startCollecion(start, this);
        this.intAct.clearActions();
        for (var scene of this.scenes) {
            this.intAct.addAction(scene[1].getExternalAction())
        }
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
            this.performer.collectResources(this, this)
           for (var s of this.scenes) {
                this.internalAction.addAction(s[1].getInternalAction())
            }
        }
        return true;
    }
  
    addChildT(child: IScene): void {
        this.children.push(child)
        this.objects.push(child)
        var name = child.getName()
        if (!this.scenes.has(name)) {
            this.scenes.set(name, child)
        }
    }

    removeChildT(child: IScene): void {
        this.performer.remove(this.children, child)
    }

    getChildernT(): IScene[] {
        return this.children;
    }

    protected performer: GamePerformer = new GamePerformer()

    protected typeName: string = "AbstractGame";

    protected types: string[] = ["IObject", "IGame", "IChildrenT<IScene>", "ISelfLoad",
        "IAddAction", "SelfStart", "IObjectCollection", "IExternalAction",
        "IFactoryConsumer", "AbstractGame"];

    protected name: string = "";

    protected scenes: Map<string, IScene> = new Map()

    protected children: IScene[] = []


    protected objects: IObject[] = []


    protected externalAction: IActionAddRemove = new ActionArray()

    protected internalAction: IActionAddRemove = new ActionArray()

    protected isStarted: boolean = false

    protected isLoaded: boolean = false

    protected intAct: IActionAddRemove = new ActionArray

    protected areResourcesLoaded: boolean = false

    protected resources: IResourceItem[] = []

    protected ft !: number


 
}