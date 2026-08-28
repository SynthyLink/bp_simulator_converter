using DataPerformer.Interfaces;
using Trading.Library.Objects;
using NamedTree.Interfaces;

namespace AspireTradingApp.Server
{
    public class ShowsObject : IShowObject
    {
        bool first = true;

        DataPerformer.Portable.Performer performer = new();

        DataPerformer.Portable.Wrappers.DataConsumerWrapper wrapper;

        IMeasurement dt;
        public ShowsObject()
        {
        }

        bool IShowObject.Show(object sender, params object[] args)
        {
            if (sender is Order order)
            {
                return Show(order, args);
            }
           return false;
        }

        bool Show(Order sender, params object[] args)
        {
            if (first)
            {
                first = false;
                wrapper = new DataPerformer.Portable.Wrappers.DataConsumerWrapper(sender);
                dt = wrapper.FindMeasurement("Trading.RealTime");
            }
            var time = (double)dt.Parameter();
            var open = sender.IsOpened;
            if (open != null)
            {

            }
            var inc = sender.ClosedIncome;
            return true;
        }
    }
}
