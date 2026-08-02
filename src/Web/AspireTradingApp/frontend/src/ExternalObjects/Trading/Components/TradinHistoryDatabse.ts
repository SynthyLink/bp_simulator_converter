import type { ITradingDatabaseHistoryInterface } from "../Database/ITradingDatabaseHistoryInterface";
import { TradingHistoryFetchDatabase } from "../Database/TradingHistoryFetchDatabase";

let database = new TradingHistoryFetchDatabase();
export function getHistoryDatabase(): ITradingDatabaseHistoryInterface
{
    return database;
}

