using Diagram.UI.Interfaces;

namespace DataPerformer.Interfaces
{ 
    /// <summary>
    /// Feedback alias
    /// </summary>
    public interface IFeedbackAlias
    {
        /// <summary>
        /// Sets itself
        /// </summary>
        void Set();

        /// <summary>
        /// Alias name
        /// </summary>
        IAliasName AliasName { get; }
    }
}
