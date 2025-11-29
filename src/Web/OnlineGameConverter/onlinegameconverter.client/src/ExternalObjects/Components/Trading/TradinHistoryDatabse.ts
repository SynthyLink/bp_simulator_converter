import { FictionTradingDatabase } from "./FictionTradingDatabase";

import type { ITradingDatabaseHistoryInterface } from "../../Libraries/Trading/Database/ITradingDatabaseHistoryInterface"

export function getHistoryDatabase(): ITradingDatabaseHistoryInterface
{
    return new FictionTradingDatabase();
}

