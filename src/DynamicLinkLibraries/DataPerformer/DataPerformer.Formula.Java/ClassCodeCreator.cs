using BaseTypes.Attributes;
using Diagram.UI;

namespace DataPerformer.Formula.Java
{
    /// <summary>
    /// Creator of TS code
    /// </summary>
    [Language("Java")]
    internal class ClassCodeCreator : Portable.Java.ClassCodeCreator
    {
        public ClassCodeCreator() : base(false)
        {
            this.AddCodeCreator();
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