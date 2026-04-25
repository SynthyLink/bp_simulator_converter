import { ResourceItem } from "../ResourceItem"

export interface IURLResourceHolder {

    getURLResources(): ResourceItem[]

    addURLRource(name: string, url: string, type: string): void
}
