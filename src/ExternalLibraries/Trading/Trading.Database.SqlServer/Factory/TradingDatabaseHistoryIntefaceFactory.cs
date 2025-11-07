
using Microsoft.Data.SqlClient;

using Trading.Database.Interfaces;

namespace Trading.Database.SqlServer.Factory
{

    // 
    //"Data Source=IVANKOV\SQLEXPRESS;Initial Catalog=TradeStation;Integrated Security=True;Encrypt=False;MultipleActiveResultSets=True;TrustServerCertificate=true");
    public class TradingDatabaseHistoryIntefaceFactory : ITradingDatabaseHistoryIntefaceFactory

    {
        List<string> l = new List<string>();

        public TradingDatabaseHistoryIntefaceFactory()
        {

        }

        ITradingDatabaseHistoryInterface ITradingDatabaseHistoryIntefaceFactory.Create(string connectionString)
        {
            if (!l.Contains(connectionString))
            {
                try
                {
                    using var conn = new SqlConnection(connectionString);
                    conn.Open();
                }
                catch
                {
                    return null;
                }
            }
            l.Add(connectionString);
            return new Overriden.TradingHistory(connectionString);
        }
    }
}