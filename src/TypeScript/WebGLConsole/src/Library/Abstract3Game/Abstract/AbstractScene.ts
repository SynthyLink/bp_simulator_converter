import { IAction } from "../../Interfaces/IAction";
import { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import { IFactory } from "../../Interfaces/IFactory";
import { IObject } from "../../Interfaces/IObject";
import { ActionArray } from "../../Utilities/Generic/ActionArray";
import { IGame } from "../Interfaces/IGame";
import { IScene } from "../Interfaces/IScene";
import { ISceneObject } from "../Interfaces/ISceneObject";
import { ScenePerformer } from "../ScenePerformer";

export class AbstractScene implements  IScene {


    constructor(game: IGame, name: string) {
        this.game = game;
        this.factory = game.getConsumerFactory()
        this.name = name;
        this.performer = new ScenePerformer(this)
    }

    getSceneObject(name: string): ISceneObject | undefined {
        if (this.objectMap.has(name)) return this.objectMap.get(name)
        return undefined
    }

    public addResource(resource: string): void {
        this.resources.push(resource)
    }

    public getResources(): string[] {
        return this.resources
    }

    protected resources: string[] = []

    protected game !: IGame

    protected factory !: IFactory

    protected performer !: ScenePerformer

    protected externalAction: IActionAddRemove = new ActionArray();

    protected internalAction: IActionAddRemove = new ActionArray();


    protected objects: IObject[] = []

    protected children: ISceneObject[] = []

    protected objectMap: Map<string, ISceneObject> = new Map()

    


    protected isStarted: boolean = false

    protected isLoaded: boolean = false

    getGame(): IGame {
        return this.game;
    }
    getObjectCollection(): IObject[] {
        return this.objects
    }

    getInternalAction(): IActionAddRemove {
        return this.internalAction
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
        return true
    }
    addAction(action: IAction, add: boolean): void {
        if (add) this.externalAction.addAction(action)
        else this.externalAction.removeAction(action)
    }
    loadItself(load: boolean): boolean {
        if (this.isLoaded == load) return false
        this.isLoaded = load
        this.performer.loadCollecion(load, this)
        return true
    }
    getChildernT(): ISceneObject[] {
        return this.children;
    }

    addChildT(child: ISceneObject): void {
        var b = this.performer.addUnique(this.children, child)
        if (b) {
            this.objects.push(child)
            var name = child.getName()
            if (!this.objectMap.has(name)) {
                this.objectMap.set(name, child)
            }
        }
    }

    removeChildT(child: ISceneObject): void {
        var b = this.performer.remove(this.children, child);
        if (b) {
            this.performer.remove(this.objects, child)
            var name = child.getName()
            if (this.objectMap.has(name)) this.objectMap.delete(name)
        }
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



    protected typeName: string = "AbstractScene";

    protected types: string[] = ["IObject", "IChildrenT<ISceneObject>", "ISelfLoad",
        "IAddAction", "SelfStart", "IObjectCollection", "IExternalAction",
        "IFactoryConsumer", "IScene", "AbstractScene"];

    protected name: string = "";


}