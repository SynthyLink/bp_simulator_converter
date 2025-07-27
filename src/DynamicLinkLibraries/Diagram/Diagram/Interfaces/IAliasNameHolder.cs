using Diagram.UI.Interfaces;

namespace Diagram.Interfaces
{
    /// <summary>
    /// Holder of alias
    /// </summary>
    public interface IAliasNameHolder
    {
        /// <summary>
        /// The alias
        /// </summary>
        IAliasName AliasName { get; }
    }
}
