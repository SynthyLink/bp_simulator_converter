using BaseTypes.Attributes;
using BaseTypes.CodeCreator.Interfaces;
using BaseTypes.Interfaces;
using DataPerformer.Interfaces;
using Diagram.Interfaces;
using Diagram.UI.Interfaces;
using ErrorHandler;
using FormulaEditor;
using FormulaEditor.CodeCreators;
using FormulaEditor.CodeCreators.Interfaces;
using FormulaEditor.Interfaces;

namespace DataPerformer.Formula.Java
{
    [Language("Java")]
    internal class TreeCodeCreator : BaseTreeCodeCreator
    {
        internal TreeCodeCreator()
            : base()
        {
            this.AddTreeCodeCreator();
        }
    }

    internal class BaseTreeCodeCreator : SeparatorCodeCreator, IOperationSeparatorCreator
    {

        #region Const

        private static readonly Dictionary<string, string[]> elementary =
new Dictionary<string, string[]> {
            {"s", new string[] {" = Math.sin(", ");"}},
            {"c", new string[] {" = Math.cos(", ");"}},
            {"l", new string[] {" = Math.log(", ");"}},
            {"e", new string[] {" = Math.exp(", ");"}},
            {"t", new string[] {" = Math.tan(", ");"}},
            {"q", new string[] {" = Math.tan( Math.PI / 2 - (", "));"}},
            {"a", new string[] {" = Math.atan(", ");"}},
            {"b", new string[] {" = Math.PI / 2 - Math.atan(", ");"}},
            {"j", new string[] {" = 1 / Math.cos(", ");"}},
            {"k", new string[] {" = 1 / Math.sin(", ");"}},
            {"f", new string[] {" = Math.asin(", ");"}},
            {"g", new string[] {" = Math.acos(", ");"}},
            {"?", new string[] {" = (", ");"}},
            {"-", new string[] {" = -(", ");"}},
            {"A", new string[] {" = Math.abs(", ");"}},
};

        private static readonly string[] squareRoot = new string[] { " = Math.sqrt(", ");" };

        private static readonly string[] root = new string[] { " = Math.pow(", ", 1 /(", "));" };

        private static readonly string[] abs = new string[] { " = Math.abs(", ");" };

        private static readonly string[] absPower = new string[] { " = Math.pow(Math.abs(", "), ", ");" };

        private static readonly string[] atan2 = new string[] { " = Math.atan2(", ", ", ");" };


        private static readonly string[] modulodiv = new string[] { " = (", " % ", ");" };


        private static readonly string[] optionalSeparator = new string[] { " = (", ") ? (", ") : (", ");" };

        private static readonly string[] power = new string[]
        { " = Math.pow(", ", ", ");" };


        private static Dictionary<string, string[]> elementaryBinary = new Dictionary<string, string[]>()
        {
            {"+", new string[] {" = (", ") + (", ");"}},
            {"-", new string[] {" = (", ") - (", ");"}},
            {"*", new string[] {" = (", ") * (", ");"}},
        };

        private static readonly Dictionary<string, string[]> comparation = new Dictionary<string, string[]>()
        {
            {">", new string[] {" = (", ") > (", ");"}},
            {"<", new string[] {" = (", ") < (", ");"}},
            {"\u2260", new string[] {" = (", ") != (", ");"}},
            {"\u2264", new string[] {" = (", ") >= (", ");"}},
            {"\u2265", new string[] {" = (", ") <= (", ");"}},
        };

        private static readonly Dictionary<string, string[]> logicalOperation = new Dictionary<string, string[]>()
       {
            {"\u2216", new string[] {" = (", ") & (", ");"}},
            {"\u2217", new string[] {" = (", ") | (", ");"}},
            {"\u8835", new string[] {" = (!(", ")) | (", ");"}}
       };



        private static string[] fraction = new string[] { " = (", ") / (", ");" };


        private static string[] equals = new string[] { " = (", ").Equals(", ");" };


        #endregion

        object current;

        string language = "Java";
        IClassCodeCreator classCodeCreator;
        ITypeCreator typeCreator;

        Performer performer = new Performer();

        internal List<int> Values
        {
            get;
            set;
        }



        protected BaseTreeCodeCreator()
        {
            separatorCreator = this;
            typeCreator = performer.GetLaguageObject<ITypeCreator>(language);
            classCodeCreator = performer.GetLaguageObject<IClassCodeCreator>(language);
        }


