import type { IScene } from "../../Game/Interfaces/IScene";
import type { IFindFrame } from "../Interfaces/IFindFrame";
import type { IFactory } from "../../Interfaces/IFactory";
import type { IFindCamera } from "../Interfaces/IFindCamera";
import type { IGameAction } from "../../Game/Interfaces/IGameAction";
import { AbstracSceneAction } from "../../Game/Abstract/AbstracSceneActionFactory";
import { CameraFrameAction } from "./CameraFrameAction";

export class ReferenceFrameSceneAction extends AbstracSceneAction {
    constructor(find: IFindFrame,  findCamera : IFindCamera, factory: IFactory | undefined) {
        super(factory)
        this.typeName = "ReferenceFrameGameSceneActionFactory"
        this.types.push("IGameSceneAction")
        this.types.push("ReferenceFrameGameSceneActionFactory")
        this.find = find;
        this.findCamera = findCamera
    }
    functT(s: IScene): IGameAction | undefined {
        let frame = this.find.functT(s)
        let camera = this.findCamera.functT(s)
        if (camera != undefined)
            if (frame != undefined) {
                let l = new CameraFrameAction(camera, frame, s, this.factory)
                return l
            }
        return undefined
    }
 

    find !: IFindFrame
    findCamera !: IFindCamera

}