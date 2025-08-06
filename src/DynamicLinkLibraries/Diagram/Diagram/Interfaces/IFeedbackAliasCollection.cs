
using System.Collections.Generic;

namespace Diagram.UI.Interfaces
{
    /// <summary>
    /// Feedback alias connection
    /// </summary>
    public interface IFeedbackAliasCollection
    {
        /// <summary>
        /// Dictionary
        /// </summary>
        Dictionary<string, string> Dictionary { get; }
        
        /// <summary>
        /// Aliases
        /// </summary>
        IEnumerable<IFeedbackAlias> Aliases { get; }

        /// <summary>
        /// Adds alias
        /// </summary>
        /// <param name="alias">The alias</param>
        void Add(IFeedbackAlias alias);

        /// <summary>
        /// Fills itself
        /// </summary>
        void Fill();

        /// <summary>
        /// Holder
        /// </summary>
        IFeedbackAliasCollectionHolder Holder { get; }

        /// <summary>
        /// Sets itself
        /// </summary>
        void Set();


    }
}
