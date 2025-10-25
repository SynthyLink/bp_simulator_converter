
namespace Trading.Library.Classes
{
    public record DataQueryInit
    {
        public string period { get; init; }
        public long begin { get; init; }
        public long end { get; init; }
        public string symbol { get; init; }
    }
}