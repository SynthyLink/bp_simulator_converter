import type { INodeT } from "../../NamedTree/Interfaces/INodeT";
import { EffectTexture } from "../EffectTexture";
import type { IGeometry } from "./IGeometry";

export interface IMesh extends IGeometry, INodeT<IMesh> {

    getAbsoluteVertices(): number[][]

    getEffect(): EffectTexture

    calculateAbsolute() : void

}