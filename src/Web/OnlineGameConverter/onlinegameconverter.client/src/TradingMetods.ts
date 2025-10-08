import { TradingCommunication } from "./Algorithms/Trading/TradingCommunicaton";


let tradingCommutication = new TradingCommunication()

export const getTragingSymbols = async (abort: AbortController): Promise<Map<string, string>> => {
    var t = tradingCommutication.tradingSymbols(abort);
}