import { IFuncT } from "../../Interfaces/IFuncT";
import { IResourceFunc } from "./IResourceFunc";

export interface IResourceFuncFactory extends IFuncT<IResourceFunc | undefined, 'text' | 'json' | 'image'> {

}