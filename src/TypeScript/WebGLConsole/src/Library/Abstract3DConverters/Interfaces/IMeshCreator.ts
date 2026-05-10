import type { IFactory } from "../../Interfaces/IFactory";
import type { IObject } from "../../Interfaces/IObject";
import { IUrlObject } from "../../IO/Interfaces/IUrlObject";
import { EffectTexture } from "../EffectTexture";
import type { IMesh } from "./IMesh";


export interface IMeshCreator extends IObject, IUrlObject {


    /// <summary>
    /// Loads itself
    /// </summary>
    /// <param name="obj">Object</param>
    loadMeshCreator(): void;

    /// <summary>
    /// Meshes
    /// </summary>
    getMeshCreatorMeshes(): IMesh[]

    /// <summary>
    /// Effects
    /// </summary>
    getMeshCreatorEffects(): Map<string, EffectTexture>

    ///Gets the facrory
    getMeshCreatorFactory(): IFactory

    getMeshCreatorGenerator(): any

    getMeshCreatorDirectory(): string

}
