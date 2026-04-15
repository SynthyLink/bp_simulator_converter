export class Image {

    constructor(url: string) {
        this.url = url
    }

    public getUrl(): string {
        return this.url
    }

    url: string = "";
}