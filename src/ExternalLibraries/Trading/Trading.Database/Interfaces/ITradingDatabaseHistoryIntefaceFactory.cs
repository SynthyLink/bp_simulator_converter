namespace Trading.Database.Interfaces
{
    public interface ITradingDatabaseHistoryIntefaceFactory
    {
        ITradingDatabaseHistoryInterface Create(string connectionString);
    }
}
