import { IObject } from "../../Interfaces/IObject"
import { INamed } from "../../NamedTree/Interfaces/INamed"

export interface IGeometry extends INamed, IObject {

    getVertices(): number[]
    getNormals(): number[]
    getTextures(): number[]
    getTransformationMatrix(): number[]

}