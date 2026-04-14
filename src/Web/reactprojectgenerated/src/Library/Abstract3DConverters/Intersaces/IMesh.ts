import { INodeT } from "../../NamedTree/Interfaces/INodeT";
import { Effect } from "../Effect";
import { IGeometry } from "./IGeometry";

export interface IMesh extends IGeometry, INodeT<IMesh> {

    getAbsoluteVertices(): number[]

    getEffect(): Effect

    calculateAbsolute() : void

}