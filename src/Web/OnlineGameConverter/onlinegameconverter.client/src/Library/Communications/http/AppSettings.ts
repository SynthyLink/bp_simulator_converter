let server = 'https://localhost:7168';
//server = 'http://31.10.82.229:5218';
server = 'https://31.10.82.229:7168';

export function setCommunicationServer(s: string): void
{
 //   console.log("1 ",server);
    server = s;
//    console.log("2 ", server);
}

export const webAPIUrl = () => {
  //  console.log("3 ", server);
    return `${server}/api`;
}

