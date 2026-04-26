import { ResourceItem } from "./ResourceItem";

export class WebPerformer {
    createResources(map: Map<string, string>): ResourceItem[] {
        var r: ResourceItem[] = []
        for (let i of map) {
            var url = i[1]
            var ext = "";
            var n = url.lastIndexOf(".")
            if (n > 0) ext = url.substr(n)
            let rs = new ResourceItem(i[0], i[1], ext)
            r.push(rs)
        }
        return r
    }
}