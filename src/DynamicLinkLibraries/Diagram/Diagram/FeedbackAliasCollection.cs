using System.Collections.Generic;

using Diagram.UI.Interfaces;

namespace Diagram.UI
{
    public class FeedbackAliasCollection : IFeedbackAliasCollection
    {
        public FeedbackAliasCollection(Dictionary<string, string> dictionary)
        {
            Dictionary = dictionary;
        }

        protected virtual Dictionary<string, string> Dictionary { get; set; }

        protected virtual List<IFeedbackAlias> FeedbackAliases { get; set; }

        Dictionary<string, string> IFeedbackAliasCollection.Dictionary => Dictionary;

        IEnumerable<IFeedbackAlias> IFeedbackAliasCollection.Aliases => FeedbackAliases;

        void IFeedbackAliasCollection.Add(IFeedbackAlias alias)
        {
            FeedbackAliases.Add(alias);
        }

        void IFeedbackAliasCollection.Set()
        {
            var f = FeedbackAliases;
            foreach (var alias in f)
            {
                alias.Set();
            }
        }
    }
}
