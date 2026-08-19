export interface ResourceInformation {
    url: string;
    type: 'text' | 'json' | 'image';
    success?: (name: string, data: any, resource: ResourceInformation, loader: Loader) => void;
    failure?: (name: string, resource: ResourceInformation, loader: Loader) => void;
}
export default class Loader {
    resources: {
        [name: string]: any;
    };
    promises: Promise<void>[];
    constructor();
    loadMap(resources: Map<string, ResourceInformation>): void;
    load(resources: {
        [name: string]: ResourceInformation;
    }): void;
    unload(...resources: string[]): void;
    clear(): void;
    wait(): Promise<void>;
    result: Map<string, any>;
    getResult(): Map<string, any>;
}
//# sourceMappingURL=Loader.d.ts.map