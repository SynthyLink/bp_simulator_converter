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

        double currentTime;



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
            currentTime = (double)dt.Parameter();
            if (currentTime == 808)
            {

            }
            if (currentTime < 808)
            {
                return false;
            }
            var open = sender.IsOpened;
            if (open != null)
            {

            }
            var inc = sender.ClosedIncome;
            return true;
        }

        public void Order_OrderChanged(Order arg1, global::Trading.Library.Enums.PositionDirection arg2)
        {
            if (currentTime < 805)
            {
                return;
            }
            
        }

        public void Order_SellBuyChanged(Order arg1, string arg2, double arg3, double arg4)
        {
            if (this.currentTime < 805)
            {
                return;
            }
            else
            {

            }

        }
    }
}
