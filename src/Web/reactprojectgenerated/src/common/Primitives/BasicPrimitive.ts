import { IObject } from "../../Library/Interfaces/IObject";
import { Performer } from "../../Library/Performer";
import { BasicScene } from "../BasicScene";
import Game from "../game";

export class BasicPrimitive implements IObject
{
    protected name: string = "";

    protected typeName: string = "BasicPrimitive";

    protected types: string[] = ["IObject", "BasicPrimitive"];

    protected game ! : Game

    protected performer: Performer = new Performer()

    constructor(name: string, scene: BasicScene) {
        this.name = name;
        scene.addObjectToScene(this)
        this.game = scene.getGame();
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }
 
    getName(): string {
        return this.name;
    }

}