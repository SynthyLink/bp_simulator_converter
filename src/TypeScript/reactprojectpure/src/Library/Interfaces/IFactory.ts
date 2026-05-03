export interface IFactory {
    getFactory<T>(typeName: string): T | undefined
    addFactory<T>(t: T, type: string): void
}