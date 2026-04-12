export interface IFactory {
    getFactory<T>(typeName: string): T | undefined
}