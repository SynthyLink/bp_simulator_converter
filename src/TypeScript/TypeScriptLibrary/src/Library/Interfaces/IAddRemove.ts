import { IChildrenT } from "../NamedTree/Interfaces/IChildrenT";

export interface IAddRemove extends IChildrenT<any> {
    getAddRemoveType(): string;
}