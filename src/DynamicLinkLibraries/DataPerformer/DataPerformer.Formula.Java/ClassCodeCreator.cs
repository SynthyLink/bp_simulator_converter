using BaseTypes.Attributes;
using DataPerformer.Interfaces;
using Diagram.UI;
using Diagram.UI.Attributes;
using ErrorHandler;
using FormulaEditor;
using FormulaEditor.Interfaces;
using System.Threading;

namespace DataPerformer.Formula.Java
{
    /// <summary>
    /// Creator of TS code
    /// </summary>
    [Language("Java")]
    internal class ClassCodeCreator : Diagram.Java.ClassCodeCreator
    {
        public ClassCodeCreator() : base(false)
        {
           this.AddClassCodeCreator();
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                   { (object o) => { return o is VectorFormulaConsumer; } , CreateVectorConsumer }
       //          { (object o) => { return o is DifferentialEquationSolver; } , CreateDiffrerentialSolver },
           //      { (object o) => { return o is Recursive; } , CreateRecursive },
          };

            classes = new Dictionary<string, string>()
            {
                {"VectorFormulaConsumer", "measurements.DataConsumerMeasurements" }
            };
        }

    
        List<string> CreateVectorConsumer(string preffix, object obj)
        {
            return new List<string>(){"}"} ;
        }




    }
}