using System.Threading;
using System.Threading.Tasks;

namespace Diagram.Interfaces
{
    /// <summary>
    /// Initializastion task
    /// </summary>
    public interface IInitializeTask
    {
        Task Initialize(CancellationToken cancellationToken);

    }
}
