import { IObject } from "../../Interfaces/IObject";
import { GamePerformer } from "../GamePerformer";

export class EmptyGameObject implements IObject
{

    protected performer: GamePerformer = new GamePerformer()
    constructor(name: string) {
        this.name = name
    }

    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected typeName: string = "EmptyGameObject"

    protected types: string[] = ["IObject", "EmptyGameObject"]

    protected name: string = ""


}