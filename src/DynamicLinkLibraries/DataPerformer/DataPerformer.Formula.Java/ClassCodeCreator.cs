using BaseTypes.Attributes;
using DataPerformer.Interfaces;
using Diagram.UI;
using Diagram.UI.Interfaces;
using FormulaEditor;
using FormulaEditor.Interfaces;

namespace DataPerformer.Formula.Java
{
    /// <summary>
    /// Creator of TS code
    /// </summary>
    [Language("Java")]
    internal class ClassCodeCreator : Diagram.Java.ClassCodeCreator, 
        ITreeCollectionCodeCreator, IVariablesCodeCreator
    {

        Performer performer = new Performer();
        public ClassCodeCreator() : base(false)
        {
           
            this.AddClassCodeCreator();
            this.AddTreeCollectionCodeCreator();
            this.AddVariableCodeCreator();
            
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                   { (object o) => { return o is VectorFormulaConsumer; } , CreateObjectTreeObject }
       //          { (object o) => { return o is DifferentialEquationSolver; } , CreateDiffrerentialSolver },
           //      { (object o) => { return o is Recursive; } , CreateRecursive },
          };

            classes = new Dictionary<string, string>()
            {
                {"VectorFormulaConsumer", "measurements.VectorFormulaConsumer" }
            };
        }

        

        Dictionary<string, List<string>> ITreeCollectionCodeCreator.CreateCode(object obj, ObjectFormulaTree[] trees, string className,
            string constructorModifier, bool checkValue)
        {
            return CreateCode(obj, trees, className, constructorModifier, checkValue);
        }

        List<string> CreateObjectTreeObject(string preffix, object obj)
        {
            return new List<string>(){"}"} ;
        }

        protected virtual Dictionary<string, List<string>> CreateCode(object obj, ObjectFormulaTree[] trees,
            string className, string constructorModifier, bool checkValue)
        {
            throw new ErrorHandler.OwnNotImplemented();
        }

        Dictionary<string, List<string>> IVariablesCodeCreator.Create(IMeasurements measurements)
        {
            throw new ErrorHandler.OwnNotImplemented();
        }

        static List<string> CreateTreeCollection(string preffix, ITreeCollection obj, Diagram.TypeScript.CodeCreator creator)
        {
            var l = new List<string>();
            bool check = true;
            ITreeCollectionCodeCreator treeCollectionCodeCreator = ;
            var lt = treeCollectionCodeCreator.CreateCode(obj, obj.Trees, preffix, "internal ", check);

            if (treeCollectionCodeCreator is IAdditionalClassCodeCreator add)
            {
                var classes = add.AdditionalCode;
                if (classes != null && classes.Count > 0)
                {
                    l.Add("");
                    l.Add("");
                    performer.Add(l, classes, 0);
                    l.Add("");
                    l.Add("");
                }
            }
            var cs = ClassString(preffix, obj);
            l.Add(cs);
            l.Add("{");
            performer.AddObjectConstructor(l);
            if (obj is IAlias ali)
            {
                var cc = creator as IAliasCodeCreator;
                var la = cc.Create("map", ali).Values.ToArray()[0];
                if (la.Count > 0)
                {
                    performer.Add(l, la, 2);
                }
                l.Add("\t\tthis.performer.setAliasMap(map, this);");
            }
            if (obj is IMeasurements m)
            {
                var la = CreateTSVariableList(m);
                performer.Add(l, la, 2);
            }


            if (obj is IInitialDictionary d) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            {

                var dic = d.Dictionary;
                foreach (var k in dic)
                {
                    var iname = "\"" + k.Key + "\"";
                    // !!!!   l.Add("\t\tthis.initial.set(" + iname + ", " + k.Value + ");");
                }
            }
            l.Add("\t}");
            l.Add("");
            performer.Add(l, lt.Values.ToArray()[0], 1);
            AddPost(l);
            if (obj is IFeedbackCollectionHolder feedback)
            {

                var dcc = creator as IFeedbackCollectionCodeCreator;
                var ll = dcc.Create(feedback).Values.ToArray()[0];
                performer.Add(l, ll, 1);
            }

            l.Add("}");
            return l;
        }


    }
}