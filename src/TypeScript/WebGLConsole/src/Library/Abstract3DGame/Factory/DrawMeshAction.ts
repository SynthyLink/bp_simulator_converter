import { IMesh } from "../../Abstract3DConverters/Interfaces/IMesh";
import { EmptyGameObject } from "../../Game/Abstract/EmptyGameObject";
import { IAction } from "../../Interfaces/IAction";
import { ReferenceFrame } from "../../Motion6D/ReferenceFrame";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";

export class DrawMeshAction extends EmptyGameObject implements IAction {
    constructor(camera: BasicCamera, mesh: IMesh, frame: ReferenceFrame) {
        super("")
        this.types.push("IAction")
        this.types.push("DrawMeshAction")
        this.camera = camera
        this.mesh = mesh
        this.frame = frame
        this.near = camera.getNearDistance()
        this.far = camera.getFarDistance()
        this.field = camera.getFieldOfView()

    }
    action(): void {
        throw new Error("Method not implemented.");
    }

    isEmptyAction(): boolean {
        return false
    }

    protected camera !: BasicCamera
    protected mesh!: IMesh
    protected frame!: ReferenceFrame

    protected near: number = 0

    protected far: number = 0

    protected field: number = 0

}