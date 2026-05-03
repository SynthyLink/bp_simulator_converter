export class ImageTexture {

    constructor(url: string, directory: string) {
        this.url = url
        this.directory = directory
    }

    public getUrl(): string {
        return this.url
    }

    url: string = "";

    directory: string = ""
}