using System.Collections.Generic;

using DataPerformer.Interfaces;

using Diagram.UI.Interfaces;


namespace DataPerformer.Portable
{
    public class FeedbackAliasCollection : IFeedbackAliasCollection
    {
        Performer performer = new Performer();

        IDataConsumer dataConsumer; 


        List<IFeedbackAlias> aliases = new List<IFeedbackAlias>();

        public FeedbackAliasCollection(IDataConsumer dataConsumer, IFeedbackAliasCollectionHolder holder,  Dictionary<string, string> dictionary) 
        {
            this.Dictionary = dictionary;
            this.dataConsumer = dataConsumer;
            Holder = holder;
        }

        void IFeedbackAliasCollection.Fill()
        {
            aliases.Clear();
            performer.Fill(this, dataConsumer);
        }
        protected virtual Dictionary<string, string> Dictionary { get; set; }

        protected virtual IFeedbackAliasCollectionHolder Holder { get; set; }

        protected virtual List<IFeedbackAlias> FeedbackAliases { get; set; } = new();

        Dictionary<string, string> IFeedbackAliasCollection.Dictionary => Dictionary;

        IEnumerable<IFeedbackAlias> IFeedbackAliasCollection.Aliases => FeedbackAliases;

        IFeedbackAliasCollectionHolder IFeedbackAliasCollection.Holder => Holder;

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
