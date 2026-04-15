import { Effect } from "../Effect";
import { IMesh } from "./IMesh";

export interface IMeshCreator {
    /// <summary>
    /// Directory
    /// </summary>
    getURL(): string

    /// <summary>
    /// Loads itself
    /// </summary>
    /// <param name="obj">Object</param>
    load(obj): void;

    /// <summary>
    /// Meshes
    /// </summary>
    getMeshes(): IMesh[]

    /// <summary>
    /// Effects
    /// </summary>
    getEffects(): Map<string, Effect>
}
