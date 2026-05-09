import { EmptyObject } from "../EmptyObject";
import { GamePerformer } from "../Game/GamePerformer";
import type { IFactory } from "../Interfaces/IFactory";
import type { ILoadUrl } from "../RemoteResuorces/Interfaces/ILoadUrl";
import Loader from "../RemoteResuorces/Loader";
import type { ResourceInformation } from "../RemoteResuorces/Loader";
import type { IResourceFunc } from "../Resources/Infrefaces/IResourceFunc";
import type { IResourceFuncFactory } from "../Resources/Infrefaces/IResourceFuncFactory";
import type { IResourceItem } from "../Resources/Infrefaces/IResourceItem";
import { ResourceFuncFactory } from "../Resources/ResourceFuncFactory";

export class GLGamePerformer extends GamePerformer {

    public convertResourceInfo(input: IResourceItem[], output: Map<string, ResourceInformation>): void {
        for (let item of input) {
            let o: ResourceInformation = { url: item.url, type: item.type }
            output.set(item.name, o)
        }
    }

    public createFactory(loader: Loader, factory: IFactory | undefined): IResourceFuncFactory {
        var fact = new ResourceFuncFactory("", factory)
        let rf = new ResourceFactory(loader)
        fact.addFunction("text", rf)
        let lf = new LoaderFactory(loader)
        fact.addFunction("image", lf)
        return fact;
    }

}
abstract class AbstractFactory extends EmptyObject implements IResourceFunc
{
    constructor(loader: Loader) {
        super("")
        this.loader = loader
        this.types.push("IResourceFunc")
    }

    abstract functT(s: IResourceItem) : any


    protected loader !: Loader

}

class ResourceFactory extends AbstractFactory {
    constructor(loader: Loader) {
        super(loader)
    }
    functT(s: IResourceItem) {
        return this.loader.resources[s.url]
    }
}

class LoaderFactory extends AbstractFactory {
    constructor(loader: Loader) {
        super(loader)
    }
    functT(s: IResourceItem) {
        let p: ILoadUrl = { loader: this.loader, url: s.url }
        return p
    }
}






