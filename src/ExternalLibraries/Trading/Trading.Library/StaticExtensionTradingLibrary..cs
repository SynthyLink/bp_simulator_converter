using AssemblyService.Attributes;
using System.Runtime.CompilerServices;
using Trading.Database.Classes;
using Trading.Library.Classes;
using Trading.Library.CodeCreators;
using Trading.Library.Enums;

namespace Trading.Library
{
    [InitAssembly]
    public static class StaticExtensionTradingLibrary
    {
        static public void Init(InitAssemblyAttribute attr)
        {

        }

        static StaticExtensionTradingLibrary()
        {
            new ClassCodeCreator();
        }

        public static PositionType ToPositionType(this double? position)
        {
            if (position == null)
            {
                return PositionType.None;
            }
            else
            {
                var a = position.Value;
                switch (a)
                {
                    case 0: return PositionType.None;
                    case 1: return PositionType.Short;
                    case 2: return PositionType.Long;

                }
                throw new ArgumentException("Illegal position type", " " + a);
            }
        }
/*
        public static void FillVector(this HistoricalDataMessageDateTime message, double[] vector)
        {
            vector[0] = message.high;
            vector[1] = message.low;
            vector[2] = message.open;
            vector[3] = message.close;
        }
*/
        private static readonly Dictionary<string, TimeSpan> spans = new Dictionary<string, TimeSpan>()
        {
            { "1 sec", TimeSpan.FromSeconds(5) },
                       { "5 secs", TimeSpan.FromSeconds(5) },
                       { "15 secs", TimeSpan.FromSeconds(15) },
          { "30 secs", TimeSpan.FromSeconds(30) },
          { "1 min", TimeSpan.FromMinutes(1) },
          { "2 mins", TimeSpan.FromMinutes(2) },
          { "3 mins", TimeSpan.FromMinutes(3) },
          { "5 mins", TimeSpan.FromMinutes(5) },
          { "15 mins", TimeSpan.FromMinutes(15) },
          { "30 mins", TimeSpan.FromMinutes(30) },
          { "1 hour", TimeSpan.FromHours(1)},
          { "1 day", TimeSpan.FromDays(1)},
          { "1 week", TimeSpan.FromDays(7)},
          { "1 month", TimeSpan.FromDays(31)},
        };

        public static string[] Barsizes
        {
            get => spans.Keys.ToArray();
        }

        public static HistoricalDataMessageNumber Convert(this HistoricalDataMessageDateTime message)
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

        public static TimeSpan ToBarSize(this string key)
        {
            if (spans.ContainsKey(key))
            {
                return spans[key];
            }
            return TimeSpan.Zero;
        }



        public static PositionDirection ToDirection(this PositionDirection direction, 
            
            PositionType position, PositionType last)
        {
            if (position == last)
            {
                return direction;
            }
            return direction == PositionDirection.Opened ? 
                PositionDirection.Closed : PositionDirection.Opened;
        }
    }
}