        private string[] GetMultiSeparator(IObjectOperation op)
        {
            if (op is AliasNameVariable)
            {
                return [" = this.aliasName", ".getAliasNameValue();"];
            }
            if (op is IAliasNameHolder)
            {
                return [" = this.aliasName", ".getAliasNameValue();"];
            }
            if (op is IMeasurementHolder mh)
            {
                return [" = this.measurement", ".getMeasurementValue();"];
            }
            if (op is OptionalOperation)
            {
                return optionalSeparator;
            }
            if (op is NegationOperation)
            {
                return new string[] { " = !", ";" };
            }
            if (op is ElementaryBinaryOperation)
            {
                ElementaryBinaryOperation eb = op as ElementaryBinaryOperation;
                string seb = eb.Symbol + "";
                if (elementaryBinary.ContainsKey(seb))
                {
                    return elementaryBinary[seb];
                }
            }
            if (op is ElementaryDivisionOperation ed)
            {
                char s = ed.Symbol;
                if (op.ReturnType.Equals((double)0) | op.ReturnType.Equals((float)0))
                {
                    switch (ed.Symbol)
                    {
                        case '﹪':
                            {
                                return modulodiv;
                            }
                        case '/':
                            {
                                return fraction;
                            }
                    }
                }

            }
            if (op is ElementaryModuloDivision)
            {
                if (op.ReturnType.Equals((double)0))
                {
                    return modulodiv;
                }
            }
            if (op is ElementaryAtan2)
            {
                return atan2;
            }
            if (op is EqualityOperation)
            {
                return equals;
            }
            if (op is ElementaryFraction)
            {
                return fraction;
            }
            if (op is ElementaryRoot)
            {
                if (op.InputTypes.Length == 1)
                {
                    return squareRoot;
                }
                return root;
            }
            if (op is ElementaryAbs)
            {
                if (op.InputTypes.Length == 1)
                {
                    return abs;
                }
                return absPower;
            }
            if ((op is ElementaryFunctionOperation) | (op is ElementaryAbs))
            {
                string key = "";
                if (op is ElementaryFunctionOperation)
                {
                    ElementaryFunctionOperation o = op as ElementaryFunctionOperation;
                    key = o.Symbol + "";
                }
                else
                {
                    key = "A";
                }
                if (elementary.ContainsKey(key))
                {
                    return elementary[key];
                }
            }
            if (op is ElementaryIntegerOperation)
            {
                return new string[] { " = (" + op.ReturnType.GetType().Name + ")", ";" };
            }
            if (op is ComparationOperation)
            {
                ComparationOperation co = op as ComparationOperation;
                string cos = co.String;
                if (comparation.ContainsKey(cos))
                {
                    return comparation[cos];
                }
            }
            if (op is LogicalOperation)
            {
                LogicalOperation lo = op as LogicalOperation;
                string los = lo.Symbol + "";
                if (logicalOperation.ContainsKey(los))
                {
                    return logicalOperation[los];
                }
            }
            if (op is ElementaryPowerOperation)
            {
                return power;
            }
            return null;
        }

        /*
         
        /// <summary>
        /// Creates Code from tree
        /// </summary>
        /// <param name="tree">The tree</param>
        /// <param name="ret">Return value</param>
        /// <param name="parameters">Parameters</param>
        /// <param name="variables">Variables</param>
        /// <param name="initializers">Initializers</param>
        /// <returns>List of code</returns>
        protected override Dictionary<string, List<string>> CreateCode(object obj, ObjectFormulaTree tree,
            string ret, string[] parameters)
        {
            IList<string> variables;
            IList<string> initializers;

            IList<string> l = CreateTSCode(obj, tree, ret, parameters, out variables, out initializers);
            if (l != null)
            {
                var d = new Dictionary<string, List<string>>()
                {
                    { "initializers", initializers as List<string> },
                    { "variables", variables  as List<string>},
                    { "code", l  as List<string>}
                };

                return d;
            }
            l = CreateArraySingleCode(tree, ret, parameters, out variables, out initializers);
            if (l != null)
            {
                var d = new Dictionary<string, List<string>>()
                {
              { "initializers", initializers as List<string> },
                    { "variables", variables  as List<string>},
                    { "code", l  as List<string>}
                    };
                return d;
            }
            try
            {
                l = CreateArrayCode(obj, tree, ret, parameters, out variables, out initializers);
                if (l != null)
                {
                 var    d = new Dictionary<string, List<string>>()
                {
                  { "initializers", initializers as List<string> },
                    { "variables", variables  as List<string>},
                    { "code", l  as List<string>}
                  };
                    return d;
                }
            }
            catch (Exception exception)
            {
                exception.HandleFictionException();
            }
            if (ret.Length > 0)
            {
                var ll = CreateTreeCode(tree, ret, parameters, out variables, out initializers);
                var d = new Dictionary<string, List<string>>()
                {
                  { "initializers", initializers as List<string> },
                    { "variables", variables  as List<string>},
                    { "code", l  as List<string>}
                  };
                return d;

            }
            return null;
        }
        */


        protected virtual string[] Get(ObjectFormulaTree tree)
        {
            string[] ss = null;
            IObjectOperation op = tree.Operation;
            ss = GetMultiSeparator(op);
            if (ss != null)
            {
                return ss;
            }
            return null;
        }


        string[] IOperationSeparatorCreator.this[ObjectFormulaTree tree] => Get(tree);

        protected override ITypeCreator TypeCreator => typeCreator;

        public override ITreeCodeCreator Create(object obj, ObjectFormulaTree[] trees)
        {
            if (classCodeCreator is ICurrentObject currentObject)
            {
                var co = currentObject.CurrentObject;
                if (current != co)
                {
                    current = co;
                    if (co is ITreeCollection tc)
                    {
                        var cc = new BaseTreeCodeCreator();
                        cc.Set(tc.Trees);
                        return cc;
                    }
                }
            }
            throw new OwnNotImplemented();
        }

        public override string GetConstValue(ObjectFormulaTree tree)
        {
            throw new OwnNotImplemented();
        }
    }
}
