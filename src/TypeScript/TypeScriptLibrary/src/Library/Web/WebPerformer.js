"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPerformer = void 0;
const ResourceItem_1 = require("./ResourceItem");
class WebPerformer {
    createResources(map) {
        var r = [];
        for (let i of map) {
            let rs = new ResourceItem_1.ResourceItem(i[0], i[1], "");
            r.push(rs);
        }
        return r;
    }
}
exports.WebPerformer = WebPerformer;
//# sourceMappingURL=WebPerformer.js.map