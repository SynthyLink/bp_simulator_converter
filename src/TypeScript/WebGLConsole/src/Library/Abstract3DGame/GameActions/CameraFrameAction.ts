import { AbstractGameAction } from "../../Game/Abstract/AbstractGameAction";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";
import type { IScene } from "../../Game/Interfaces/IScene";
import type { IFactory } from "../../Interfaces/IFactory";
import type { IReferenceFrame } from "../../Motion6D/Interfaces/IReferenceFrame";
import type { ISceneHolder } from "../../Game/Interfaces/ISceneHolder";

export class CameraFrameAction extends AbstractGameAction implements ISceneHolder {

    constructor(camera: BasicCamera,
        frame: IReferenceFrame,
        scene: IScene,
        factory: IFactory) {
        super("", factory)
        this.types.push("ISceneHolder")
        this.types.push("CameraFrameAction")
        this.typeName = "CameraFrameAction"
        this.camera = camera
        this.frame = frame
        this.scene = scene
    }
    getHoldScene(): IScene {
        return this.scene;
    }

    action(): void {
        
    }
    isEmptyAction(): boolean {
        return false
    }

    camera !: BasicCamera
    frame !: IReferenceFrame
    scene !: IScene
}

