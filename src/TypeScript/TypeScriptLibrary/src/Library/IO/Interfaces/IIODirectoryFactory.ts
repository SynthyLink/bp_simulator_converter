import { IIODirectory } from "./IIODirectory";

export interface IIODirectoryFactory {
    createDirectoryFacrory(object: any): IIODirectory
}