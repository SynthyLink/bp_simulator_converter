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
;
const loadFunctions = {
    'text': (url) => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield fetch(url);
        let data = yield response.text();
        return data;
    }),
    'json': (url) => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield fetch(url);
        let data = yield response.json();
        return data;
    }),
    'image': (url) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let image = new Image();
            try {
                if ((new URL(url)).origin !== window.origin)
                    image.crossOrigin = "";
            }
            catch (_a) { }
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = url;
        });
    })
};
// This is helper class to fetch resources from the webserver
// Unlike C++, we can't block the main thread till files are read, so we use promises to notify the Game Class when the resources are ready
// This class is a work in progress so expect it to be enhanced in future labs
class Loader {
    constructor() {
        this.resources = {};
        this.promises = [];
    }
    load(resources) {
        for (let name in resources) {
            let resource = resources[name];
            let promise = loadFunctions[resource.type](resource.url)
                .then(data => {
                this.resources[name] = data;
                if (resource.success)
                    resource.success(name, data, resource, this);
            }).catch(reason => {
                console.error(`Failed to load ${name}: ${reason}`);
                if (resource.failure)
                    resource.failure(name, resource, this);
            });
            this.promises.push(promise);
        }
    }
    unload(...resources) {
        for (let name of resources) {
            delete this.resources[name];
        }
    }
    clear() {
        for (let name in this.resources) {
            delete this.resources[name];
        }
    }
    wait() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.promises.length > 0) {
                const awaited = [...this.promises];
                this.promises.splice(0, this.promises.length);
                yield Promise.all(awaited);
            }
        });
    }
}
exports.default = Loader;
//# sourceMappingURL=loader.js.map