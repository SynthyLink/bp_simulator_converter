using Microsoft.AspNetCore.Mvc;
using AspireTradingApp.Server.Trading;
using Trading.Library;
using Trading.Database;
using Trading.Library.Classes;
using Trading.Library.Objects;

static class TradingInit
{
    static Performer performer = new Performer();

    static Dictionary<string, object> symbols = null;


    internal static async Task Create(WebApplication application)
    {
        var api = application.MapGroup("/api/trading");
        var cs = application.Configuration["ConnectionStrings:Trading"];
        StaticExtensionTradingDatabase.ConnectionString = cs;
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
.WithName("PostTradingHistory");
    }

    public static async Task<string> GetInitial(CancellationToken token)
    {
        await performer.Load(token);
        return performer.Initial;
    }


    public static async Task<string[][]> GetSymbols(CancellationToken token)
    {
        return await GetTradingHistorucalSrtingSymbolsArray(token);
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
            var x = await DataQuery.Create(cancellationToken);
            symbols = x.Symbols;
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