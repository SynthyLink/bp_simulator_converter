using BaseTypes.Attributes;
using Diagram.UI;
using Trading.Library.Objects;

namespace Trading.Java
{
    [Language("Java")]
    public class ClassCodeCreator : Diagram.Java.ClassCodeCreator
    {
        internal ClassCodeCreator() : base(false)
        {
            this.AddClassCodeCreator();
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                   { (object o) => { return o is DataQuery; } , CreateDataQuery },
                   { (object o) => { return o is Order; } , CreateOrder },
              };

            classes = new Dictionary<string, string>()
            {
                {"DataQuery", "external.trading.library.objects.DataQuery" },
                {"Order", "external.trading.library.objects.Order" }
            };
        }


        List<string> CreateOrder(string preffix, object obj)
        {
            var order = obj as Order;
            var l = new List<string>();
            l.Add("\tbuyPrice =  " + Performer.Wrap(order.BuyPrice) + ";");
            l.Add("\tsellPrice = " + Performer.Wrap(order.SellPrice) + ";");
            l.Add("\tposition = " + Performer.Wrap(order.Position) + ";");
            l.Add("}");
            l.Add("}");
            return l;
        }

        protected String buyPrice = "";

        protected String sellPrice = "";

        protected String position = "";


        List<string> CreateDataQuery(string preffix, object obj)
        {
            var dq = obj as DataQuery;
            var l = new List<string>();
            l.Add("\tid =  " + Performer.Wrap(dq.Object) + ";");
            l.Add("\tperiod = " + Performer.Wrap(dq.Period) + ";");
            l.Add("\tbegin = " + dq.Begin.ToOADate() + ";");
            l.Add("\tend = " + dq.End.ToOADate() + ";");
            l.Add("}");
            l.Add("}");
            return l;
        }

    }
}