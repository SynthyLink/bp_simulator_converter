import type { IStepAction } from "./ISterpAction";

export interface IStepActionHolder {
    getStepAction(): IStepAction | undefined
}