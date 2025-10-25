import { setCommunicationServer, webAPIUrl } from "./Library/Communications/http/AppSettings";
import { server } from "./RemoteServer";

export default async function setServer(): Promise<void> {

    const request = new Request(`${webAPIUrl()}$testconnection`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        body:  undefined,
    });
    const response = await fetch(request);
    if (!response.ok) {
        setCommunicationServer(server());
    }
    
}