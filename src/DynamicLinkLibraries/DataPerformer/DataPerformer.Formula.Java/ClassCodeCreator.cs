using Diagram.UI;
using Diagram.UI.Attributes;
using Diagram.UI.Interfaces;
using FormulaEditor.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataPerformer.Formula.Java
{
    /// <summary>
    /// Creator of TS code
    /// </summary>
    [Language("Java")]
    internal class ClassCodeCreator : IClassCodeCreator
    {
        public ClassCodeCreator()
        {
            this.AddCodeCreator();
        }

        static DataPerformer.Interfaces.Performer nPerformer = new();

        static NamedTree.Performer formulaPerformer = new();
        static readonly Dictionary<Func<object, bool>, Func<string, object, List<string>>>
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                   { (object o) => { return o is VectorFormulaConsumer; } , CreateVectorConsumer }
       //          { (object o) => { return o is DifferentialEquationSolver; } , CreateDiffrerentialSolver },
           //      { (object o) => { return o is Recursive; } , CreateRecursive },
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
        static List<string> CreateVectorConsumer(string preffix, object obj)
        {
            return null;// return CreateTreeCollection(preffix, obj as ITreeCollection);
        }


    }
}