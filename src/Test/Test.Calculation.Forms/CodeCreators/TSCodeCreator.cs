using BaseTypes.Attributes;
using Diagram.UI;
using Diagram.UI.Interfaces;

namespace Test.Calculation.Forms.CodeCreators
{
    [Language("TS")]
    internal class TSCodeCreator : IClassCodeCreator
    {

        
        static Diagram.UI.TypeScript.Performer performer = new ();

        internal TSCodeCreator()
        {
            this.AddCodeCreator();
        }


        List<string> IClassCodeCreator.CreateCode(string preffix, object obj)
        {
            if (obj is ObjectTransformer ot)
            {
                var l = CreateObjectTransformer(preffix, ot);
                return l;
            }
            return null;
            
        }

        static List<string> CreateObjectTransformer(string preffix, ObjectTransformer ot)
        {
            List<string> l = new List<string>();
            var s = performer.ClassString(preffix, "TestObjectTransformer");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t\tthis.coefficient = " + ot.Coefficient + ";");
            l.Add("\t}");
            l.Add("}");
            return l;
        }
    }
}
