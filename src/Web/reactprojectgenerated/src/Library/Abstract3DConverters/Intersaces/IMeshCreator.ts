import { IMesh } from "./IMesh";

export interface IMeshCreator {
    createMesh(game: any, url: string): IMesh
}