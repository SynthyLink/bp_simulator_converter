namespace Trading.Database.Interfaces
{
    public interface ITradingDatabaseHistoryIntefaceFactory
    {
        ITradingDatabaseHistoryInteface Create(string url);
    }
}
