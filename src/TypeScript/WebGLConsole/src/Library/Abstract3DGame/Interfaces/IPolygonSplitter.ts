import { Polygon } from "../../Abstract3DConverters/Points/Polygon";

export interface IPolygonSplitter {
    splitPolygon(polygon: Polygon): Polygon
}