import { EngineGame } from "../../Game/Abstract/EngineGame";
import type { IGameActionConverter } from "../../Game/Interfaces/IGameActionConverter";
import type { IGameActionConverterFactory } from "../../Game/Interfaces/IGameActionConverterFactory";
import type { IScene } from "../../Game/Interfaces/IScene";
import type { IAction } from "../../Interfaces/IAction";
import type { IFactory } from "../../Interfaces/IFactory";
import type { IPlayEngine } from "../../Interfaces/IPlayEngine";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";
import type { IFindCamera } from "../Interfaces/IFindCamera";
import { DrawMeshGameCameraAcionConverter } from "../Objects/DrawMeshGameCameraAcionConverter";

export class EngineGameCameraAction extends EngineGame implements
    IGameActionConverterFactory {

    constructor(name: string, factory: IFactory, engine: IPlayEngine, useLoader: boolean) {
        super(name, factory, engine, false)
        this.types.push("IGameActionConverterFactory")
        this.types.push("IGameActionConverter")
        this.types.push("EngineGameImitationCameraAction")
        factory.addFactory(this, "IGameActionConverterFactory")
        var fc = factory.getFactory<IFindCamera>("IFindCamera")
        if (fc != undefined) {
            this.findCamera = fc;
        }

    }

    functT(s: IAction): IAction | undefined {
        return s;
    }

    getGameActionConverter(object: any): IGameActionConverter | undefined {
        var scene = object as unknown as IScene;
        if (scene == undefined) {
            return undefined
        }
        let camera = this.findCamera.functT(scene)
        if (camera == undefined) {
            return undefined
        }
        return new DrawMeshGameCameraAcionConverter(camera)
        
    }

    public getGameActionConverterCamera(camera: BasicCamera) {
        console.log(camera)

    }

    camera !: BasicCamera

    findCamera !: IFindCamera

}