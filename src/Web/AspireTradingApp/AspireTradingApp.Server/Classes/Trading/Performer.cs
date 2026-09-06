
using DataPerformer.Interfaces;
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

        static DataPerformer.Portable.Performer performer = new DataPerformer.Portable.Performer();

        string[] filtersN = ["Average Short", "Average Long", "Donchian maximum", "Donchian maximum"];
        string[] del = ["a1", "a2", "d1", "d2"];

        Dictionary<string, double> periods = new Dictionary<string, double>()
        {
            {"1 day", 1}
        };

        string ConnetionString
        {
            get;
            set;
        }

        Dictionary<string, string> dp = new() {{"a", "Trading.RealTime"},
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
           { "u", "Current Position.x" },
          { "w", "Current Position.y" },
            };


int[] k = [0, 0, 0, 0, 0, 0];

        static IShowObject show = new ShowsObject();

        ShowsObject so;

        public NamedTree.Interfaces.IFactory Factory
        {
            get
            {
                NamedTree.Interfaces.IFactory f = new UniversalFactory();
                f.Set(Database);
                f.Set(show);
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
            so = show as ShowsObject;
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

        private bool Get(HistoricalDataMessageNumber n, double x, double p, ref int i)
        {
            double y = x + i * p;
            if (n.date >= y)
            {
                ++i;
                return true;
            }
            return false;
        }

        public async Task<HistoricalDataMessageNumber[]> GetHistoryNumber(string json, CancellationToken token)
            { 
          var o =
                    System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(json);
            var b = double.Parse(o.GetProperty("b") + "");
            var e = double.Parse(o.GetProperty("e") + "");
            var sym = o.GetProperty("s") + "";
            var p = o.GetProperty("p") + "";
            var per = periods[p];
            var r =  await GetHistoryNumber(b, e, p, sym, token);
            var xx = r[0].date.Value;
            int i = 0;
            var y = from x in r  where Get(x, xx, per, ref i) select x;
            return y.ToArray();
        }

        public async Task<string> GetData(string input, CancellationToken token)
        {
               //  factory.Set<ITradingDatabaseHistoryIntefaceFactory>()
            var desktop = await DonchianDesktop.GetDesktopAsync(token, Factory);
            var dataQuery = desktop.Get<DataQuery>("Trading");
            var dataConsumer = desktop.Get<IDataConsumer>("Chart");
            var order = desktop.Get<Order>("Order");
            order.OrderChanged += Order_OrderChanged;
            order.OnChangeInput += Order_OnChangeInput;
            order.SellBuyChanged += Order_SellBuyChanged;


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

        private void Order_SellBuyChanged(Order arg1, string arg2, double arg3, double arg4)
        {
            so.Order_SellBuyChanged(arg1, arg2, arg3, arg4);
        }

        private void Order_OnChangeInput()
        {
        }

        private void Order_OrderChanged(Order arg1, global::Trading.Library.Enums.PositionDirection arg2)
        {
           so.Order_OrderChanged(arg1, arg2); 
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
