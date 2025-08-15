using AssemblyService.Attributes;
using FormulaEditor;

namespace DataPerformer.Formula.TypeScript
{
    /// <summary>
    /// Static extensions
    /// </summary>
    [InitAssembly]
    public static class StaticExtensionDataPerformerFormulaTypeScript
    {
        /// <summary>
        /// Constructor
        /// </summary>
        static StaticExtensionDataPerformerFormulaTypeScript()
        {
            new TSClassCodeCreator();
        }

        /// <summary>
        /// Initialize itself
        /// </summary>
        static public void Init(InitAssemblyAttribute attr)
        {

        }

        public static string ToType(this object obj)
        {
            var t = obj.GetType();
            if (TSTypeCreator.Dictionary.ContainsKey(t))
            {
                return TSTypeCreator.Dictionary[t];
            }

            return null;
        }
        public static string ToType(this ObjectFormulaTree obj)
        {
            return obj.ReturnType.ToType();
        }

        public static string ToType(this ObjectFormulaTree obj, int num)
        {
            return "this.var_" + num + " = this.convert<" + obj.ToType() + ">(this.variable);";
        }

    }
}