using AspireOnlineConverter.Server.Classes.Trading;
using IronPython.Runtime;
using System.Security.AccessControl;
using Trading.Database;
using Trading.Library;
using Trading.Library.Objects;

static class TradingInit
{
    static Performer performer = new Performer();


    internal static async Task Create(WebApplication application)
    {
        var api = application.MapGroup("/api/trading");
        var cs = application.Configuration["ConnectionStrings:Trading"];
        StaticExtensionTradingDatabase.ConnectionString = cs;
        await performer.Load(new CancellationToken());
        api.MapGet("tradingsymbols",  () =>
        {
            string[][] s = null;
            s = [["x"], ["y"]];
            return s;
            //return GetSymbols();
        })
   .WithName("GetTradingSymbols");

    }

    public static async Task<string[][]> GetSymbols()
    {
        return await GetTradingHistorucalSrtingSymbolsArray(new CancellationToken());
    }

    public static async Task<string[][]> GetTradingHistorucalSrtingSymbolsArray(CancellationToken cancellationToken)
    {
        var t = await GetTradingHistoricalSymbols(cancellationToken);
        var l = from s in t select new string[] { s.Key, s.Value + "" };
        return l.ToArray();

    }

    static Dictionary<string, object> symbols = null;

    public static async Task<Dictionary<string, object>> GetTradingHistoricalSymbols(CancellationToken cancellationToken)
    {
        if (symbols == null)
        {
            var x = await DataQuery.Create(cancellationToken);
            symbols = x.Symbols;
        }
        return symbols;
    }



}