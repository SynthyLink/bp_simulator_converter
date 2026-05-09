"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const loadFunctions = {
    'text': async (url) => {
        let response = await fetch(url);
        let data = await response.text();
        return data;
    },
    'json': async (url) => {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    },
    'image': async (url) => {
        return new Promise((resolve, reject) => {
            let image = new Image();
            try {
                if ((new URL(url)).origin !== window.origin)
                    image.crossOrigin = "";
            }
            catch { }
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = url;
        });
    }
};
// This is helper class to fetch resources from the webserver
// Unlike C++, we can't block the main thread till files are read, so we use promises to notify the Game Class when the resources are ready
// This class is a work in progress so expect it to be enhanced in future labs
class Loader {
    constructor() {
        this.resources = {};
        this.promises = [];
    }
    loadMap(resources) {
        for (let item of resources) {
            let name = item[0];
            let resource = item[1];
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
    async wait() {
        while (this.promises.length > 0) {
            const awaited = [...this.promises];
            this.promises.splice(0, this.promises.length);
            await Promise.all(awaited);
        }
    }
}
exports.default = Loader;
//# sourceMappingURL=Loader.js.map