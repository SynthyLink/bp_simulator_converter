
using System.Collections.Generic;

namespace Diagram.UI.Interfaces
{
    public interface IFeedbackAliasCollection
    {
        Dictionary<string, string> Dictionary { get; }
        
        IEnumerable<IFeedbackAlias> Aliases { get; }

        void Add(IFeedbackAlias alias);

        void Set();


    }
}
