import { INodeT } from "../../NamedTree/Interfaces/INodeT";
import { EffectTexture } from "../EffectTexture";
import { IGeometry } from "./IGeometry";

export interface IMesh extends IGeometry, INodeT<IMesh> {

    getAbsoluteVertices(): number[][]

    getEffect(): EffectTexture

    calculateAbsolute() : void

}