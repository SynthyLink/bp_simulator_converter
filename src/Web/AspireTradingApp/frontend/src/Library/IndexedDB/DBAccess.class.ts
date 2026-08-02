import type { IDBAccess } from './interfaces/IDBAccess.interface';

export class DBAccess implements IDBAccess {
    public dbAccess !: DBAccess;
    public db !: IDBDatabase;


  async connect(dbName: string, storeName: string) {
  
    if (this.db) {
      return this.db;
    }

    let attempts = 3;
    const request = indexedDB.open(dbName, 4);

    return new Promise<IDBDatabase>((resolve, reject) => {
      request.onerror = error => {
        attempts--;
        if (attempts) {
          return this.connect(dbName, storeName);
        }
        return reject(error);
      }
      request.onsuccess = () => {
          this.db = request.result;
          if (!this.db.objectStoreNames.contains(storeName)) {
              console.log(storeName, "STORENAME")
              let rr = this.db.createObjectStore(storeName, { keyPath: 'uid' });
              console.log(rr, "STORENAMERR")
      }
        resolve(this.db);
          console.log(this.db, "SUCCESS")
   };
      request.onupgradeneeded = () => {
        this.db = request.result;
        request.result.createObjectStore(storeName, { keyPath: 'uid' });
          resolve(this.db);
          console.log(this.db, "UPGRADE")
      }
    });

  }

  get instance() {
    return this.dbAccess ? this.dbAccess : this.dbAccess = new DBAccess();
  }
}
