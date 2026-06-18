import type { ITradingDatabaseHistoryInterfaceFactory } from "./ITradingDatabaseHistoryInterfaceFactory";

export class TradingDatabaseHistoryInterfaceHolder {

    setITradingDatabaseHistoryInterfaceFacrory(factory: ITradingDatabaseHistoryInterfaceFactory) {
        this.factory = factory;
    }

    getITradingDatabaseHistoryInterfaceFacrory(): ITradingDatabaseHistoryInterfaceFactory {
        return this.factory;
    }


    factory !: ITradingDatabaseHistoryInterfaceFactory;
}