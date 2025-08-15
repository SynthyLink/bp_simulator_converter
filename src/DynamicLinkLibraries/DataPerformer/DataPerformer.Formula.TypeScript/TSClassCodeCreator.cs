using BaseTypes.CodeCreator.Interfaces;
 
using DataPerformer.Interfaces;

using Diagram.UI.Attributes;
using Diagram.UI;
using Diagram.UI.Interfaces;

using FormulaEditor.Interfaces;

namespace DataPerformer.Formula.TypeScript
{
    /// <summary>
    /// Creator of TS code
    /// </summary>
    [Language("TS")]
    internal class TSClassCodeCreator : IClassCodeCreator
    {

        static DataPerformer.Interfaces.Performer nPerformer = new();

        static NamedTree.Performer formulaPerformer = new ();


        static Diagram.UI.TypeScript.Performer performer = new();



        #region Ctor
        internal TSClassCodeCreator()
        {
            this.AddCodeCreator();
        }
        #endregion

        static readonly Dictionary<Func<object, bool>, Func<string, object, List<string>>> dictionary =
         new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                   { (object o) => { return o is VectorFormulaConsumer; } , CreateVectorConsumer },
                 { (object o) => { return o is DifferentialEquationSolver; } , CreateDiffrerentialSolver },
                 { (object o) => { return o is Recursive; } , CreateRecursive },
          };

        List<string> IClassCodeCreator.CreateCode(string preffix, object obj)
        {
            foreach (Func<object, bool> key in dictionary.Keys)
            {
                if (key(obj))
                {
                    return dictionary[key](preffix, obj);
                }
            }
            return null;
        }

        public static string ClassString(string preffix, object obj)
        {

            var s = "class " + preffix;
            var extends = "";
            switch (obj)
            {
                case Recursive:
                    extends = "RecursiveFormula";
                    break;
                case VectorFormulaConsumer:
                    extends = "VectorFormulaConsumer";
                    break;
                case DifferentialEquationSolver:
                    extends = "DifferentrialEquationSolverFormula";
                    break;
                default:
                    throw new ErrorHandler.OwnNotImplemented();
            }
            if (extends != null)
            {
                s += " extends " + extends;
            }
            return s;
        }

        static ITypeCreator typeCreator = new TSTypeCreator();

        public static List<string> CreateTSVariableList(IMeasurements maeasurements)
        {
            var l = new List<string>();
            var n = maeasurements.Count;
            for (int i = 0; i < n; i++)
            {
                var m = maeasurements[i];
                var name = "\"" + m.Name + "\"";
                var type = m.Type;
                var v = typeCreator.GetDefaultValue(type);
                var pr = m.Parameter();
                var st = performer.StringValue(pr);
                l.Add("this.addVariableValue(" + name + ", " + v + ", " + st + ");");

            }
            return l;
        }




        static List<string> CreateTreeCollection(string preffix, ITreeCollection obj)
        {
            var l = new List<string>();
            bool check = true;
            ITreeCollectionCodeCreator treeCollectionCodeCreator = new TSTreeCollectionCodeCreator();
             var lt = treeCollectionCodeCreator.CreateCode(obj, obj.Trees, preffix, "internal ",  check);

            if (treeCollectionCodeCreator is IAdditionalClassCodeCreator add)
            {
                var classes = add.AdditionalCode;
                if (classes != null && classes.Count > 0)
                {
                    l.Add("");
                    l.Add("");
                    formulaPerformer.Add(l, classes, 0);
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
                var la = performer.CreateTSAliasList("map", ali);
                formulaPerformer.Add(l, la, 2);
                l.Add("\t\tthis.performer.setAliasMap(map, this);");
            }
            if (obj is IMeasurements m)
            {
                var la = CreateTSVariableList(m);
                formulaPerformer.Add(l, la, 2);
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
            formulaPerformer.Add(l, lt, 1);
            AddPost(l);
            if (obj is IFeedbackAliasCollectionHolder feedback)
            {
                var ll = performer.Create(feedback);
                formulaPerformer.Add(l, ll, 1);
            }

            l.Add("}");
            return l;
        }

        static List<string> CreateRecursive(string preffix, object obj)
        {
            return CreateTreeCollection(preffix, obj as ITreeCollection);
        }


        static List<string> CreateDiffrerentialSolver(string preffix, object obj)
        {
            return CreateTreeCollection(preffix, obj as ITreeCollection);
        }



        

        static void AddPost(List<string> l)
        {
          /*  l.Add("postSetArrow() : void {");
            l.Add("\tthis.init();");
            
            l.Add("}");
          */
        }


        static List<string> CreateVectorConsumer(string preffix, object obj)
        {
            return CreateTreeCollection(preffix, obj as ITreeCollection);
        }
    }
}
