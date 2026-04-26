import { EmptyObject } from "../../EmptyObject";
import { IReferenceFrame } from "../../Motion6D/Interfaces/IReferenceFrame";
import { GamePerformer } from "../GamePerformer";
import { IScene } from "../Interfaces/IScene";
import { IFindFrame } from "./Interfaces/IFindFrame";


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
