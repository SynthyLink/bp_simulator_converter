using BaseTypes.Attributes;

using Diagram.UI;
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
            l.Add("\t}");
            l.Add("}");
            return l;
        }

        List<string> CreateOrder(string preffix, object obj)
        {
            List<string> l = new List<string>();
            var dq = obj as Order;
            var s = performer.ClassString(preffix, "TradingOrder");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
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
