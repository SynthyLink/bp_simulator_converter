import { Performer } from "../../Library/Performer";
import type { HistoricalDataMessageNumber } from "./HistoricalDataMessageNumber";

export class TradingDatabase {
    setupDatabase(
    ): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("Trading", 1);

            request.onerror = (event) => {
                console.error("Database error:", (event.target as IDBRequest).error);
                reject((event.target as IDBRequest).error);
            };

            request.onsuccess = (event) => {
                const db = (event.target as IDBRequest).result as IDBDatabase;
                console.log("Database opened successfully:", db);
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBRequest).result as IDBDatabase;
                console.log("Database upgrade needed.");

                // Check if the object store already exists
                if (!db.objectStoreNames.contains('tradinghistory')) {
                    // ✅ Calling createObjectStore
                    // The method returns an IDBObjectStore, which we can type.
                    const objectStore = db.createObjectStore('tradinghistory', { keyPath: 'id', autoIncrement: true });

                    // Optional: Add indexes if needed
                    objectStore.createIndex('requestid', 'requestid');
                    objectStore.createIndex('date', 'date');
                    objectStore.createIndex('high', 'high');
                    objectStore.createIndex('low', 'low');
                    objectStore.createIndex('close', 'close');
                    objectStore.createIndex('volume', 'volume');
                    objectStore.createIndex('wap', 'wap');
                    objectStore.createIndex('hasgaps', 'hasgaps');
                    objectStore.createIndex('symbol', 'symbol');
                }
            };
        });
    }

    public async writeHistoricalData(symbol: string, data: HistoricalDataMessageNumber[]): Promise<void> {
        this.setupDatabase().then(db => {
            console.log("Database ready for operations.");

            // You can now interact with the object store.
            // For example, to add data:
            const transaction = db.transaction('tradinghistory', 'readwrite');
            const usersStore = transaction.objectStore('tradinghistory'); // This also returns an IDBObjectStore
            for (let d of data) {
                const userData = {
                    requestid: d.requestId, date: d.date, high: d.high,
                    low: d.low, close: d.close, volume: d.volume,
                    wap: d.wap, hasgaps: d.hasGaps, symbol: symbol
                };
                const addRequest = usersStore.add(userData);

                addRequest.onsuccess = () => {
                    console.log("User added successfully:", addRequest.result);
                };

                addRequest.onerror = (event) => {
                    console.error("Error adding user:", (event.target as IDBRequest).error);
                };
            }

            transaction.oncomplete = () => {
                console.log("Transaction completed.");
                db.close(); // Close the database when done
            };

            transaction.onerror = (event) => {
                console.error("Transaction error:", (event.target as IDBTransaction).error);
            };
        })
            .catch(error => {
                console.error("Failed to set up database:", error);
            });

        };
    public setMap(map: Map<string, string>): void {
        console.log(map.keys());
        this.performer.copyMapKeys(map, this.map);
    }
    map: Map<string, string> = new Map;
    performer: Performer = new Performer();
}