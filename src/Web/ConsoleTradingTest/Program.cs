using DataPerformer.Interfaces;
using Diagram.UI;
using Diagram.UI.Interfaces;
using IBApi;
using NamedTree;
using NamedTree.Interfaces;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;
using Trading.Database.Interfaces;
using Trading.Library.Objects;

internal class Program
{
    static bool check(object o)
    {
        if (o == null)
        {
            return true;
        }
        return o == null;
    }

    private static async Task Main()
    {
        await TaskAsync();
        Console.WriteLine("Hello, World!");
    }

    static async Task TaskAsync()
    {
        FormulaEditor.StaticExtensionFormulaEditor.CheckValue = check;

        var token = new CancellationToken();
        IFactory factory = new UniversalFactory();
        ITradingDatabaseHistoryIntefaceFactory idb = new Trading.Database.SqlServer.Factory.TradingDatabaseHistoryIntefaceFactory();
        var database = idb.Create(ConsoleTradingTest.Properties.Resources.ConnectionString);
        factory.Set(database);
        var desktop = await GeneratedProject.DonchianDesktop.GetDesktopAsync(token, factory);
       // desktop.ForEach((IRunning st) => st.IsRunning = true);
        var dataQuery = desktop.Get<DataQuery>("Trading");
        var dataConsumer = desktop.Get<IDataConsumer>("Chart");
        var wrapper = new DataPerformer.Portable.Wrappers.DataConsumerWrapper(dataConsumer);
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
          {"n", "Averge Long.Output"},
          {"o", "Donchian minimum long.Output"},
          {"p", "Donchian minimum short.Output"},
          {"q", "Donchian maximum long.Output"},
          {"r", "Donchian maximum short.Output"},
            { "s", "Position.Formula_1" }, };


        var t = await wrapper.PerformIteratorAsync(dataQuery, token);
        var res = System.Text.Json.JsonSerializer.Serialize(t);
        using var writer = new StreamWriter(@"c:\0\0\2.json");
        await writer.WriteAsync(res);
    }

    static async Task<Dictionary<string, object>[]> GetAsync(string s)
    {
        using var r2 = new StreamReader(s);
        var s2 = await r2.ReadToEndAsync();
        //  var type = JsonTypeInfo.CreateJsonTypeInfo<Dictionary<string, object>[]>(opt);
        var res2 = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, object>[]>(s2);
        if (res2 is Dictionary<string, object>[] d)
        {
            return d;
        }
        return null;
    }


    static async Task CompareAsync()
    {
        int j = 0;
        string key;
        try
        {
            var d1 = await GetAsync(@"c:\0\0\1.json");
            var d2 = await GetAsync(@"c:\0\0\2.json");
            for (var i = 0; i < d1.Length; i++)
            {
                j = i;
                var x1 = d1[i];
                var x2 = d2[i];
                foreach (var x in x1.Keys)
                {
                    key = x;
                    var y1 = (JsonElement)x1[x];
                    var y2 = (JsonElement)x2[x];
                    var t1 = y1.GetRawText();
                    var t2 = y2.GetRawText();
                    var b = t1 == t2;
                    if (!b)
                    {
                        Console.WriteLine(i + " " + x + " " + t1 + " " + t2);
                        return;
                    }

                }
            }
        }
        catch (Exception ex)
        {
            Console.Write(ex.ToString());
        }

    }
}

