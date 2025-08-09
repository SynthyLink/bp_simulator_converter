
using Trading.Database.Interfaces;

namespace Trading.Database.SqlServer.Factory
{
    public class TradingDatabaseHistoryIntefaceFactory : ITradingDatabaseHistoryIntefaceFactory
    {
        public TradingDatabaseHistoryIntefaceFactory() { }

        ITradingDatabaseHistoryInteface ITradingDatabaseHistoryIntefaceFactory.Create(string connectionString)
        {
            throw new OwnNotImplemented();
        }
    }
}
