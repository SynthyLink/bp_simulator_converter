using Diagram.UI.Attributes;
using Diagram.UI.Interfaces;

namespace Test.Calculation.Forms.CodeCreators
{
    [Language("TS")]
    internal class TSCodeCreator : IClassCodeCreator
    {
        static Diagram.TypeScript.Performer performer = new Diagram.TypeScript.Performer();


        List<string> IClassCodeCreator.CreateCode(string preffix, object obj)
        {
            if (obj is ObjectTransformer ot)
            {
                var l = new List<string>();
                return l;
            }
            return null;
            
        }

        static List<string> CreateObjectTransformer(string preffix, ObjectTransformer ot)
        {
            List<string> l = new List<string>();
            var s = performer.ClassString(preffix, "ObjectTransformer");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t}");
            l.Add("}");
            return l;
        }
    }
}
