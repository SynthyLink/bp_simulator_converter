using IBApi.messages;

using Trading.Database.Interfaces;

namespace Trading.Database.SqlServer
{
    internal class TradingDatabaseInterface : ITradingDatabaseHistoryInteface
    {
        TradingHistory history;

        public TradingDatabaseInterface(string connectionString)
        {
            history = new Trading.Database.SqlServer.Overriden.TradingHistory(connectionString);
        }


        Task<Dictionary<string, object>> ITradingDatabaseHistoryInteface.Symbols => throw new NotImplementedException();

        Task ITradingDatabaseHistoryInteface.DeleteBySymbol(string symbol)
        {
            throw new NotImplementedException();
        }

        Task ITradingDatabaseHistoryInteface.FillHisrory(string name, List<HistoricalDataMessageDateTime> data)
        {
            throw new NotImplementedException();
        }

        Task<List<HistoricalDataMessageDateTime>> ITradingDatabaseHistoryInteface.GetHistoricalDataMessageDateTimes(object id, DateTime begin, DateTime end)
        {
            throw new NotImplementedException();
        }
    }
}
