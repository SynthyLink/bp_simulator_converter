import { EngineGame } from "../../Game/Abstract/EngineGame";
import { IFactory } from "../../Interfaces/IFactory";

export class EngineGameImitation extends EngineGame {
    constructor(name: string, factory: IFactory) {
        super(name, factory)
        this.types.push("EnigneGameImitation")
        this.typeName = "EnigneGameImitation"
    }

    protected steps: number = 0;

    protected step: number = 0;

    protected begin: number = 0;

    public setImitation(steps: number, step: number, begin: number): void {
        this.steps = steps
        this.step = step
        this.begin = begin
    }

    run(): void {
        let a = 0
        for (var i = 0; i < this.steps; i++) {
            this.cycle(i * this.step + this.begin)
        }
    }

}