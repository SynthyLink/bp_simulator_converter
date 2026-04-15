"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webAPIUrl = void 0;
exports.setCommunicationServer = setCommunicationServer;
let server = 'http://localhost:5218';
function setCommunicationServer(s) {
    server = s;
}
const webAPIUrl = () => {
    return `${server}/api`;
};
exports.webAPIUrl = webAPIUrl;
//# sourceMappingURL=AppSettings.js.map