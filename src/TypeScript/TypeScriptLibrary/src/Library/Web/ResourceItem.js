"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceItem = void 0;
class ResourceItem {
    constructor(name, url, type) {
        this.name = "";
        this.url = "";
        this.type = "";
        this.name = name;
        this.url = url;
        this.type = type;
    }
    getName() {
        return this.name;
    }
    getUrl() {
        return this.url;
    }
    getType() {
        return this.type;
    }
}
exports.ResourceItem = ResourceItem;
//# sourceMappingURL=ResourceItem.js.map