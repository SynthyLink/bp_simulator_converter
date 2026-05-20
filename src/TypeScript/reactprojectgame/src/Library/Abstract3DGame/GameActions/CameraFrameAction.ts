import { AbstractGameAction } from "../../Game/Abstract/AbstractGameAction";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";
import type { IScene } from "../../Game/Interfaces/IScene";
import type { IFactory } from "../../Interfaces/IFactory";
import type { IReferenceFrame } from "../../Motion6D/Interfaces/IReferenceFrame";

export class CameraFrameAction extends AbstractGameAction {

    constructor(camera: BasicCamera,
        frame: IReferenceFrame,
        scene: IScene,
        factory: IFactory) {
        super("", factory)
        this.camera = camera
        this.frame = frame
        this.scene = scene
    }

    action(): void {
        throw new Error("Method not implemented.");
    }
    isEmptyAction(): boolean {
        throw new Error("Method not implemented.");
    }

    camera !: BasicCamera
    frame !: IReferenceFrame
    scene !: IScene
}



class RotationFrameAction extends AbstractGameAction  {
    action(): void {
        throw new Error("Method not implemented.");
    }
    isEmptyAction(): boolean {
        throw new Error("Method not implemented.");
    }

}