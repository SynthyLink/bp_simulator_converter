let server = 'http://localhost:5218';

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

