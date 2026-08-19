import type { IDataAccess } from './interfaces/IDataAccess.interface';
import { Item } from './Item.class';
export declare class DataAccess<T extends Item> implements IDataAccess<T> {
    private connection;
    private storeName;
    any: any;
    constructor(dbName: string, storeName: string);
    close(): Promise<void>;
    clear(): Promise<void>;
    add(item: T): Promise<T>;
    retrieve(): Promise<T[]>;
    update(item: T): Promise<T>;
    get(uid: string): Promise<T>;
    remove(uid: string): Promise<T>;
    private requestHandler;
}
//# sourceMappingURL=DataAccess.class.d.ts.map