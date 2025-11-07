using ErrorHandler;
using Microsoft.EntityFrameworkCore;
using Trading.Database.Interfaces;
using Trading.Library.Classes;

namespace Trading.Database.SqlServer.Overriden
{

    public class TradingHistory : SqlServer.TradingHistory,  ITradingDatabaseHistoryInterface
    {
        string connectionSrting;

        protected virtual Dictionary<string, object> Symbols { get; set; } = new Dictionary<string, object>();

        public TradingHistory(string connectionSrting)
        {
            this.connectionSrting = connectionSrting;
            var d = Database;
  /*          var t = SelectSymbols();
            foreach (var symbol in t)
            {
                Symbols[symbol.Name] = symbol.Id;
            }*/
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(connectionSrting);
            }

        }

        #region ITradingDatabaseHistoryInterface

        Task ITradingDatabaseHistoryInterface.DeleteBySymbolAsync(string symbol, CancellationToken token)
        {
            throw new OwnNotImplemented();
        }

        Task ITradingDatabaseHistoryInterface.FillHisroryAsync(string name, List<HistoricalDataMessageDateTime> data, 
            CancellationToken token)
        {
            throw new OwnNotImplemented();
        }


        Task<Dictionary<string, object>> ITradingDatabaseHistoryInterface.GetSymbolsAsync(CancellationToken token)
        {
            return GetSymbols(token);
        }

        void ITradingDatabaseHistoryInterface.DeleteBySymbol(string symbol)
        {
            throw new OwnNotImplemented();
        }

        void ITradingDatabaseHistoryInterface.FillHisrory(string name, List<HistoricalDataMessageDateTime> data)
        {
            throw new OwnNotImplemented();
        }

    
      //  Dictionary<string, object> ITradingDatabaseHistoryInteface.Symbols => Symbols;


        #endregion


        protected virtual async Task<List<HistoricalDataMessageDateTime>> GetHistoricalDataMessageDateTimesAsync(object id, DateTime begin, DateTime end, CancellationToken token)
        {
            var g = (Guid)id;
            var t = SelectHistoryByDateAsync(g, begin, end, token);
            await t;
            var r = t.Result;
            var l = new List<HistoricalDataMessageDateTime>();
            foreach (var item in r)
            {
                var h = new HistoricalDataMessageDateTime
                {
                    requestId = item.RequestId,
                    date = item.Date,
                    open = item.OpenF,
                    high = item.High,
                    low = item.Low,
                    close = item.CloseF,
                    volume = item.Volume,
                    count = item.Count,
                    wap = item.Wap,
                    hasGaps = item.HasGaps

                };

                l.Add(h);

            }
            return l;
        }

        public class HistoricalDataMessageDateTime1
        {
            protected int count;
            protected decimal wap;
            protected bool hasGaps;
        }


        protected virtual async Task<Dictionary<string, object>> GetSymbols(CancellationToken token)
        {
            var t = SelectSymbolsAsync(token);
            await t;
            var r = t.Result;
            var d = new Dictionary<string,object>();
            foreach (var j in r)
            {
                d[j.Name] = j.Id;
            }
            return d;
        }

        async Task<List<HistoricalDataMessageDateTime>> ITradingDatabaseHistoryInterface.GetHistoricalDataMessageDateTimes(object id, DateTime begin, DateTime end, CancellationToken token)
        {
            var r = await SelectHistoryByDateAsync((Guid)id, begin, end);
            var l = new List<HistoricalDataMessageDateTime>();
            foreach (var item in r)
            {
                var h = new HistoricalDataMessageDateTime
                {
                    requestId = item.RequestId,
                    date = item.Date,
                    open = item.OpenF,
                    high = item.High,
                    low = item.Low,
                    close = item.CloseF,
                    volume = item.Volume,
                    count = item.Count,
                    wap = item.Wap,
                    hasGaps = item.HasGaps

                };

                l.Add(h);

            }
            return l;
        }

        List<HistoricalDataMessageDateTime> ITradingDatabaseHistoryInterface.GetHistoricalDataMessageDateTimes(object id, DateTime begin, DateTime end)
        {
            var r = SelectHistoryByDate((Guid)id, begin, end);
            var l = new List<HistoricalDataMessageDateTime>();
            foreach (var item in r)
            {
                var h = new HistoricalDataMessageDateTime
                {
                    requestId = item.RequestId,
                    date = item.Date,
                    open = item.OpenF,
                    high = item.High,
                    low = item.Low,
                    close = item.CloseF,
                    volume = item.Volume,
                    count = item.Count,
                    wap = item.Wap,
                    hasGaps = item.HasGaps

                };

                l.Add(h);

            }
            return l;
        }
    }
}
