import type { IFactory } from "./Interfaces/IFactory";
import type { IObject } from "./Interfaces/IObject";
import { Performer } from "./Performer";
import { OwnError } from "./ErrorHandler/OwnError";

export class UniversalFactory implements IFactory {
    getFactory<T>(typeName: string): T | undefined {
        var p = this.factories.get(typeName)
        var pp = this.performer.convertObject<T, any>(p, typeName)
        return (pp.length == 0) ? undefined : pp[0]
    }

    addFactory<T>(t: T, type: string): void {
        if (this.factories.has(type)) throw new OwnError("Factory", type, "aleady exists")
        var tt = this.performer.convertObject<IObject, T>(t, type)
        if (tt.length > 0) this.factories.set(type, tt[0])
    }


    performer: Performer = new Performer()
    factories: Map<string, IObject> = new Map();
}