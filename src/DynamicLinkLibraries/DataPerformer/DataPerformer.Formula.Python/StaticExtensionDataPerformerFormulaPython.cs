using AssemblyService.Attributes;
using FormulaEditor;

namespace DataPerformer.Formula.Python
{
    /// <summary>
    /// Static extensions
    /// </summary>
    [InitAssembly]
    public static class StaticExtensionDataPerformerFormulaPython
    {
        /// <summary>
        /// Constructor
        /// </summary>
        static StaticExtensionDataPerformerFormulaPython()
        {
            new ClassCodeCreator();
            var cc = CodeCreator.TypeCreator;
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
            if (Diagram.Python.CodeCreator.TypeCorrespodnence.ContainsKey(t))
            {
                return Diagram.Python.CodeCreator.TypeCorrespodnence[t];
            }

            return null;
        }
        public static string ToType(this ObjectFormulaTree obj)
        {
            return obj.ReturnType.ToType();
        }

        public static string ToType(this ObjectFormulaTree obj, int num)
        {
            return "this.var_" + num + " = this.convert<" + obj.ToType() + ">(this.variable)";
        }

    }
}