using BaseTypes.Attributes;
using Diagram.UI;
using Diagram.UI.CodeCreators.Interfaces;
using Diagram.UI.Interfaces;

namespace Test.Calculation.Forms.CodeCreators
{
    [Language("C#")]
    internal class CSCodeCreator : IClassCodeCreator
    {
        internal CSCodeCreator()
        {
            this.AddCodeCreator();
        }


        protected IDesktopCodeCreator DesktopCodeCreator
        { get; set; }

        IDesktopCodeCreator IClassCodeCreator.DesktopCodeCreator
        {
            get => DesktopCodeCreator; set => DesktopCodeCreator = value;
        }


        List<string> IClassCodeCreator.CreateCode(string preffix, object obj)
        {
            if (obj is ObjectTransformer transformer)
            {
                var l = new List<string>();
                string pr = preffix;
                if (pr[pr.Length - 1] != '.')
                {
                    pr = pr + ".";
                }
                l.Add("Test.Calculation.Forms.ObjectTransformer");
                l.Add("{");
                l.Add("");
                l.Add("\tinternal CategoryObject()");
                l.Add("\t{");
                l.Add("\t\tCoefficient = " + transformer.Coefficient + ");");
                l.Add("\t}");
                l.Add("}");
                return l;
            }
            return null;
        }

    }
}
