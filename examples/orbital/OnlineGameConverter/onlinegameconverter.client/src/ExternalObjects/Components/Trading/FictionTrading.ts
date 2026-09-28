import { CategoryObject } from "../../../Library/CategoryObject";
import { IDesktop } from "../../../Library/Interfaces/IDesktop";
import { IInitializeTask } from "../../../Library/Interfaces/IInitializeTask";

export class FictionTrading extends CategoryObject implements IInitializeTask {
    async initializeTaskAsync(controller: AbortController): Promise<void> {
        
    }
    constructor(desktop: IDesktop, name: string) {
        super(desktop, name)
        this.typeName = "FictionTrading"
        this.types.push("FictionTrading");
        this.types.push("IInitializeTask");
      }
}