using BaseTypes.Attributes;
using Diagram.UI;

namespace Test.Calculation.Forms.CodeCreators
{
    [Language("Java")]
    internal class JavaCodeCreator : Diagram.Java.ClassCodeCreator

    {
        Performer performer = new Performer();
        public JavaCodeCreator() : base(false)
        {
           this.AddClassCodeCreator();
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                   { (object o) => { return o is ObjectTransformer; } , CreateObjectTransformer }
       //          { (object o) => { return o is DifferentialEquationSolver; } , CreateDifferentialSolver },
           //      { (object o) => { return o is Recursive; } , CreateRecursive },
          };

            classes = new Dictionary<string, string>()
            {
                {"ObjectTransformer", "external.test.TestObjectTransformer" }
            };
        }




        List<string> CreateObjectTransformer(string preffix, object obj)
        {
            var tr = obj as ObjectTransformer;
            return new List<string>() {
               "\tcoefficient = " + performer.DoubleToString(tr.Coefficient) + ";",
                "}" };
        }

    }
}
