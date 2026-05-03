import type { IFactory } from "../../Library/Interfaces/IFactory";
import type { IFactoryConsumer } from "../../Library/Interfaces/IFactoryConsumer";
import type { IObject } from "../../Library/Interfaces/IObject";
import { Performer } from "../../Library/Performer";
import { BasicScene } from "../BasicScene";
import Game from "../game";
import { ScadaScene } from "../ScadaScene";

export class BasicPrimitive implements IObject, IFactoryConsumer
{
    protected name: string = "";

    protected typeName: string = "BasicPrimitive";

    protected types: string[] = ["IObject", "IFactoryConsumer", "BasicPrimitive"];

    protected game ! : Game

    protected performer: Performer = new Performer()

    protected gl: WebGL2RenderingContext;

    protected factory: IFactory

    protected scene: ScadaScene

    protected isRunning: boolean = false;

    constructor(name: string, scene: ScadaScene) {
        this.name = name;
        this.scene = scene
        scene.addObjectToScene(this)
        this.game = scene.getGame();
        this.gl = scene.getGl()
    }
  
    setConsumerFactory(factory: IFactory): void
    {
        this.factory = factory
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