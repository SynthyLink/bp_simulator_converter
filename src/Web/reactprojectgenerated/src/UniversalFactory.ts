import type { IFactory } from "./Library/Interfaces/IFactory";
import type { IObject } from "./Library/Interfaces/IObject";
import { Performer } from "./Library/Performer";

export class UniversalFactory implements IFactory {
    getFactory<T>(typeName: string): T | undefined {
        var p = this.factories.get(typeName)
        var pp = this.performer.convertObject<T, any>(p, typeName)
        return (pp.length == 0) ? undefined : pp[0]
    }

    performer: Performer = new Performer()
    factories: Map<string, IObject> = new Map();

    public addFactory<T>(t: T, type: string): void {
        var tt = this.performer.convertObject<IObject, T>(t, type)
        if (tt.length > 0) this.factories.set(type, tt[0])
    }
   
}