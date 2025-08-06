using BaseTypes;
using BaseTypes.Interfaces;
using DataPerformer.Interfaces;
using Diagram.UI.Attributes;
using ErrorHandler;

using FormulaEditor;
using FormulaEditor.CodeCreators.Interfaces;

namespace DataPerformer.Formula.TypeScript
{
    internal static  class StaticCodeCreatorTypeScript
    {

        static DataPerformer.Interfaces.Performer performer = new ();

        static NamedTree.Performer perf = new NamedTree.Performer ();

        #region Public Members

        public static string GetMeasurementName(string current, int n)
        {
            string st = current;
            st += "_Measurement_" + n;
            return st;
        }
/*
        public static List<string> GetMeasurement(string current, int n)
        {
            var nn = "class " + GetMeasurementName(current, n);
            var s = nn + " extends Measurement {";
            var l = new List<string>();
            l.Add(s); ;
            l.Add("\tobj !: " + current + ";");
            l.Add("\tconstructor(o:  " + current + ", name: string, type: any) {");
            l.Add("\t\tsuper(name, type);");
            l.Add("\t\tthis.obj = o;");
            l.Add("\t}");
            l.Add("");
            l.Add("\tgetMeasurementValue() {");
            l.Add("\t\treturn this.obj.get_" + n + "();");
            l.Add("\t}");
            l.Add("}");
            l.Add("");
            return l;
        }
*/
        /// <summary>
        /// Gets number of tree
        /// </summary>
        /// <param name="creator">Creator of code</param>
        /// <param name="tree">The tree</param>
        /// <returns>Number of tree</returns>
        public static int GetNumber(ICodeCreator creator, ObjectFormulaTree tree)
        {
            try
            {
                return creator.GetNumber(tree);
                /*  ObjectFormulaTree[] trees = creator.Trees;
                  for (int i = 0; i < trees.Length; i++)
                  {
                      if (trees[i] == tree)
                      {
                          return i;
                      }
                  }*/
            }
            catch (Exception)
            {
                throw new Exception("Tree not found");
            }
        }

        static bool GetState(object obj)
        {
            bool b = false;
            var attr = perf.GetAttribute<CodeCreatorAttribute>(obj);
            if (attr != null)
            {
                b = attr.AliasInitialState;
            }
            return b;
        }


        /// <summary>
        /// Creates code from trees
        /// </summary>
        /// <param name="trees">The trees</param>
        /// <param name="creator">Code creator</param>
        /// <param name="local">Local code reator</param>
        /// <param name="variables">Strings of variables</param>
        /// <param name="initializers">Strings of initializers</param>
        /// <returns>Strings of code</returns>
        public static IList<string> CreateCode(object obj, ObjectFormulaTree[] trees, ICodeCreator creator,
            out ICodeCreator local,
             out IList<string> variables,
             out IList<string> initializers, string current )
        {
            List<string> code = new List<string>();
            List<string> vari = new List<string>();
            List<string> init = new List<string>();
            var measurements = obj as IMeasurements;
            try
            {
                local = creator.Create(obj, trees);
                IList<ObjectFormulaTree> lt = local.Trees;
               // Output = DataPerformerFormula.GetOutput(obj as IMeasurements, lt.ToArray());
                var ct = DataPerformerFormula.Get(obj as IDataConsumer, lt.ToArray());
                bool state = GetState(obj);

                for (int i = 0; i < lt.Count; i++)
                {
                    var tree = lt[i];
                    var op = tree.Operation;
                    foreach (var ii in ct)
                    {
                        if (ii[0] == i)
                        {
                            var mtt = "measurement" + ii[0];
                            vari.Add(mtt + " : " + "IMeasurement = new FictiveMeasurement();");
                            init.Add("this." + mtt + " = all[" + ii[1] +
                                "].getMeasurement(" + ii[2] + ");");
                            goto m;
                        }
                    }
                    if (state & (measurements != null))
                    {
                        if (!GetState(op))
                        {
                            continue;
                        }
                        if (op is IValue iv)
                        {
                            for (var j = 0; j < measurements.Count; j++)
                            {
                                var m = measurements[j];
                                if (m == op)
                                {
                                    var mtt = "value" + i;
                                    vari.Add(mtt + " : IValue = new FictiveValue();");
                                    init.Add("this." + mtt + " = this.output[" + j + "];");
                                }
                            }
                        }
                    }
                    m: continue;
                }
                if (local.Optional.Count > 0)
                {
                    return CreateOptionalCode(obj, local, out variables, out initializers);
                }
                foreach (ObjectFormulaTree t in lt)
                {
                    string ret = local[t];
                    IList<string> par = new List<string>();
                    int n = t.Count;
                    for (int i = 0; i < n; i++)
                    {
                        ObjectFormulaTree child = t[i];
                        if (child == null)
                        {
                            continue;
                        }
                        par.Add(local[child]);
                    }
                    IList<string> lv;
                    IList<string> lp;
                    var c = local.CreateCode(obj, t, ret, par.ToArray<string>());
                    lv = c["variables"];
                        if (lv != null)
                    {
                        if (lv.Count > 0)
                        {
                            vari.AddRange(lv);
                        }
                        else
                        {

                        }
                    }
                    lp = c["initializers"];
                    if (lp != null)
                    {
                        init.AddRange(lp);
                    }
                    if (creator.GetConstValue(t) == null)
                    {
                        code.AddRange(c["code"]);
                    }
                    else if (creator.GetConstValue(t).Equals("\"\""))
                    {
                        code.AddRange(c["code"]);
                    }
                }
                variables = vari;
                initializers = init;
                return code;
            }
            catch (Exception exception)
            {
                var ex = IncludedException.Get(exception);
                ex.HandleException();
            }
            local = null;
            variables = null;
            initializers = null;
            return null;
        }

