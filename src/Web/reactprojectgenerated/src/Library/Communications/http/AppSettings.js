"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webAPIUrl = void 0;
exports.setCommunicationServer = setCommunicationServer;
let server = 'http://localhost:5218';
function setCommunicationServer(s) {
    //   console.log("1 ",server);
    server = s;
    //    console.log("2 ", server);
}
const webAPIUrl = () => {
    //  console.log("3 ", server);
    return `${server}/api`;
};
exports.webAPIUrl = webAPIUrl;
//# sourceMappingURL=AppSettings.js.map