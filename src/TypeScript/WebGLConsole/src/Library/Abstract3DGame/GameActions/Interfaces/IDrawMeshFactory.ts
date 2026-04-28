import { IGame } from "../../../Game/Interfaces/IGame";
import { IDrawMesh } from "./IDrawMesh";

export interface IDrawMeshFactory {
    getDrawMesh(game: IGame, name: string): IDrawMesh
}