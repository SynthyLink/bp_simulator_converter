using BaseTypes;
using BaseTypes.Attributes;
using BaseTypes.CodeCreator.Interfaces;
using DataPerformer.Interfaces;
using Diagram.Interfaces;
using Diagram.UI.Attributes;
using Diagram.UI.Interfaces;
using ErrorHandler;
using FormulaEditor;
using FormulaEditor.CodeCreators;
using FormulaEditor.CodeCreators.Interfaces;
using FormulaEditor.Interfaces;
using System.Runtime.CompilerServices;
using System.Threading;

namespace DataPerformer.Formula.Java
{
    [Language("Java")]
    internal class TreeCollectionCodeCreator : ITreeCollectionCodeCreator
    {
        Performer performer = new Performer();

        object current;

        ObjectFormulaTree[] trees;

        ITypeCreator typeCreator;

        IClassCodeCreator classCodeCreator;


        protected ITreeCollection collection = null;



        internal TreeCollectionCodeCreator()
        {
            this.AddTreeCollectionCodeCreator();

        }

        Dictionary<string, List<string>> ITreeCollectionCodeCreator.CreateCode(object obj, ObjectFormulaTree[] trees, string className, string constructorModifier, bool checkValue)
        {
            typeCreator = performer.GetLaguageObject<ITypeCreator>(this);
            classCodeCreator = performer.GetLaguageObject<IClassCodeCreator>(this);
            this.trees = trees;
            IList<string> variables;
            IList<string> initializers;
            List<string> l = new List<string>();
            ITreeCodeCreator local = null;
            var lt = PreCreateCode(obj, out local, out variables, out initializers, className);
            List<string> ltt = PostCreateCode(local, obj, lt, variables, initializers,
                         constructorModifier + " " + className,
                         checkValue);
            var ltr = local.Trees;
            performer.Add(l, ltt, 0);
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
            var attr = performer.GetAttribute<CodeCreatorAttribute>(obj);
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

        private List<string> PostCreateCode(ITreeCodeCreator local, object ob, IList<string> lcode,
     IList<string> variables, IList<string> initializers, string consturctor, bool checkValue = true)
        {
            List<string> l = new();
            performer.Add(l, lcode as List<string>, 1);
            int nTree = local.Trees.Length;
            l.Add("");
             l.Add("init() : void");
            l.Add("{");
            if (ob is IMeasurements)
            {
                l.Add("\tvar all = this.getAllMeasurements();");
            }
            performer.Add(l, initializers as List<string>, 1);
            l.Add("}");
            l.Add("");
            foreach (string s in variables)
            {
                l.Add("" + s);
            }
            if (checkValue)
            {
            }
            return l;
        }

        private List<string> PreCreateCode(object obj, out ITreeCodeCreator local,
             out IList<string> variables, out IList<string> initializers, string current)
        {
            Exception exception;
            try
            {
                var treeCodeCreator = performer.GetLaguageObject<ITreeCodeCreator>(this);
                var classCodeCreator = performer.GetLaguageObject<IClassCodeCreator>(this);
                if (classCodeCreator is ICurrentObject currentObject)
                {
                    var co = currentObject.CurrentObject;
                    if (co != this.current)
                    {
                        this.current = co;
                        if (co is ITreeCollection collection)
                        {
                            trees = collection.Trees;
                        }
                    }
                }

                var lcode = CreateCode(obj, trees, treeCodeCreator,
   out local, out variables, out initializers, current);
                ObjectFormulaTree[] tr = local.Trees;
                foreach (ObjectFormulaTree tree in tr)
                {
                    AddTree(tree, initializers, variables);
                }
                var l = new List<string>();
                l.Add("calculateTree() : void");
                l.Add("{");
                l.Add("\tthis.success = true;");
                performer.Add(l, lcode as List<string>, 1);
                l.Add("}");
                foreach (ObjectFormulaTree tree in tr)
                {
                    AddTree(tree, initializers, variables);
                }
                l.Add("void calculateTree()");
                l.Add("{");
                l.Add("\tthis.success = true;");
                performer.Add(l, lcode as List<string>, 1);
                l.Add("}");
                return l;
            }
            catch (Exception e)
            {
                exception = IncludedException.Get(e);
            }
            throw exception;
        }

        IList<string> CreateCode(object obj, ITreeCodeCreator creator,
                ObjectFormulaTree tree, List<ObjectFormulaTree> busy)
        {
            List<ObjectFormulaTree> l = new List<ObjectFormulaTree>();
            GetList(tree, l, busy);
            IList<string> lvr;
            IList<string> lpr;
            List<string> cc = new List<string>();
            for (int i = 0; i < l.Count; i++)
            {
                ObjectFormulaTree tr = l[i];
                List<string> p = new List<string>();
                string rr = creator[tr];
                for (int j = 0; j < tr.Count; j++)
                {
                    ObjectFormulaTree chc = tr[j];
                    if (chc == null)
                    {
                        continue;
                    }
                    p.Add(creator[chc]);
                }
                var c = creator.CreateCode(obj, tr, rr, p.ToArray());
                cc.AddRange(c["code"]);
            }
            return cc;
        }

        /// <summary>
        /// Creates code
        /// </summary>
        /// <param name="trees">Trees</param>
        /// <param name="creator">Code creator</param>
        /// <param name="local">Local code creator</param>
        /// <param name="variables">Variables</param>
        /// <param name="initializers">Initializers</param>
        /// <returns>List of code strings</returns>
        IList<string> CreateCodeLocal(object obj, ObjectFormulaTree[] trees, ITreeCodeCreator creator, out ITreeCodeCreator local,

             out IList<string> variables, out IList<string> initializers, string current)
        {
        }

        /// <summary>
        /// Creates code
        /// </summary>
        /// <param name="trees">Trees</param>
        /// <param name="creator">Code creator</param>
        /// <param name="variables">Variables</param>
        /// <param name="initializers">Initializers</param>
        /// <returns>List of code strings</returns>
        public IList<string> CreateCode(object obj, ObjectFormulaTree[] trees, ITreeCodeCreator creator,
            
             out IList<string> variables, out IList<string> initializers, string current)
        {
            Exception ex;
            try
            {
                ITreeCodeCreator local = null;
                IList<string> l = CreateCodeLocal(obj, trees, creator, out local,
                    out variables, out initializers, current);
                ObjectFormulaTree[] lt = local.Trees;
                foreach (ObjectFormulaTree tree in lt)
                {
                    var s = "";
                    object ret = tree.ReturnType;
                    if (ret.IsEmpty())
                    {
                        continue;
                    }
                    var t = typeCreator.GetType(ret) + " ";
                    var id = local[tree];
                    string cv = creator.GetConstValue(tree);
                    string def = "";
                    if (cv == null)
                    {
                        def = typeCreator.GetDefaultValue(ret) + "";
                        if (def.Length > 0)
                        {
                            s = id + " : " + t + " = " + def;
                        }
                    }
                    else
                    {
                        s = id + " : " + t + " = " + cv;
                    }
                    s += ";";
                    variables.Add(s);
                }
                return l;
            }
            catch (Exception e)
            {
                ex = IncludedException.Get(e);
            }
            throw ex;
        }

   



        private void AddTree(ObjectFormulaTree tree, IList<string> init, IList<string> func)
        {
            int n = StaticCodeCreator.GetNumber(local, tree);
            string tid = local[tree];
            string f = "get_" + n;
            // init.Add("this.mapOperations.set(" + n + ", this." + f + ");");
            func.Add("");
            func.Add("object " + f + "()");
            func.Add("{");
            func.Add("\treturn this.success ? this." + tid + " null;");
            func.Add("}");
        }


    }
}
