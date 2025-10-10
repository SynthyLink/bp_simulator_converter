import type { DataQueryInit } from "./DataQureyInit";
import type { HistoricalDataMessageNumber } from "./HistoricalDataMessageNumber";
import { TradingCommunication } from "./TradingCommunicaton";

let tradingCommutication = new TradingCommunication()
await tradingCommutication.init();

export const getTragingSymbols = async (abort: AbortController): Promise<[][]> => {
    var t = await tradingCommutication.tradingSymbols(abort);
    console.log("TTT");
    console.log(t);
    return t;
}

export const getTradingData = async (
    condition: DataQueryInit, controller: AbortController):
    Promise<HistoricalDataMessageNumber[] | undefined> =>
{
    var t = await tradingCommutication.getTradingData(condition, controller);
    return t;
}

export const getTradingCommutication = (): TradingCommunication => {
    return tradingCommutication;
}

