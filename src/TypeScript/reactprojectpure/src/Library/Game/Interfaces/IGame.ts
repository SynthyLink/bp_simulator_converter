import type { IAddAction } from "../../Interfaces/IAddAction"
import { IExternalAction } from "../../Interfaces/IExternalAction"
import type { IFactoryConsumer } from "../../Interfaces/IFactoryConsumer"
import type { IObject } from "../../Interfaces/IObject"
import type { IObjectCollection } from "../../Interfaces/IObjectCollection"
import type { ISelfLoad } from "../../Interfaces/ISelfLoad"
import type { ISelfStart } from "../../Interfaces/ISelfStart"
import type { IChildrenT } from "../../NamedTree/Interfaces/IChildrenT"
import type { IScene } from "./IScene"

export interface IGame extends IObjectCollection,
    ISelfStart, IAddAction, ISelfLoad, IFactoryConsumer, IExternalAction,
    IChildrenT<IScene>, IObject {

    getScenes(): Map<string, IScene>

    addScene(name: string, scene: IScene): void


    cycle(time: number): void

    run() : void

}
