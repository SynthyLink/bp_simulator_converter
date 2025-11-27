using BaseTypes.Attributes;
using Diagram.UI;
using Trading.Library.Objects;

namespace Trading.Library.CodeCreators
{
    [Language("C#")]
    internal class ClassCodeCreator : Diagram.UI.CodeCreators.BaseClassCodeCreator
    {
        internal ClassCodeCreator() : base(false)
        {
            this.AddClassCodeCreator();
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
            {
                { (o) => { return o is DataQuery; }, CreateDataQuery },
               { (o) => { return o is Order; }, CreateOrder },
               { (o) => { return o is Fiction; }, CreateFiction }

            };
        }


        List<string> CreateOrder(string preffix, object obj)
        {
            List<string> l = new List<string>();
            string pr = preffix;
            if (pr[pr.Length - 1] != '.')
            {
                pr = pr + ".";
            }
            Order order = obj as Order;
            l.Add("Trading.Library.Objects.Order");
            l.Add("{");
            l.Add("");
            l.Add("\tinternal CategoryObject()");
            l.Add("\t{");
            l.Add("\t\tbuyPrice = \"" + order.BuyPrice + "\";");
            l.Add("\t\tsellPrice = \"" + order.SellPrice + "\";");
            l.Add("\t\tposition = \"" + order.Position + "\";");
            l.Add("\t\tdate = \"" + order.Date + "\";");
            l.Add("\t}");
            l.Add("}");
            return l;
        }


        List<string> CreateDataQuery(string preffix, object obj)
        {
            List<string> l = new List<string>();
            string pr = preffix;
            if (pr[pr.Length - 1] != '.')
            {
                pr = pr + ".";
            }
            DataQuery dq = obj as DataQuery;
            l.Add("Trading.Library.Objects.DataQuery");
            l.Add("{");
            l.Add("");
            l.Add("\tinternal CategoryObject()");
            l.Add("\t{");
            var o = dq.Object;
            var s = o.ToString();
            if (o.GetType() == typeof(Guid))
            {
                l.Add("\t\tObject = new Guid(\"" + s + "\");");
            }
            l.Add("\t\tPeriod = \"" + dq.Period + "\";");
            var ts = dq.Begin.Ticks;
            s = ts.ToString();
            l.Add("\t\tBegin = System.DateTime.FromBinary(" + ts + ");");
            ts = dq.End.Ticks;
            l.Add("\t\tEnd = System.DateTime.FromBinary(" + ts + ");");
            l.Add("\t}");
            l.Add("}");
            return l;
        }


        List<string> CreateFiction(string preffix, object obj)
        {
            List<string> l = new List<string>();
            string pr = preffix;
            if (pr[pr.Length - 1] != '.')
            {
                pr = pr + ".";
            }
            var fiction  = obj  as Fiction;
            l.Add("Trading.Library.Objects.Fiction");
            l.Add("{");
            l.Add("");
            l.Add("\tinternal CategoryObject()");
            l.Add("\t{");
            l.Add("\t}");
            l.Add("}");
            return l;
        }


    }
}
