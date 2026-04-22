import { IIODirectory } from "./IIODirectory";

export interface IIODirectoryFactory {
    createDirectoryFactory(object: any): IIODirectory
}