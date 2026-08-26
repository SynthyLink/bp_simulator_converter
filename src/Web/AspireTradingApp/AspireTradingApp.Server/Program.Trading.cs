using AspireTradingApp.Server.Trading;
using Diagram.UI.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Trading.Database;
using Trading.Database.Interfaces;
using Trading.Library;
using Trading.Library.Classes;
using Trading.Library.Objects;

static class TradingInit
{
    static AspireTradingApp.Server.Trading.Performer performer;// = new();

    static ITradingDatabaseHistoryInterface Inter => performer.Database;
 
    static Dictionary<string, object> symbols = null;


    internal static async Task Create(WebApplication application)
    {
        var api = application.MapGroup("/api/trading");
        var cs = application.Configuration["ConnectionStrings:Trading"];
        ITradingDatabaseHistoryIntefaceFactory idb = new Trading.Database.SqlServer.Factory.TradingDatabaseHistoryIntefaceFactory();
   
        //StaticExtensionTradingDatabase.ConnectionString = cs;
        performer = new AspireTradingApp.Server.Trading.Performer(cs, idb);
        await performer.Load(new CancellationToken());
        api.MapGet("tradingsymbols", (CancellationToken token) =>
        {
            return GetSymbols(token);
        })
   .WithName("GetTradingSymbols");


        api.MapGet("initial", (CancellationToken token) =>
        {
            return GetInitial(token);
        })
.WithName("GetTradingInitial");


        api.MapPost("tradinghistory", async ([FromBody] string s, CancellationToken token) =>
        {
            var o = await performer.GetHistoryNumber(s, token);
            var st = System.Text.Json.JsonSerializer.Serialize(o);
            return st;
        })
.WithName("PostTradingnAnalysis");

        api.MapPost("tradinganalysis", async ([FromBody] string s, CancellationToken token) =>
        {
            return await performer.GetData(s, token);
        })
.WithName("PostTradingAnalysis");



        api.MapPost("tradingsavestring", async ([FromBody] string s, CancellationToken token) =>
            {
                return await SaveSrting(s, token);
            })
    .WithName("PostTradingSaveString");


        api.MapPost("tradingsaveobject", async ([FromBody] string o) =>
        {
            return await SaveObject(o);
        })
    .WithName("PostTradingSaveObject");


    }

    public static async Task<bool> SaveObject(string s)
    {
        using var wrirter = new StreamWriter(@"\0\0\3.json");
        await wrirter.WriteAsync(s.ToString());
        return true;

    }


    public static async Task<bool> SaveSrting(string s, CancellationToken token)
        {
        try
        {
            using var wrirter = new StreamWriter(@"\0\0\3.json");
            await wrirter.WriteAsync(s);
            return true;
        }
        catch (Exception ex)
        {

        }
        return false;

    }


    public static async Task<string> GetInitial(CancellationToken token)
    {
        await performer.Load(token);
        return await performer.Initial();
    }


    public static async Task<string[][]> GetSymbols(CancellationToken token)
    {
        var ss = await Inter.GetSymbolsAsync(token);
        var l = new List<string[]>();
        foreach (var i in ss)
        {
            var str = new string[] { i.Key, i.Value + "" };
            l.Add(str);
        }
        return l.ToArray();
       // return await GetTradingHistorucalSrtingSymbolsArray(token);
    }

    public static async Task<string[][]> GetTradingHistorucalSrtingSymbolsArray(CancellationToken cancellationToken)
    {
        var t = await GetTradingHistoricalSymbols(cancellationToken);
        var l = from s in t select new string[] { s.Key, s.Value + "" };
        return l.ToArray();

    }

    public static async Task<Dictionary<string, object>> GetTradingHistoricalSymbols(CancellationToken cancellationToken)
    {
        if (symbols == null)
        {
            var dataQuery = new DataQuery(Inter);
            IInitializeTask it = dataQuery;
            await it.InitializeAsync(cancellationToken);
            symbols = dataQuery.Symbols;
        }
        return symbols;
    }

    public static  async Task<List<HistoricalDataMessageNumber>> GetHistory([FromBody] DataQueryInit init,
      CancellationToken token)
    {
        var query = await DataQuery.Create(init, token);
        var dt = await query.GetHistoricalDataMessageDateTimes(token);
        var s = from hist in dt select hist.Convert();
        return s.ToList();
    }

}