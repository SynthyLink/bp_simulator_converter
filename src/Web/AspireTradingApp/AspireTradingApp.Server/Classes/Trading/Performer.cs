
using DataPerformer.Interfaces;
using Diagram.UI.ExternalTools;
using Diagram.UI.Interfaces;
using GeneratedProject;
using IronPython.Runtime;
using Microsoft.AspNetCore.Mvc;
using NamedTree;
using NamedTree.Interfaces;
using Trading.Database.Classes;
using Trading.Database.Interfaces;
using Trading.Library.Classes;
using Trading.Library.Objects;




namespace AspireTradingApp.Server.Trading
{
    public class Performer 
    {

        string[] filtersN = ["Average Short", "Average Long", "Donchian maximum", "Donchian maximum"];
        string[] del = ["a1", "a2", "d1", "d2"];

        string ConnetionString
        {
            get;
            set;
        }

        Dictionary<string, string> dp = new Dictionary<string, string>() {{"a", "Trading.RealTime"},
        {"b", "Trading.Low"},
         {"c", "Trading.High"},
          {"d", "Trading.Open"},
          {"e", "Trading.Close"},
          {"f", "Trading.Candle"},
          {"g", "Trading.Step"},
          {"h", "Trading.DateTime"},
          {"i", "Order.Position"},
          {"j", "Order.Income"},
          {"k", "Order.Sell Price"},
          {"l", "Order.Buy Price"},
          {"m", "Average Short.Output"},
          {"n", "Average Long.Output"},
          {"o", "Donchian minimum.Output"},
          {"q", "Donchian maximum.Output"},
          {"s", "Position.Formula_1"},
          {"Position_Formula_1", "Position.Formula_1"}
};


int[] k = [0, 0, 0, 0, 0, 0];

        public NamedTree.Interfaces.IFactory Factory
        {
            get
            {
                NamedTree.Interfaces.IFactory f = new UniversalFactory();
                f.Set(Database);
                return f;
            }
        }

        ITradingDatabaseHistoryIntefaceFactory df;


        static Performer()
        {
        }

        public ITradingDatabaseHistoryInterface Database
        {
            get
            {
                var database = df.Create(ConnetionString);
                return database;
            }
        }

        public Performer(string cs, ITradingDatabaseHistoryIntefaceFactory df)
        {

            ConnetionString = cs;
            this.df = df;
        }

        internal async Task Load(CancellationToken token)
        {
            
            var desktop = await DonchianDesktop.GetDesktopAsync(token, Factory);
        }

        public async Task<List<HistoricalDataMessageNumber>> GetHistory([FromBody] DataQueryInit init,
     CancellationToken token)
        {
            var query = await DataQuery.Create(init, token);
            var dt = await query.GetHistoricalDataMessageDateTimes(token);
            var s = from hist in dt select Convert(hist);
            return s.ToList();
        }

        public async Task<string> Initial()
        {
            var desktop = await DonchianDesktop.GetDesktopAsync(CancellationToken.None, Factory);
            var q = desktop.Get<DataQuery>("Trading");
            var d = new Dictionary<string, object>();
            d["b"] = q.Begin.ToOADate() * 86400;
            d["e"] = q.End.ToOADate() * 86400;
            d["p"] = q.Period;
            d["s"] = q.Symbol;
            var json = System.Text.Json.JsonSerializer.Serialize(d);
            return json;
        }

        public async Task<HistoricalDataMessageNumber[]> GetHistoryNumber(double begin, double end, string period, string s, CancellationToken token)
        {
            var q = new DataQuery(Factory);
            IInitializeTask it = q;
            await it.InitializeAsync(token);
            q.Begin = DateTime.FromOADate(begin);
            q.End = DateTime.FromOADate(end);
            q.Period = period;
            q.Symbol = s;
            var st = await q.GetHistoricalDataMessageDateTimes(token);
            var h = from hist in st select Convert(hist);
            return h.ToArray();
        }

        public async Task<HistoricalDataMessageNumber[]> GetHistoryNumber(string json, CancellationToken token)
            { 
          var o =
                    System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(json);
            var b = double.Parse(o.GetProperty("b") + "");
            var e = double.Parse(o.GetProperty("e") + "");
            var sym = o.GetProperty("s") + "";
            var p = o.GetProperty("p") + "";
 
            return await GetHistoryNumber(b, e, p, sym, token);
        }

        public async Task<string> GetData(string input, CancellationToken token)
        {
               //  factory.Set<ITradingDatabaseHistoryIntefaceFactory>()
            var desktop = await DonchianDesktop.GetDesktopAsync(token, Factory);
            var dataQuery = desktop.Get<DataQuery>("Trading");
            var dataConsumer = desktop.Get<IDataConsumer>("Chart");



            // var desktop = await GeneratedProject.Donchian.
            var o =
                    System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(input);
            var b = double.Parse(o.GetProperty("b") + "");
            var e = double.Parse(o.GetProperty("e") + "");
            var sym = o.GetProperty("s") + "";
            var p = o.GetProperty("p") + "";
            dataQuery.Set(sym, p, b, e);
         /*   for (int i = 0; i < k.Length; i++)
            {
                var k  = int.Parse(o.GetProperty(del[i]) + "");
                var s = desktop.Get<DataPerformer.Portable.FilterWrapper>(filtersN[i]);
                s.Filter.Count = k;

            }*/
            var wrapper = new DataPerformer.Portable.Wrappers.DataConsumerWrapper(dataConsumer);
            var t = await wrapper.PerformIteratorAsync(dataQuery, dp, token);
            return System.Text.Json.JsonSerializer.Serialize(t);
        }

        public HistoricalDataMessageNumber Convert(HistoricalDataMessageDateTime message)
        {
            return new HistoricalDataMessageNumber
            {
                requestId = message.requestId,
                date = message.date == null ? null : message.date.Value.ToOADate(),
                open = message.open,
                high = message.high,
                low = message.low,
                close = message.close,
                volume = message.volume,
                count = message.count,
                wap = message.wap,
                hasGaps = message.hasGaps,
            };
        }


    }
}
