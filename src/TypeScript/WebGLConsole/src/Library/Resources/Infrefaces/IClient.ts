export interface IClient {
    fetch(url: string) : Promise<Response>
}