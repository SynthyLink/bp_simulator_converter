import { IAction } from "../Interfaces/IAction";
import { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import { ITimer } from "../Interfaces/ITimer";
import { Performer } from "../Performer";
import { TimeSpan } from "../Utilities/DateTime/TimeSpan";
import { ActionArray } from "../Utilities/Generic/ActionArray";

export class DelayTimer implements ITimer
{
    getTimerTimeSpan(): TimeSpan {
        return this.span;
    }
    isTimerEnabled(): boolean {
        return this.isEnabled;
    }
    async setTimerEnabled(enabled: boolean): Promise<void> {
        if (this.isEnabled == enabled) {
            return;
        }
        this.isEnabled = enabled;
        this.delta = this.span.milliseconds
        await this.run();
    }
    getTimerEvent(): IActionAddRemove {
        return this.actionS;
    }

    isEnabled: boolean = false;

    async run(): Promise<void> {
        while (true) {
            if (!this.isEnabled) {
                return;
            }
            var a = new Act(this.actionS, this.delta)
            await a.run()
        }
    }


    async cycle(): Promise<void> {
        
    }

    actionS: ActionArray = new ActionArray();


    performer: Performer = new Performer()

    span: TimeSpan = new TimeSpan(0);

    delta: number = 0;


}

class Act {
    constructor(action: IAction, delay: number) {
        this.action = action;
        this.delay = delay;
    }

    public async run(): Promise<void> {
        setTimeout(() => { this.action.action() }, this.delay)
    }

    action !: IAction
    delay: number = 0;
}