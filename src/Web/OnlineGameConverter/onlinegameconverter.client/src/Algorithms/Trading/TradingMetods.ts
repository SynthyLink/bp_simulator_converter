import type { DataQueryInit } from "./DataQureyInit";
import type { HistoricalDataMessageNumber } from "./HistoricalDataMessageNumber";
import { TradingCommunication } from "./TradingCommunicaton";


let tradingCommutication = new TradingCommunication()

export const getTragingSymbols = async (abort: AbortController): Promise<Map<string, string>> => {
    var t = await tradingCommutication.tradingSymbols(abort);
    return t;
}

export const getTradingData = async (
    condition: DataQueryInit, controller: AbortController):
    Promise<HistoricalDataMessageNumber[] | undefined> =>
{
    var t = await tradingCommutication.getTradingData(condition, controller);
    return t;
}