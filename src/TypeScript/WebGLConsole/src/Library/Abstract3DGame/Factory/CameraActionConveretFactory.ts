import { AbstractGameAcionConverterFactory } from "../../Game/GameActions/AbstractGameAcionConverterFactory";
import { IGame } from "../../Game/Interfaces/IGame";
import { IGameAcionConverter } from "../../Game/Interfaces/IGameAcionConverter";
import { IScene } from "../../Game/Interfaces/IScene";
import { ISceneObject } from "../../Game/Interfaces/ISceneObject";
import { IFactory } from "../../Interfaces/IFactory";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";
import { IScadaConsumer } from "../../Scada/Interfaces/IScadaConsumer";
import { ICameraMeshDrawing } from "../GameActions/Interfaces/ICameraMeshDrawing";

export class CameraActionConveretFactory extends AbstractGameAcionConverterFactory implements ISceneObject
{
    constructor(camera: string, drawing: ICameraMeshDrawing) {
        super()
        this.cameraName = camera
        this.drawing = drawing;
    }

    getScene(): IScene {
        return this.scene
    }
    setScene(scene: IScene): void {
        this.scene = scene
        var sc = scene as unknown as IScadaConsumer;
        var scada = sc.getConsumerScada()
        var ob = scada.getScadaObject<BasicCamera>(this.cameraName, "BasicCamera")
        if (ob.length > 0) {
            this.camera = ob[0]
        }
    }
    setConsumerFactory(factory: IFactory): void {
        this.factory = factory
    }
    getConsumerFactory(): IFactory {
        return this.factory
    }
    getGameAcionConverter(game: IGame): IGameAcionConverter | undefined {
        if (this.camera == undefined) return undefined
        return this.drawing.functT(this.camera)
    }

    protected cameraName: string = ""

    protected factory !: IFactory

    protected camera !: BasicCamera

    protected scene !: IScene

    drawing !: ICameraMeshDrawing

}