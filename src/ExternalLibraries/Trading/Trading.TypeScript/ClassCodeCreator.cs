using BaseTypes.Attributes;

using Diagram.UI;
using System.ComponentModel.DataAnnotations;
using Trading.Library.Objects;

namespace Trading.TypeScript
{
    [Language("TS")]
    internal class ClassCodeCreator : Diagram.UI.TypeScript.ClassCodeCreator
    {

        internal ClassCodeCreator() : base(false)
        {
            this.AddClassCodeCreator();
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
            {
                      { (object o) => { return o is DataQuery; } , CreateDataQuery },
              { (object o) => { return o is Order; }, CreateOrder},
                   { (object o) => { return o is Fiction; } , CreateFiction},
          };

        }

         List<string> CreateDataQuery(string preffix, object obj)
        {
            List<string> l = new List<string>();
            var dq = obj as DataQuery;
            var s = performer.ClassString(preffix, "TradingDataQuery");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            var p = dq.Object.ToString();
            var b = dq.Begin.ToOADate();
            var e = dq.End.ToOADate();
            var tt = dq.Period;
            var sm = dq.Symbol;
            l.Add("\t\tthis.begin = " + b);
            l.Add("\t\tthis.end = " + e);
            l.Add("\t\tthis.period = \"" + tt + "\"");
            l.Add("\t\tthis.symbol = \"" + sm + "\"");
            l.Add("\t}");
            l.Add("}");
            return l;
        }

        /*
       this.positionM = this.performer.getMeasurementDC(this, this.position)
        this.buyPriceM = this.performer.getMeasurementDC(this, this.buyPrice)
        this.sellPriceM = this.performer.getMeasurementDC(this, this.sellPrice)
        this.currentDate = this.performer.getMeasurementDC(this, this.date)
*/

        List<string> CreateOrder(string preffix, object obj)
        {
            List<string> l = new List<string>();
            var dq = obj as Order;
            var s = performer.ClassString(preffix, "TradingOrder");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t\tthis.position = \"" + dq.Position + "\"");
            l.Add("\t\tthis.buyPrice = \"" + dq.BuyPrice + "\"");
            l.Add("\t\tthis.sellPrice = \"" + dq.SellPrice + "\"");
            l.Add("\t\tthis.date = \"" + dq.Date + "\"");
            l.Add("\t}");
            l.Add("}");
            return l;
        }

        List<string> CreateFiction(string preffix, object obj)
        {
            List<string> l = new List<string>();
            var dq = obj as Order;
            var s = performer.ClassString(preffix, "FictionTrading");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t}");
            l.Add("}");
            return l;
        }



    }
}
