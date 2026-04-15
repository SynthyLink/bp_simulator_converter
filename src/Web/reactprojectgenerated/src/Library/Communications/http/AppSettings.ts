let server = 'http://localhost:5218';

export function setCommunicationServer(s: string): void
{
    server = s;
}

export const webAPIUrl = () => {
    return `${server}/api`;
}

