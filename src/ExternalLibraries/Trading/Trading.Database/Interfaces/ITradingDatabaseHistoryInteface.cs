using IBApi.messages;

namespace Trading.Database.Interfaces
{
    /// <summary>
    /// History of trading
    /// </summary>
    public interface ITradingDatabaseHistoryInteface
    {
        /// <summary>
        /// Deletes a symbol
        /// </summary>
        /// <param name="symbol"></param>
        Task DeleteBySymbol(string symbol, CancellationToken token);

        void DeleteBySymbol(string symbol);

        /// <summary>
        /// Fill historty
        /// </summary>
        /// <param name="name">Name of symbol</param>
        /// <param name="data">Historical data</param>

        Task FillHisrory(string name, List<HistoricalDataMessageDateTime> data, CancellationToken token);

        void FillHisrory(string name, List<HistoricalDataMessageDateTime> data);


        /// <summary>
        /// Gets historical message
        /// </summary>
        /// <param name="id">Id</param>
        /// <param name="begin">Begin</param>
        /// <param name="end">End</param>
        /// <returns>The messages</returns>
        Task<List<HistoricalDataMessageDateTime>> GetHistoricalDataMessageDateTimes(object id,
            DateTime begin, DateTime end, CancellationToken token);

        List<HistoricalDataMessageDateTime> GetHistoricalDataMessageDateTimes(object id,
       DateTime begin, DateTime end);




        /// <summary>
        /// Symbols
        /// </summary>
        Task<Dictionary<string, Guid>> GetSymbols(CancellationToken token);

        Dictionary<string, Guid> Symbols { get; }

    }
}