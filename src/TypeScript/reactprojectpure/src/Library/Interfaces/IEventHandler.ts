import { IChildrenT } from "../NamedTree/Interfaces/IChildrenT";
import { IEvent } from "./IEvent";

export interface IEventHandler extends IChildrenT<IEvent> {
    addEventToHandler(event: IEvent): void

}