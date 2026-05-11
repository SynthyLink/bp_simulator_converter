import { AbstractActionT } from "../Event/Objects/AbstractActionT";
import type { IShowData } from "./Interfaces/IShowData";

export class ConsoleShowObject extends AbstractActionT<IShowData> {
    actionT(t: IShowData): void {
        console.log("Name ", t.name)
        console.log("Object ", t.show)
    }
     
}