import { IScene } from "../Game/Interfaces/IScene"
import { Performer } from "../Performer"
import { IScadaConsumer } from "../Scada/Interfaces/IScadaConsumer"
import { IScadaInterface } from "../Scada/Interfaces/IScadaInterface"

export class GamePerformer extends Performer {
    public sceneToScada(scene: IScene): IScadaInterface | undefined {
        var sh = this.convertObject<IScadaConsumer, IScene>(scene, "IScadaConsumer")
        if (sh.length == 0) return undefined
        return sh[0].getConsumerScada()
    }

}