        #endregion

        #region Private Members

        static IList<string> CreateOptionalCode(object obj, ICodeCreator creator, out IList<string> variables, out IList<string> initializers)
        {
            List<string> code = new List<string>();
            List<string> vari = new List<string>();
            List<string> init = new List<string>();
            IList<ObjectFormulaTree> lt = creator.Trees;
            IList<ObjectFormulaTree> opt = creator.Optional;
            List<ObjectFormulaTree> busy = new List<ObjectFormulaTree>();
            List<ObjectFormulaTree> conds = new List<ObjectFormulaTree>();
            Dictionary<ObjectFormulaTree, ObjectFormulaTree> pch = new Dictionary<ObjectFormulaTree, ObjectFormulaTree>();
            foreach (ObjectFormulaTree t in opt)
            {
                for (int i = 0; i < t.Count; i++)
                {
                    pch[t[i]] = t;
                }
            }
            foreach (ObjectFormulaTree t in lt)
            {
                IList<string> par = new List<string>();
                if (busy.Contains(t))
                {
                    continue;
                }
                string ret = creator[t];
                if (pch.ContainsKey(t))
                {
                    ObjectFormulaTree oft = pch[t];
                    string rcr = creator[oft];
                    busy.Add(oft);
                    ObjectFormulaTree cond = oft[0];
                    for (int i = 0; i < cond.Count; i++)
                    {
                        ObjectFormulaTree chc = cond[i];
                        if (chc == null)
                        {
                            continue;
                        }
                        busy.Add(chc);
                        par.Add(creator[chc]);
                    }
                    IList<string> lvc;
                    IList<string> lpc;
                    string rc = creator[cond];
                    if (!conds.Contains(cond))
                    {
                        conds.Add(cond);
                       var  cc = creator.CreateCode(obj, cond, rc, par.ToArray());
                        lvc = cc["variables"];
                        if (lvc != null)
                        {
                            vari.AddRange(lvc);
                        }
                        lpc = cc["initializers"];
                        if (lpc != null)
                        {
                            init.AddRange(lpc);
                        }
                        if (creator.GetConstValue(cond) == null)
                        {
                            code.AddRange(cc["code"]);
                        }
                    }
                    code.Add("if (" + rc + ")");
                    code.Add("{");
                    for (int k = 1; k < 3; k++)
                    {
                        ObjectFormulaTree tt = oft[k];
                        if (k == 0)
                        {
                            IList<string> lvr;
                            IList<string> lpr;
                            string rr = creator[tt];
                            List<string> p = new List<string>();
                            if (k > 0)
                            {
                                for (int i = 0; i < tt.Count; i++)
                                {
                                    ObjectFormulaTree chc = tt[i];
                                    if (chc == null)
                                    {
                                        continue;
                                    }
                                    busy.Add(chc);
                                    p.Add(creator[chc]);
                                }
                            }
                            var cr = creator.CreateCode(obj, tt, rr, p.ToArray<string>());
                            lvr = cr["variables"];
                            if (lvr != null)
                            {
                                vari.AddRange(lvr);
                            }
                            lpr = cr["initializers"];
                            if (lpr != null)
                            {
                                init.AddRange(lpr);
                            }
                            if (creator.GetConstValue(t) == null)
                            {
                                code.AddRange(cr["code"]);
                            }
                        }
                        else
                        {
                            code.AddRange(CreateCode(obj, creator, tt, busy));
                            code.Add(rcr + " = " + creator[tt] + ";");
                        }
                        if (k == 1)
                        {
                            code.Add("}");
                            code.Add("else");
                            code.Add("{");
                        }
                    }
                    code.Add("}");
                    continue;
                }
                busy.Add(t);
                int n = t.Count;
                for (int i = 0; i < n; i++)
                {
                    ObjectFormulaTree child = t[i];
                    busy.Add(child);
                    if (child == null)
                    {
                        continue;
                    }
                    par.Add(creator[child]);
                }
                IList<string> lv;
                IList<string> lp;
                var c = creator.CreateCode(obj, t, ret, par.ToArray<string>());
                lv = c["variables"];
                if (lv != null)
                {
                    vari.AddRange(lv);
                }
                lp = c["initializers"];
                if (lp != null)
                {
                    init.AddRange(lp);
                }
                if (creator.GetConstValue(t) == null)
                {
                    code.AddRange(c["code"]);
                }
            }
            List<string> lvar = new List<string>();
            foreach (string s in vari)
            {
                if (!lvar.Contains(s))
                {
                    lvar.Add(s);
                }
            }
            variables = lvar;
            List<string> lini = new List<string>();
            foreach (string s in init)
            {
                if (!lini.Contains(s))
                {
                    lini.Add(s);
                }
            }
            initializers = lini;
            return code;
        }

        private static void GetList(ObjectFormulaTree tree, List<ObjectFormulaTree> l, List<ObjectFormulaTree> busy)
        {
            int n = tree.Count;
            for (int i = 0; i < n; i++)
            {
                GetList(tree[i], l, busy);
            }
            if (!busy.Contains(tree))
            {
                l.Add(tree);
            }
        }

        private static IList<string> CreateCode(object obj, ICodeCreator creator,
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

        #endregion


    }
}
