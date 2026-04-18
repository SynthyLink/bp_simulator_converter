import { IImageDetector } from "./IImageDetector";

export interface IImageDetectorFactory {
    createImageDetector(object: any): IImageDetector
}