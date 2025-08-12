using Azure.Core;
using IBApi.messages;
using Microsoft.EntityFrameworkCore;
using Trading.Database.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Trading.Database.SqlServer.Overriden
{

    public class TradingHistory : Trading.Database.SqlServer.TradingHistory, ITradingDatabaseHistoryInteface
    {
        string connectionSrting;

        protected virtual Dictionary<string, Guid> Symbols { get; set; } = new Dictionary<string, Guid>();

        public TradingHistory(string connectionSrting)
        {
            this.connectionSrting = connectionSrting;
            var d = Database;
            var t = SelectSymbols();
            foreach (var symbol in t)
            {
                Symbols[symbol.Name] = symbol.Id;
            }
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(connectionSrting);
            }

        }

        #region ITradingDatabaseHistoryInteface

        Task ITradingDatabaseHistoryInteface.DeleteBySymbol(string symbol, CancellationToken token)
        {
            throw new NotImplementedException();
        }

        Task ITradingDatabaseHistoryInteface.FillHisrory(string name, List<HistoricalDataMessageDateTime> data, CancellationToken token)
        {
            throw new NotImplementedException();
        }

        Task<List<HistoricalDataMessageDateTime>> ITradingDatabaseHistoryInteface.GetHistoricalDataMessageDateTimes(Guid id, DateTime begin, DateTime end, CancellationToken token)
        {
            throw new NotImplementedException();
        }

        Task<Dictionary<string, Guid>> ITradingDatabaseHistoryInteface.GetSymbols(CancellationToken token)
        {
            return GetSymbols(token);
        }

        void ITradingDatabaseHistoryInteface.DeleteBySymbol(string symbol)
        {
            throw new NotImplementedException();
        }

        void ITradingDatabaseHistoryInteface.FillHisrory(string name, List<HistoricalDataMessageDateTime> data)
        {
            throw new NotImplementedException();
        }

        List<HistoricalDataMessageDateTime> ITradingDatabaseHistoryInteface.GetHistoricalDataMessageDateTimes(Guid id, DateTime begin, DateTime end)
        {
            return HistoricalDataMessageDateTimes(id, begin, end);
        }

        Dictionary<string, Guid> ITradingDatabaseHistoryInteface.Symbols => Symbols;


        #endregion

        protected virtual List<HistoricalDataMessageDateTime> HistoricalDataMessageDateTimes(Guid id, DateTime begin, DateTime end)
        {
            var r = SelectHistoryByDate(id, begin, end);
            return Convert(r);

        }

        protected virtual List<HistoricalDataMessageDateTime> Convert(List<SelectHistoryByDateReturnModel> items)
        {
            return (from hist in items select Convert(hist)).ToList();
        }

        protected virtual HistoricalDataMessageDateTime Convert(SelectHistoryByDateReturnModel item)
        {
            return new HistoricalDataMessageDateTime
            {
                RequestId = item.RequestId,
                Date = item.Date,
                Open = item.OpenF,
                High = item.High,
                Low = item.Low,
                Close = item.CloseF,
                Volume = item.Volume,
                Count = item.Count,
                Wap = item.Wap,
                HasGaps = item.HasGaps

            };
            
        }

                protected virtual async Task<List<HistoricalDataMessageDateTime>> GetHistoricalDataMessageDateTimes(object id, DateTime begin, DateTime end, CancellationToken token)
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
                    RequestId = item.RequestId,
                    Date = item.Date,
                    Open = item.OpenF,
                    High = item.High,
                    Low = item.Low,
                    Close = item.CloseF,
                    Volume = item.Volume,
                    Count = item.Count,
                    Wap = item.Wap,
                    HasGaps = item.HasGaps

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


        protected virtual async Task<Dictionary<string, Guid>> GetSymbols(CancellationToken token)
        {
            var t = SelectSymbolsAsync(token);
            await t;
            var r = t.Result;
            var d = new Dictionary<string, Guid>();
            foreach (var j in r)
            {
                d[j.Name] = j.Id;
            }
            return d;
        }

    }
}
