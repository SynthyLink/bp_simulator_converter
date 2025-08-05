using System.Collections.Generic;

using DataPerformer.Interfaces;

using Diagram.UI.Interfaces;


namespace DataPerformer.Portable
{
    public class FeedbackAliasCollection : Diagram.UI.FeedbackAliasCollection
    {
        Performer performer = new Performer();

        IDataConsumer dataConsumer; 


        List<IFeedbackAlias> aliases = new List<IFeedbackAlias>();

        public FeedbackAliasCollection(IDataConsumer dataConsumer, Dictionary<string, string> dictionary) :
            base(dictionary)
        {
            this.dataConsumer = dataConsumer;
        }

        public void Fill()
        {
            aliases.Clear();
            performer.Fill(this, dataConsumer);
        }
    }
}
