using BaseTypes.Attributes;
using BaseTypes.CodeCreator.Interfaces;
 
using DataPerformer.Interfaces;

using Diagram.UI;
using Diagram.UI.Interfaces;

using FormulaEditor.Interfaces;

namespace DataPerformer.Formula.TypeScript
{
    /// <summary>
    /// Creator of TS code
    /// </summary>
    [Language("TS")]
    internal class TSClassCodeCreator : IClassCodeCreator, 
        IFeedbackCollectionCodeCreator, IDictionaryCodeCreator<string, string>,
        IDictionaryCodeCreator<string, object>,
        IAliasCodeCreator
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

        static readonly Dictionary<Func<object, bool>, Func<string, object, IClassCodeCreator, List<string>>> dictionary =
         new Dictionary<Func<object, bool>, Func<string, object, IClassCodeCreator, List<string>>>()
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
                    return dictionary[key](preffix, obj, this);
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


        static List<string> CreateTreeCollection(string preffix, ITreeCollection obj, IClassCodeCreator creator)
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
                var cc = creator as IAliasCodeCreator;
                var la = cc.Create("map", ali).Values.ToArray()[0];
                if (la.Count > 0)
                {
                    formulaPerformer.Add(l, la, 2);
                }
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
            if (obj is IFeedbackCollectionHolder feedback)
            {

                var dcc = creator as IFeedbackCollectionCodeCreator;
                var ll = dcc.Create(feedback).Values.ToArray()[0];
                formulaPerformer.Add(l, ll, 1);
            }

            l.Add("}");
            return l;
        }

        static List<string> CreateRecursive(string preffix, object obj, IClassCodeCreator cc)
        {
            return CreateTreeCollection(preffix, obj as ITreeCollection, cc);
        }


        static List<string> CreateDiffrerentialSolver(string preffix, object obj, IClassCodeCreator cc)
        {
            return CreateTreeCollection(preffix, obj as ITreeCollection, cc);
        }



        

        static void AddPost(List<string> l)
        {
          /*  l.Add("postSetArrow() : void {");
            l.Add("\tthis.init();");
            
            l.Add("}");
          */
        }


        static List<string> CreateVectorConsumer(string preffix, object obj, IClassCodeCreator cc)
        {
            return CreateTreeCollection(preffix, obj as ITreeCollection, cc);
        }

        Dictionary<string, List<string>> IFeedbackCollectionCodeCreator.Create(IFeedbackCollectionHolder holder)
        {
            var d = new Dictionary<string, List<string>>();
            d["code"] = Create(holder);
            return d;
        }

        IDictionaryCodeCreator<string, string> dcc => this;

 
        private List<string> Create(IFeedbackCollectionHolder holder)
        {
            var feedback = holder.Feedback;
            var l = new List<string>();
            if (feedback is IFeedbackAliasCollection fa)
            {
                feedback.Fill();
                var d = fa.Dictionary;
                if (d.Count > 0)
                {
                    l.Add("setFeedback(): void {");
                    var ll = dcc.Create("map", fa.Dictionary).Values.ToArray()[0];
                    ll.Add("this.feedback = new FeedbackAliasCollection(map, this, this);");
                    formulaPerformer.Add(l, ll, 1);
                    l.Add("}");
                }
            }
            return l;
        }

        public static Dictionary<string, List<string>> Create(string id, Dictionary<string, string> dictionary)
        {
            var l = new List<string>();
            l.Add("let " + id + " = new Map<string, string>(");
            int n = dictionary.Count;
            int i = 0;
            l.Add("[");
            if (n == 0)
            {
                l.Add("]);");
            }
            else
            {
                foreach (var t in dictionary)
                {
                    var s = "\t[\"" + t.Key + "\", \"" + t.Value + "\" ]";
                    if (i < (n - 1))
                    {
                        s += ',';
                    }
                    l.Add(s);
                    ++i;
                }
                l.Add("]);");
            }


            var d = new Dictionary<string, List<string>>();
            d["code"] = l;
            return d;
        }

        Dictionary<string, List<string>> IDictionaryCodeCreator<string, string>.Create(string id, Dictionary<string, string> dictionary)
        {
            return Create(id, dictionary);
        }

        Dictionary<string, List<string>> IAliasCodeCreator.Create(string id, IAlias alias)
        {
            return Create(id, alias);

        }



        Dictionary<string, List<string>> Create(string id, IAlias alias)
        {
            Diagram.UI.Performer p = new Diagram.UI.Performer();
            IDictionaryCodeCreator<string, object> d = this;
            var dp = p.FromAlias(alias);
            var cd = d.Create("map", dp);
            return cd;
        }

        Dictionary<string, List<string>> IDictionaryCodeCreator<string, object>.Create(string id, Dictionary<string, object> dictionary)
        {
            List<string> l = new List<string>();
            l.Add("let " + id + " = new Map<string, any>(");
            int n = dictionary.Count;
            l.Add("[");
            if (n == 0)
            {
                l.Add("]);");
            }
            else
            {
                int i = 0;
                foreach (var item in dictionary)
                {
                    string s = item.Key;
                    s = "\t[\"" + s + "\", " + performer.StringValue(item.Value) + " ]";
                    if (i < (n - 1))
                    {
                        s += ',';
                    }
                    l.Add(s);
                }
                l.Add("]);");
            }
            Dictionary<string, List<string>> d = new();
            d["code"] = l;
            return d;
        }
    }
}
