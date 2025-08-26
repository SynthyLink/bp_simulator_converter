using AssemblyService.Attributes;
using Diagram.UI.Attributes;
using FormulaEditor;
using System.Data;

namespace DataPerformer.Formula.Java
{
    /// <summary>
    /// Static extensions
    /// </summary>
    [InitAssembly]
    public static class StaticExtensionDataPerformerFormulaJava
    {
        static Performer performer = new Performer();

        static  StaticExtensionDataPerformerFormulaJava()
        {
            new ClassCodeCreator();
            new TreeCodeCreator();
            new TreeCollectionCodeCreator();
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
            /*  if (Diagram.TypeScript.CodeCreator.Dictionary.ContainsKey(t))
              {
                  return Diagram.TypeScript.CodeCreator.Dictionary[t];
              }*/
            return t.Name;

            return null;
        }
        public static string ToType(this ObjectFormulaTree obj)
        {
            var op = obj.Operation;

            var b = (op is AliasNameVariable);
            var attr = performer.GetAttribute<CodeCreatorAttribute>(op);
            var c = attr != null;
            b = b | c;
            if (c)
            {

            }
            var type = obj.ReturnType.GetType();
            if (type == typeof(double) | type == typeof(bool))
            {
                if (b)
                {
                    return "[0] = ((double[])";
                }
                return "[0] = (";
            }    
            return obj.ReturnType.ToType();
        }

        public static string ToType(this ObjectFormulaTree obj, int num)
        {
            return  "var_" + num + obj.ToType();
        }



    }
}
