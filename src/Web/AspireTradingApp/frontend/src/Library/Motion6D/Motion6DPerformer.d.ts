import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IObjectCollection } from "../Interfaces/IObjectCollection";
import { SortingAlgorithms } from "../Utilities/Sort/SortingAlgorithms";
import type { IPosition } from "./Interfaces/IPosition";
import { Motion6DFrame } from "./Motion6DFrame";
import { ReferenceFrame } from "./ReferenceFrame";
export declare class Motion6DPerformer {
    constructor();
    static baseFrame: Motion6DFrame;
    getBaseFrame(): ReferenceFrame;
    private performer;
    private comparer;
    protected sorting: SortingAlgorithms;
    getOwnFrame(position: IPosition): ReferenceFrame | undefined;
    createUpdateFramesAction(collection: IObjectCollection): IActionAddRemove;
    getFrame(position: IPosition): ReferenceFrame | undefined;
    getParentOwn(position: IPosition): ReferenceFrame | undefined;
    getParentFrame(position: IPosition): ReferenceFrame | undefined;
    getRelative(baseFrame: ReferenceFrame, relative: ReferenceFrame): ReferenceFrame;
    getRelativeFrame(baseFrame: ReferenceFrame, targetFrame: ReferenceFrame, relative: ReferenceFrame): void;
}
//# sourceMappingURL=Motion6DPerformer.d.ts.map