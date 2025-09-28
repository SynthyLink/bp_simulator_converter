import { fileURLToPath, URL } from 'node:url';

import { setCommunicationServer } from "./src/Library/Communications/http/AppSettings"



const t = (): string => {
    setCommunicationServer("http://localhost:5218");
    return "";
}

export const getTarget = (): string =>  t();

// https://vitejs.dev/config/
