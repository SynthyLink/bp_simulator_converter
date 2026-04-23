
import type { ITradingDatabaseHistoryInterface } from "../../Libraries/Trading/Database/ITradingDatabaseHistoryInterface"
import { TradingHistoryFetchDatabase } from "../../Libraries/Trading/Database/TradingHistoryFetchDatabase";

let database = new TradingHistoryFetchDatabase();
export function getHistoryDatabase(): ITradingDatabaseHistoryInterface
{
    return database;
}

