import { IAction } from "../../Interfaces/IAction";
import { IMesh } from "./IMesh";

export interface IMeshAction {
    mesh: IMesh[]; matrix: number[][]; action : IAction | undefined
};
