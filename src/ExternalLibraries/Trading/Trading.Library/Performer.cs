using Trading.Database.Interfaces;
using Trading.Library.Classes;
using HistoricalDataMessageDateTime = Trading.Database.Classes.HistoricalDataMessageDateTime;

namespace Trading.Library
{
    public class Performer : DataPerformer.Portable.Performer
    {
        Dictionary<string, double> periods = new Dictionary<string, double>()
        {
            {"1 day", 1 / (24 * 60)},
            {"1 hour", 1 / 24 },
        };

        private bool Get(HistoricalDataMessageDateTime n, double x, double p, ref int i)
        {
            double y = x + i * p;
            var v = n.date.Value.ToOADate();
            if (Math.Abs(v - y) < 0.0000001)
            {
                ++i;
                return true;
            }
            return false;
        }

        public List<HistoricalDataMessageDateTime> Get(IEnumerable<HistoricalDataMessageDateTime> r, string period)
        {
            var xx = r.First().date.Value.ToOADate();
            int i = 0;
            var per = periods[period];
            var y = from x in r where Get(x, xx, per, ref i) select x;
            return y.ToList();
        }

        public async Task<List<HistoricalDataMessageDateTime>> Get(ITradingDatabaseHistoryInterface database, object o,
            DateTime begin, DateTime end, string period, CancellationToken token)
        {
            var l = await database.GetHistoricalDataMessageDateTimesAsync(o, begin, end, token);
            if (period == "1 min")
            {
                return l;
            }
            return Get(l, period);

        }


        private bool Get(HistoricalDataMessageNumber n, double x, double p, ref int i)
        {
            double y = x + i * p;
            if (Math.Abs(n.date.Value - y) < 0.0000001)
            {
                ++i;
                return true;
            }
            return false;
        }


        public HistoricalDataMessageNumber[] Get(HistoricalDataMessageNumber[] r, string period)
        {
            var xx = r[0].date.Value;
            int i = 0;
            var per = periods[period];
            var y = from x in r where Get(x, xx, per, ref i) select x;
            return y.ToArray();
        }
    }
}
