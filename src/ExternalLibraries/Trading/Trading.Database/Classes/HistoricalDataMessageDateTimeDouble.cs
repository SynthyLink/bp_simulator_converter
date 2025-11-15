using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trading.Database.Classes
{
    public record class HistoricalDataMessageDateTimeDouble
    {
        public HistoricalDataMessageDateTimeDouble(HistoricalDataMessageDateTime x)
        {
            requestId = x.requestId;
            date = x.date.Value.ToOADate();
            open = x.open;
            high = x.high;
            low = x.low;
            close = x.close;
            volume = x.volume;
            count = x.count;
            wap = x.wap;
            hasGaps = x.hasGaps;
        }


        public int requestId { get; init; }
        public double date { get; init; }
        public double open { get; init; }
        public double high { get; init; }
        public double low { get; init; }
        public double close { get; init; }
        public decimal volume { get; init; }
        public int count { get; init; }
        public decimal wap { get; init; }
        public bool hasGaps { get; init; }

    }
}
