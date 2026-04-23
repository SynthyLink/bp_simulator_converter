import { IAction } from "../../Interfaces/IAction"
import { IObjectCollection } from "../../Interfaces/IObjectCollection"
import { IPlayEngine } from "../../Interfaces/IPlayEngine"
import { IFile } from "../../IO/Interfaces/IFile"
import { IIODirectory } from "../../IO/Interfaces/IIODirectory"
import { IScene } from "./IScene"

export interface IGame extends IFile, IIODirectory, IObjectCollection,
    IPlayEngine
{

    load(b: boolean): void

    start(b: boolean): void 

    addUpdate(update: IAction, add: boolean): void

    getScenes(): { [name: string]: IScene }

}
