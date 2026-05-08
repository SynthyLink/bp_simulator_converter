import { EmptyObject } from "../../EmptyObject";
import { GamePerformer } from "../../Game/GamePerformer";
import { IScene } from "../../Game/Interfaces/IScene";
import { IReferenceFrame } from "../../Motion6D/Interfaces/IReferenceFrame";
import { IFindFrame } from "../Interfaces/IFindFrame";


export abstract class AbstractFindFrame extends EmptyObject implements IFindFrame {
    abstract functT(s: IScene): IReferenceFrame | undefined;

    protected performer: GamePerformer = new GamePerformer()

    constructor(name: string) {
        super(name)
        this.types.push("IFindFrame")
        this.types.push("AbstractFindFrame")
        this.typeName = "AbstractFindFrame"
    }

}
