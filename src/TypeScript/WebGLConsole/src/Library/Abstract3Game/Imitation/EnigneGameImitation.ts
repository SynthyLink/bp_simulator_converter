import { EngineGame } from "../Abstract/EngineGame";

export class EnigneGameImitation extends EngineGame {

    protected steps: number = 0;

    protected step: number = 0;

    protected begin: number = 0;

    public setImitation(steps: number, step: number, begin: number): void {
        this.steps = step
        this.step = step
        this.begin = begin
    }


    run(): void {
        for (var i = 0; i < this.steps; i++) {
            this.cycle(i * this.step + this.begin)
        }
    }

}