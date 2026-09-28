import { IFactory } from "../../Library/Interfaces/IFactory";
import { IFactoryConsumer } from "../../Library/Interfaces/IFactoryConsumer";
import { IObject } from "../../Library/Interfaces/IObject";
import { Performer } from "../../Library/Performer";
import { BasicScene } from "../BasicScene";
import Game from "../game";

export class BasicPrimitive implements IObject, IFactoryConsumer
{
    protected name: string = "";

    protected typeName: string = "BasicPrimitive";

    protected types: string[] = ["IObject", "BasicPrimitive"];

    protected game ! : Game

    protected performer: Performer = new Performer()

    protected gl: WebGL2RenderingContext;

    protected factory: IFactory

    constructor(name: string, scene: BasicScene) {
        this.name = name;
        scene.addObjectToScene(this)
        this.game = scene.getGame();
        this.gl = scene.getGl()
    }
    setConsumerFactory(facrory: IFactory): void {
        this.factory = facrory
    }
    getConsumerFactory(): IFactory {
        return this.factory
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