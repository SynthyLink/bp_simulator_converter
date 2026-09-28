import type { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import type { IAddAction } from "../../Interfaces/IAddAction";
import type { IExternalAction } from "../../Interfaces/IExternalAction";
import type { IFactoryConsumer } from "../../Interfaces/IFactoryConsumer";
import type { IObject } from "../../Interfaces/IObject";
import type { IObjectCollection } from "../../Interfaces/IObjectCollection";
import type { ISelfLoad } from "../../Interfaces/ISelfLoad";
import type { ISelfStart } from "../../Interfaces/ISelfStart";
import type { IChildrenT } from "../../NamedTree/Interfaces/IChildrenT";
import type { IGame } from "./IGame";
import type { ISceneObject } from "./ISceneObject";

export interface IScene extends IObjectCollection, IExternalAction, IFactoryConsumer,
    ISelfStart, IAddAction, ISelfLoad, 
    IChildrenT<ISceneObject>,  IObject
{

    getGame(): IGame

    getSceneObject(name: string): ISceneObject | undefined

    getInternalAction(): IActionAddRemove

}