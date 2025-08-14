using System.Threading;

namespace Diagram.UI.Interfaces
{
    /// <summary>
    /// Cancellation object
    /// </summary>
    public interface ICancellation
    {
        /// <summary>
        /// Read token
        /// </summary>
        CancellationToken CancellationToken { get; }

        /// <summary>
        /// Creates tokem
        /// </summary>
        /// <returns></returns>
        CancellationToken CreateCancellationToken();
    }
}
