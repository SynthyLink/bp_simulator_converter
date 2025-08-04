namespace Diagram.UI.Interfaces
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
