export class ResourceItem {
    constructor(name: string, url: string, type: string) {
        this.name = name
        this.url = url
        this.type = type
    }

    name: string = ""
    url: string = ""
    type: string = ""

    public getName(): string {
        return this.name;
    }
    public getUrl(): string {
        return this.url;
    }
    public getType(): string {
        return this.type;
    }
}