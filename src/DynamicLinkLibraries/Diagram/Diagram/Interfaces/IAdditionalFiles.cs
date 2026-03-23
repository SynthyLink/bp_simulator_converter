using System.Collections.Generic;

namespace Diagram.Interfaces
{
    /// <summary>
    /// Additional files
    /// </summary>
    public interface IAdditionalFiles
    {
        /// <summary>
        /// Additional files
        /// </summary>
        Dictionary<string, byte[]> Files { get; }

    }
}
