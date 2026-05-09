import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import type { IPosition } from "../Motion6D/Interfaces/IPosition";
import type { IReferenceFrame } from "../Motion6D/Interfaces/IReferenceFrame";
import type { INodeT } from "../NamedTree/Interfaces/INodeT";

export class FictivePosition implements IPosition {
    getClassName(): string {
        throw new OwnNotImplemented();
    }
    imlplementsType(type: string): boolean {
        throw new OwnNotImplemented();
    }
    getName(): string {
        throw new OwnNotImplemented();
    } 
    getPosition(): number[] {
        throw new OwnNotImplemented();
    }
    getParentFrame(): IReferenceFrame | undefined {
        throw new OwnNotImplemented();
    }
    setParentFrame(parent: IReferenceFrame): void {
        throw new OwnNotImplemented();
    }
    getParameters() {
        throw new OwnNotImplemented();
    }
    setParameters(parameters: any): void {
        throw new OwnNotImplemented();
    }
    updateReferenceFrame(): void {
        throw new OwnNotImplemented();
    }
    getParentT(): INodeT<IPosition> | undefined {
        throw new OwnNotImplemented();
    }
    setParentT(parent: INodeT<IPosition>): void {
        throw new OwnNotImplemented();
    }
    getNodesT(): INodeT<IPosition>[] {
        throw new OwnNotImplemented();
    }
    addNodeT(node: INodeT<IPosition>): void {
        throw new OwnNotImplemented();
    }
    removeNodeT(node: INodeT<IPosition>): void {
        throw new OwnNotImplemented();
    }
    getNodeValueT(): IPosition {
        throw new OwnNotImplemented();
    }
}
