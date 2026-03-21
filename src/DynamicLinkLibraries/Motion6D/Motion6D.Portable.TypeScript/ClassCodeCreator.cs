using BaseTypes.Attributes;
using Diagram.UI;
using System.ComponentModel;

namespace Motion6D.Portable.TypeScript
{
    [Language("TS")]
    public class ClassCodeCreator : DataPerformer.Portable.TypeScript.ClassCodeCreator
    {
        protected ClassCodeCreator(bool b) : base(b) { }



        internal ClassCodeCreator() :base(true)
        {
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                      { (object o) => { return o.GetType().Name.Contains("RigidReferenceFrame"); } , CreateReferenceFrame },
                      { (object o) => { return o is ReferenceFrameArrow; } , CreateReferenceFrameArrow },
                  { (object o) => { return o is ReferenceFrameData; } , CreateReferenceFrameData},
        /*        { (object o) => { return o is FilterWrapper; } ,CreateFilterWrapper},
             { (object o) => { return o is DataLink; } ,CreateDataLink},
              { (object o) => { return o is ObjectTransformerLink; } , CreateObjectTransformerLink},
               { (object o) => { return o is IteratorConsumerLink; } , CreateIteratorConsumerLink},*/
         };


            this.AddClassCodeCreator();
        }

        List<string> CreateReferenceFrame(string preffix, object obj)
        {

            var l = new List<string>();
            var frame = obj as RigidReferenceFrame;
            var s = performer.ClassString(preffix, "RigidReferenceFrame");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t\tthis.relativePosition = []");
            l.Add("\t\tthis.relativeQuaternion = []");
            var ll = Get("relativePosition", frame.RelativePosition);
            Add(l, ll, 1);
            ll = Get("relativePosition", frame.RelativeQuaternion);
            Add(l, ll, 1);
            l.Add("\t}");
            l.Add("}");
            return l;
        }

        List<string> CreateReferenceFrameData(string preffix, object obj)
        {

            var l = new List<string>();
            var frame = obj as ReferenceFrameData;
            var s = performer.ClassString(preffix, "ReferenceFrameData");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            var ll = Get("this.parametersList", frame.Parameters);
            Add(l, ll, 0);
            l.Add("\t}");
            l.Add("}");
            return l;
        }



        List<string> CreateReferenceFrameArrow(string preffix, object obj)
        {
 
            var l = new List<string>();
            var s = performer.ClassString(preffix, "ReferenceFrameArrow");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t}");
            l.Add("}");
            return l;
        }

    }
}
