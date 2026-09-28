import type { ITradingDatabaseHistoryInterfaceFacrory } from "./ITradingDatabaseHistoryInterfaceFactory";

export class TradingDatabaseHistoryInterfaceHolder {

    setITradingDatabaseHistoryInterfaceFacrory(factory: ITradingDatabaseHistoryInterfaceFacrory) {
        this.factory = factory;
    }

    getITradingDatabaseHistoryInterfaceFacrory(): ITradingDatabaseHistoryInterfaceFacrory {
        return this.factory;
    }


    factory !: ITradingDatabaseHistoryInterfaceFacrory;
}