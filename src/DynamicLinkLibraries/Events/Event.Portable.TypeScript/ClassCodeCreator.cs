using BaseTypes.Attributes;
using Diagram.UI;
using Event.Interfaces;
using Event.Portable.Arrows;

namespace Event.Portable.TypeScript
{
    /// <summary>
    /// Creator of TS code
    /// </summary>
    [Language("TS")]
    public class ClassCodeCreator : Diagram.TypeScript.ClassCodeCreator
    {
        protected ClassCodeCreator(bool b) : base(b) { }



        internal ClassCodeCreator() : base(true)
        {
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                      { (object o) => { return o is Events.Timer; } , CreateTimer },
                      { (object o) => { return o is EventLink; }, CreateEventLink}
            /*      { (object o) => { return o is ReferenceFrameData; } , CreateReferenceFrameData},
        /*        { (object o) => { return o is FilterWrapper; } ,CreateFilterWrapper},
             { (object o) => { return o is DataLink; } ,CreateDataLink},
              { (object o) => { return o is ObjectTransformerLink; } , CreateObjectTransformerLink},
               { (object o) => { return o is IteratorConsumerLink; } , CreateIteratorConsumerLink},*/
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


    }
}
