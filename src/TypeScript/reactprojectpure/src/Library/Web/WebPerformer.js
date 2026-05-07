"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPerformer = void 0;
const ResourceItem_1 = require("./ResourceItem");
class WebPerformer {
    createResources(map) {
        var r = [];
        for (let i of map) {
            var url = i[1];
            var ext = "";
            var n = url.lastIndexOf(".");
            if (n > 0)
                ext = url.substr(n);
            let rs = new ResourceItem_1.ResourceItem(i[0], i[1], ext);
            r.push(rs);
        }
        return r;
    }
}
exports.WebPerformer = WebPerformer;
//# sourceMappingURL=WebPerformer.js.map