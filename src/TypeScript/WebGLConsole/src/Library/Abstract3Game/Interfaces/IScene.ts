import { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import { IAddAction } from "../../Interfaces/IAddAction";
import { IExternalAction } from "../../Interfaces/IExternalAction";
import { IFactoryConsumer } from "../../Interfaces/IFactoryConsumer";
import { IObject } from "../../Interfaces/IObject";
import { IObjectCollection } from "../../Interfaces/IObjectCollection";
import { ISelfLoad } from "../../Interfaces/ISelfLoad";
import { ISelfStart } from "../../Interfaces/ISelfStart";
import { IChildrenT } from "../../NamedTree/Interfaces/IChildrenT";
import { ResourceItem } from "../../Web/ResourceItem";
import { IGame } from "./IGame";
import { ISceneObject } from "./ISceneObject";

export interface IScene extends IObjectCollection, IExternalAction, IFactoryConsumer,
ISelfStart, IAddAction, ISelfLoad,
    IChildrenT<ISceneObject>, IObject
{

    getGame(): IGame

    getSceneObject(name: string): ISceneObject | undefined

    getInternalAction(): IActionAddRemove

}