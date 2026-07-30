
using Microsoft.AspNetCore.Mvc;
using Trading.Database.Classes;
using Trading.Library.Classes;
using Trading.Library.Objects;
using static IronPython.Modules._ast;

namespace AspireTradingApp.Server.Trading
{
    public class Performer : Classes.Performer
    {
        public Performer() {
        }

        internal async Task Load(CancellationToken token)
        {
            if (desktop != null) return;
            desktop = await Generated.Donchian.GetDesktop(token);
        }

        public async Task<List<HistoricalDataMessageNumber>> GetHistory([FromBody] DataQueryInit init,
     CancellationToken token)
        {
            var query = await DataQuery.Create(init, token);
            var dt = await query.GetHistoricalDataMessageDateTimes(token);
            var s = from hist in dt select Convert(hist);
            return s.ToList();
        }

        public string Initial
        {
            get
            {
                var q = desktop.Get<DataQuery>("Trading");
                var d = new Dictionary<string, object>();
                d["b"] = q.Begin.ToOADate();
                d["e"] = q.End.ToOADate();
                d["p"] = q.Period;
                d["s"] = q.Symbol;
                var json = System.Text.Json.JsonSerializer.Serialize(d);
                return json;
            }
        }

        public HistoricalDataMessageNumber Convert(HistoricalDataMessageDateTime message)
        {
            return new HistoricalDataMessageNumber
            {
                requestId = message.requestId,
                date = message.date == null ? null : message.date.Value.Ticks,
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
