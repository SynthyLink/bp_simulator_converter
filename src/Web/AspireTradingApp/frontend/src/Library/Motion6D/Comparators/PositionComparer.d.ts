import type { IComparator } from "../../Utilities/Sort/Interfaces/IComparator";
import type { IPosition } from "../Interfaces/IPosition";
export declare class PositionComparer implements IComparator<IPosition> {
    compare(x: IPosition, y: IPosition): number;
    isSource(source: IPosition, target: IPosition): boolean;
}
//# sourceMappingURL=PositionComparer.d.ts.map