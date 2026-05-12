import { AbstractActionT } from "../Event/Objects/AbstractActionT";
import type { IShowData } from "./Interfaces/IShowData";

export class ConsoleShowObject extends AbstractActionT<IShowData> {
    actionT(t: IShowData): void {
        ++this.i
        console.log("\n")
        console.log("Name ", t.name)
        console.log("Object ", t.show)
        console.log("Sender ", t.sender)
        console.log("Number ", this.i)
        console.log("\n")
 }

    i: number = 0
}