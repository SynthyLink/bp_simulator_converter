export interface IResourceCollection {
    addResource(url: string): void
    getResources(): string[]
}