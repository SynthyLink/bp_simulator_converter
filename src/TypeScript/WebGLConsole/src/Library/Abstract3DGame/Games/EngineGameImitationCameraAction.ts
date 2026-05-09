import { EngineGame } from "../../Game/Abstract/EngineGame";
import { IGameActionConverter } from "../../Game/Interfaces/IGameActionConverter";
import { IGameActionConverterFactory } from "../../Game/Interfaces/IGameActionConverterFactory";
import { IScene } from "../../Game/Interfaces/IScene";
import { IAction } from "../../Interfaces/IAction";
import { IFactory } from "../../Interfaces/IFactory";
import { IPlayEngine } from "../../Interfaces/IPlayEngine";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";
import { IFindCamera } from "../Interfaces/IFindCamera";
import { DrawMeshGameCameraAcionConverter } from "../Objects/DrawMeshGameCameraAcionConverter";

export class EngineGameImitationCameraAction extends EngineGame implements
    IGameActionConverterFactory {

    constructor(name: string, factory: IFactory, engine: IPlayEngine) {
        super(name, factory, engine)
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

    }

    camera !: BasicCamera

    findCamera !: IFindCamera

}