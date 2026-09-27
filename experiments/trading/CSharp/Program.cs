using System.Globalization;
using System.Text.Json;
using System.Text.Json.Nodes;
using DataPerformer.Interfaces;
using Diagram.UI.Interfaces;
using NamedTree;
using NamedTree.Interfaces;
using Trading.Database.Classes;
using Trading.Database.Interfaces;
using Trading.Library.Objects;

CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;
var root = Path.GetFullPath(args[0]);
var config = JsonNode.Parse(File.ReadAllText(Path.Combine(root, "config.json")))!;
var bars = JsonSerializer.Deserialize<List<Bar>>(File.ReadAllText(Path.Combine(root, "data/AAPL_1d.json")))!;
// Regression coverage for the first-bar fix: empty, singleton, multiple bars and replay.
foreach (var size in new[] { 0, 1, 3 }) {
    var sample = bars.Take(size).ToList();
    var testQuery = new DataQuery(new FileHistory(sample)) {
        Begin = new DateTime(2022, 1, 1), End = new DateTime(2024, 1, 1), UsePreaggregatedBars = true
    };
    await ((IStartTask)testQuery).StartAsync(CancellationToken.None);
    for (var replay = 0; replay < 2; replay++) {
        var iterator = (IIterator)testQuery;
        iterator.Reset();
        var index = 0;
        while (iterator.Next()) {
            var measurements = (IMeasurements)testQuery;
            if (index >= sample.Count || (double)measurements[4].Parameter() != sample[index].close ||
                ((DateTime)measurements[7].Parameter()).ToString("yyyy-MM-dd") != sample[index].date)
                throw new Exception("CSharp iterator alignment regression");
            index++;
        }
        if (index != sample.Count) throw new Exception("CSharp iterator count regression");
    }
}
Console.WriteLine("CSharp iterator checks: empty, singleton, multiple bars and reset passed");
FormulaEditor.StaticExtensionFormulaEditor.CheckValue = o => o == null;
IFactory factory = new UniversalFactory();
factory.Set<ITradingDatabaseHistoryInterface>(new FileHistory(bars));
var desktop = await GeneratedProject.DonchianDesktop.GetDesktopAsync(CancellationToken.None, factory);
var query = desktop.Get<DataQuery>("Trading");
query.Set(config["symbol"]!.GetValue<string>(), config["interval"]!.GetValue<string>(),
    DateTime.Parse(config["startInclusive"]!.GetValue<string>()).ToOADate(),
    DateTime.Parse(config["endExclusive"]!.GetValue<string>()).ToOADate());
query.UsePreaggregatedBars = true;
foreach (var (name, setting) in new[] { ("Average Short", "averageShort"), ("Average Long", "averageLong"),
    ("Donchian maximum", "donchianHigh"), ("Donchian minimum", "donchianLow") })
    desktop.Get<DataPerformer.Portable.FilterWrapper>(name).Filter.Count = config[setting]!.GetValue<int>();
var consumer = desktop.Get<IDataConsumer>("Chart");
var map = new Dictionary<string, string> {
    ["date"] = "Trading.DateTime", ["close"] = "Trading.Close", ["position"] = "Order.Position",
    ["buyPrice"] = "Order.Buy Price", ["sellPrice"] = "Order.Sell Price", ["income"] = "Order.Income",
    ["averageShort"] = "Average Short.Output", ["averageLong"] = "Average Long.Output",
    ["donchianHigh"] = "Donchian maximum.Output", ["donchianLow"] = "Donchian minimum.Output"
};
var wrapper = new DataPerformer.Portable.Wrappers.DataConsumerWrapper(consumer);
var rows = await wrapper.PerformIteratorAsync(query, map, CancellationToken.None);
if (rows == null || rows.Count != bars.Count) throw new Exception($"Expected {bars.Count} rows, got {rows?.Count}");
for (var i = 0; i < rows.Count; i++) {
    var row = rows[i];
    var date = ((DateTime)row["date"]).ToString("yyyy-MM-dd");
    if (date != bars[i].date || (double)row["close"] != bars[i].close) throw new Exception("Date/price alignment error");
    row["date"] = date;
    var events = new List<string>();
    if (row["buyPrice"] != null) events.Add("buy");
    if (row["sellPrice"] != null) events.Add("sell");
    row["events"] = events;
}
var metadata = JsonNode.Parse(File.ReadAllText(Path.Combine(root, ".build/metadata.json")))!;
metadata["implementation"] = "CSharp";
metadata["runtime"] = System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription;
var output = "{\n\"metadata\":" + metadata.ToJsonString() + ",\n\"records\":[\n" +
    string.Join(",\n", rows.Select(row => JsonSerializer.Serialize(row))) + "\n]}\n";
File.WriteAllText(Path.Combine(root, "Trading_CSharp.json"), output);
Console.WriteLine($"CSharp: {rows.Count} rows");

record Bar(string date, double open, double high, double low, double close, decimal volume);

sealed class FileHistory(List<Bar> bars) : ITradingDatabaseHistoryInterface {
    public Task<Dictionary<string, object>> GetSymbolsAsync(CancellationToken token) =>
        Task.FromResult(new Dictionary<string, object> { ["AAPL"] = "AAPL" });
    public List<HistoricalDataMessageDateTime> GetHistoricalDataMessageDateTimes(object id, DateTime begin, DateTime end) =>
        bars.Where(b => DateTime.Parse(b.date) >= begin && DateTime.Parse(b.date) < end).Select(b =>
            new HistoricalDataMessageDateTime { date = DateTime.Parse(b.date), open = b.open, high = b.high,
                low = b.low, close = b.close, volume = b.volume }).ToList();
    public Task<List<HistoricalDataMessageDateTime>> GetHistoricalDataMessageDateTimesAsync(object id,
        DateTime begin, DateTime end, CancellationToken token) => Task.FromResult(GetHistoricalDataMessageDateTimes(id, begin, end));
    public void DeleteBySymbol(string symbol) => throw new NotSupportedException("Read-only fixture");
    public Task DeleteBySymbolAsync(string symbol, CancellationToken token) => throw new NotSupportedException("Read-only fixture");
    public void FillHisrory(string name, List<HistoricalDataMessageDateTime> data) => throw new NotSupportedException("Read-only fixture");
    public Task FillHisroryAsync(string name, List<HistoricalDataMessageDateTime> data, CancellationToken token) => throw new NotSupportedException("Read-only fixture");
}
