import { IVisible } from "./IVisible"

export interface IVisibleConsumer {
    addVisible(visible: IVisible): void
    removeVisible(visible: IVisible): void
    postVisible(visible: IVisible): void
}