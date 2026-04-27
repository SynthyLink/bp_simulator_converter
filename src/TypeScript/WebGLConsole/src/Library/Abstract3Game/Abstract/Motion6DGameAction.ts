import { AbstractGameAction } from "../../Game/Abstract/AbstractGameAction";
import { Motion6DPerformer } from "../../Motion6D/Motion6DPerformer";

export abstract class Motion6DGameAction extends AbstractGameAction {
    protected performer: Motion6DPerformer = new Motion6DPerformer()
    constructor() {
        super()
        this.typeName = "Motion6DGameAction"
        this.types.push("Motion6DGameAction")
    }
}
 