import type { IPosition } from "../Interfaces/IPosition";
import type { IReferenceFrame } from "../Interfaces/IReferenceFrame";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { INodeT } from "../../NamedTree/Interfaces/INodeT";
import { ReferenceFrame } from "../ReferenceFrame";
import { CategoryObject } from "../../CategoryObject";
import { Performer } from "../../Performer";
export declare class BasicPosition extends CategoryObject implements IPosition {
    protected position: number[];
    protected own: number[];
    protected parent: IReferenceFrame | undefined;
    protected parentNode: INodeT<IPosition> | undefined;
    protected parameters: any;
    protected performer: Performer;
    constructor(desktop: IDesktop, name: string);
    getPosition(): number[];
    getParentFrame(): IReferenceFrame | undefined;
    setParentFrame(parent: IReferenceFrame): void;
    getParameters(): any;
    setParameters(parameters: any): void;
    updateReferenceFrame(): void;
    getParentT(): INodeT<IPosition> | undefined;
    setParentT(parent: INodeT<IPosition>): void;
    getNodesT(): INodeT<IPosition>[];
    addNodeT(node: INodeT<IPosition>): void;
    removeNodeT(node: INodeT<IPosition>): void;
    getNodeValueT(): IPosition;
    current: INodeT<IPosition>;
    nodes: INodeT<IPosition>[];
    protected udateFrameProtected(frame: ReferenceFrame): void;
    protected getBaseFrame(): ReferenceFrame | undefined;
}
//# sourceMappingURL=BasicPosition.d.ts.map