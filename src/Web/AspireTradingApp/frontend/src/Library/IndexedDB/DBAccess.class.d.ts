import type { IDBAccess } from './interfaces/IDBAccess.interface';
export declare class DBAccess implements IDBAccess {
    dbAccess: DBAccess;
    db: IDBDatabase;
    connect(dbName: string, storeName: string): Promise<IDBDatabase>;
    get instance(): DBAccess;
}
//# sourceMappingURL=DBAccess.class.d.ts.map