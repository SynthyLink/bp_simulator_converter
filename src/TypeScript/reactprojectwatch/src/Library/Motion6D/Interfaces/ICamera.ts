import { CameraType } from "./CameraType";

export interface ICamera {
    getCameraType(): CameraType
    getFieldOfView(): number
    getNearDistance(): number
    getFarDistance(): number

}