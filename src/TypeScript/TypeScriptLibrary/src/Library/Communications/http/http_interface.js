"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCommunication = void 0;
const AppSettings_1 = require("./AppSettings");
class HttpCommunication {
    http_cancel(config, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Request(`${AppSettings_1.webAPIUrl}${config.path}`, {
                method: config.method || 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: config.body ? JSON.stringify(config.body) : undefined,
            });
            if (config.accessToken) {
                request.headers.set('authorization', `bearer ${config.accessToken}`);
            }
            const signal = controller.signal;
            const response = yield fetch(request, { signal });
            if (response.ok) {
                const body = yield response.json();
                return { ok: response.ok, body };
            }
            else {
                yield this.logError(request, response);
                return { ok: response.ok };
            }
        });
    }
    http(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Request(`${AppSettings_1.webAPIUrl}${config.path}`, {
                method: config.method || 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: config.body ? JSON.stringify(config.body) : undefined,
            });
            if (config.accessToken) {
                request.headers.set('authorization', `bearer ${config.accessToken}`);
            }
            const response = yield fetch(request);
            if (response.ok) {
                const body = yield response.json();
                return { ok: response.ok, body };
            }
            else {
                yield this.logError(request, response);
                return { ok: response.ok };
            }
        });
    }
    ;
    logError(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentType = response.headers.get('content-type');
            let body;
            if (contentType && contentType.indexOf('application/json') !== -1) {
                body = yield response.json();
            }
            else {
                body = yield response.text();
            }
            console.error(`Error requesting ${request.method} ${request.url}`, body);
        });
    }
    ;
    setPerformer(performer) {
        this.performer = performer;
    }
    getPerformer() {
        return this.performer;
    }
}
exports.HttpCommunication = HttpCommunication;
//# sourceMappingURL=http_interface.js.map