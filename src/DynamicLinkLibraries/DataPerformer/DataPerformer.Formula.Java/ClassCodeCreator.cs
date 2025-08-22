using BaseTypes.Attributes;
using DataPerformer.Interfaces;
using Diagram.UI;
using Diagram.UI.Attributes;
using ErrorHandler;
using FormulaEditor;
using FormulaEditor.Interfaces;
using System.Threading;

namespace DataPerformer.Formula.Java
{
    /// <summary>
    /// Creator of TS code
    /// </summary>
    [Language("Java")]
    internal class ClassCodeCreator : Diagram.Java.ClassCodeCreator, ITreeCollectionCodeCreator
    {
        public ClassCodeCreator() : base(false)
        {
            this.AddCodeCreator();
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                   { (object o) => { return o is VectorFormulaConsumer; } , CreateVectorConsumer }
       //          { (object o) => { return o is DifferentialEquationSolver; } , CreateDiffrerentialSolver },
           //      { (object o) => { return o is Recursive; } , CreateRecursive },
          };

            classes = new Dictionary<string, string>()
            {
                {"VectorFormulaConsumer", "measurements.DataConsumerMeasurements" }
            };
        }

    
        List<string> CreateVectorConsumer(string preffix, object obj)
        {
            return new List<string>(){"}"} ;
        }


        #region ITreeCalculatorCodeCreator Members

        Dictionary<string, List<string>> ITreeCollectionCodeCreator.CreateCode(object obj, ObjectFormulaTree[] trees,
            string className, string constructorModifier, bool checkValue)
        {
            Object = obj;
            this.trees = trees;
            IList<string> variables;
            IList<string> initializers;
            List<string> l = new List<string>();
            //          l.Add(" : FormulaEditor.Interfaces.ITreeCollectionProxy");
            //        local = null;
            var lt = PreCreateCode(obj, out local, out variables, out initializers, className);
            List<string> ltt = PostCreateCode(local, obj, lt, variables, initializers,
                         constructorModifier + " " + className,
                         checkValue);
            var ltr = local.Trees;
            formulaPerformer.Add(l, ltt, 0);
            var output = new Dictionary<string, Tuple<int, object>>();
            if (obj is IStringTreeDictionary dictionary)
            {
                output = DataPerformerFormula.GetOutput(dictionary, ltr);
            }
            else if (obj is IMeasurements mm)
            {
                output = DataPerformerFormula.GetOutput(mm, ltr);
            }
            var ll = new List<string>();
            ll.Add("save() : void {");
            var s = "\tvar v = this.variables;";
            var attr = formulaPerformer.GetAttribute<CodeCreatorAttribute>(obj);
            if (attr != null)
            {
                if (attr.IsSysemOfDifferentialEquations)
                {
                    s = "\tvar v = this.derivations;";
                }
            }
            ll.Add(s);
            var mea = obj as IMeasurements;
            var kk = 0;
            foreach (var k in output)
            {
                var st = "x" + kk;
                ++kk;
                ll.Add("\tvar " + st + " = v.get(" + "\"" + k.Key + "\");");
                ll.Add("\t" + st + "?.setIValue(this.get_" + k.Value.Item1 + "());");
            }
            ll.Add("}");
            l.AddRange(ll);
            l.Add("");
            var d = new Dictionary<string, List<string>>();
            d["code"] = l;
            return d;
        }

        #endregion



    }
}