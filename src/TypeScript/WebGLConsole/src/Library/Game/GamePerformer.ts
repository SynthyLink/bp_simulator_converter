import { IScene } from "../Game/Interfaces/IScene"
import { IFactory } from "../Interfaces/IFactory"
import { IObject } from "../Interfaces/IObject"
import { Performer } from "../Performer"
import { IScadaConsumer } from "../Scada/Interfaces/IScadaConsumer"
import { IScadaInterface } from "../Scada/Interfaces/IScadaInterface"
import { IGame } from "./Interfaces/IGame"
import { IGameAcionConverter } from "./Interfaces/IGameAcionConverter"
import { IGameAcionConverterFactory } from "./Interfaces/IGameAcionConverterFactory"
import { ISceneObject } from "./Interfaces/ISceneObject"

export class GamePerformer extends Performer {
    public sceneToScada(scene: IScene): IScadaInterface | undefined {
        var sh = this.convertObject<IScadaConsumer, IScene>(scene, "IScadaConsumer")
        if (sh.length == 0) return undefined
        return sh[0].getConsumerScada()
    }
/*
    public getGameAcionConverterFactory(factory: IFactory, object: IObject): IGameAcionConverter | undefined {
        var f = factory.getFactory<IGameAcionConverterFactory>("IGameAcionConverterFactory")
        if (f === undefined) return undefined
        var game: IGame
        var d = this.convertObject<IGame, IObject>(object, "IGame")
        if (d.length > 0) return f.getGameAcionConverter(d[0])
        var s = this.convertObject<IScene, IObject>(object, "IScene")
        if (s.length > 0) return f.getGameAcionConverter(s[0].getGame())
        var o = this.convertObject<ISceneObject, IObject>(object, "ISceneObject")
        if (o.length > 0) return f.getGameAcionConverter(o[0].getScene().getGame())
        return undefined
    }*/
}