using Trading.Database.Interfaces;

namespace Trading.Database
{
    public  class TradingDatabaseHistoryIntefaceFactoryCollection : ITradingDatabaseHistoryIntefaceFactory
    {


        public TradingDatabaseHistoryIntefaceFactoryCollection(List<ITradingDatabaseHistoryIntefaceFactory> list)
        {
            this.list = list;
        }

        List<ITradingDatabaseHistoryIntefaceFactory> list = new List<ITradingDatabaseHistoryIntefaceFactory>();

        ITradingDatabaseHistoryIntefaceFactory current = null;

        ITradingDatabaseHistoryInteface ITradingDatabaseHistoryIntefaceFactory.Create(string url)
        {
            if (current != null)
            {
                return current.Create(url);
            }
            foreach (var item in list)
            {
                var f = item.Create(url);
                if (f != null)
                {
                    current = item;
                    return f;
                }

            }
            return null;
        }
    }
}
