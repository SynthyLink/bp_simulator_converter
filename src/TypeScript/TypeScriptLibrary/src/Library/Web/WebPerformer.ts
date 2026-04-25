import { ResourceItem } from "./ResourceItem";

export class WebPerformer {
    createResources(map: Map<string, string>): ResourceItem[] {
        var r: ResourceItem[] = []
        for (let i of map) {
            let rs = new ResourceItem(i[0], i[1], "")
            r.push(rs)
        }
        return r
    }
}