
namespace Trading.Library.Classes
{
    public record class HistoricalDataMessageDateTime
    {
        public int requestId { get; init; }
        public DateTime? date { get; init; }
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
