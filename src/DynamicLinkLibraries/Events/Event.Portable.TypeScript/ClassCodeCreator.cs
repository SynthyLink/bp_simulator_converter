using BaseTypes.Attributes;
using Diagram.UI;
using Diagram.UI.Interfaces;
using Event.Interfaces;
using Event.Portable.Arrows;
using Event.Portable.Events;

namespace Event.Portable.TypeScript
{
    /// <summary>
    /// Creator of TS code
    /// </summary>
    [Language("TS")]
    public class ClassCodeCreator : Diagram.UI.TypeScript.ClassCodeCreator
    {
        protected ClassCodeCreator(bool b) : base(b) { }



        internal ClassCodeCreator() : base(true)
        {
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                      { (object o) => { return o is Events.Timer; } , CreateTimer },
                      { (object o) => { return o is EventLink; }, CreateEventLink},
                      { (object o) => { return o is ForcedEventData; }, CreateForced}
           };


            this.AddClassCodeCreator();
        }

        List<string> CreateTimer(string preffix, object obj)
        {

            var l = new List<string>();
            var timer = obj as ITimerEvent;
            var s = performer.ClassString(preffix, "TimerObject");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            var span = timer.TimeSpan;
            var ss = span.Milliseconds + "";
            l.Add("\t\tthis.span = TimeSpan.fromMilliseconds(" + ss + ")");
            l.Add("\t}");
            l.Add("}");
            return l;
        }

        List<string> CreateEventLink(string preffix, object obj)
        {

            var l = new List<string>();
            var s = performer.ClassString(preffix, "EventLink");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t}");
            l.Add("}");
            return l;
        }

        List<string> CreateForced(string preffix, object obj)
        {
            var tc = TypeCreator;
            var l = new List<string>();
            var forced = obj as ForcedEventData;
            IAlias ali = forced;
            var s = performer.ClassString(preffix, "Input");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            foreach (var al in ali.AliasNames)
            {
                var t = "\t\tthis.array.push([ ";
                t += tc.GetStringValue(al) + " ,";
                t += tc.GetDefaultValue(ali.GetType(al)) + ", ";
                t += tc.GetDefaultValue(ali[al]) + "])";
                l.Add(t);
            }
            l.Add("\t\tthis.createAll()");
            l.Add("\t}");
            l.Add("}");
            return l;
        }



    }
}
