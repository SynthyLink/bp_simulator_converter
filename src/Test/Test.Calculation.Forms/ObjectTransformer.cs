using CategoryTheory;
using DataPerformer.Interfaces;

namespace Test.Calculation.Forms
{
    public class ObjectTransformer : CategoryObject, IObjectTransformer
    {
        double a = 0;

        static readonly string[] inp = ["a", "b", "c", "d"];

        static readonly string[] oout = ["x", "y", "z",];

        string[] IObjectTransformer.Input => inp;

        string[] IObjectTransformer.Output => oout;

        public double Coefficient
        {
            get;
            set;
        } = 0;

        void IObjectTransformer.Calculate(object[] input, object[] output)
        {
            var a = (double)input[0];
            var b = (double)input[1];
            var c = (double)input[2];
            var d = (double)input[3];
            output[0] = Coefficient * (a + b);
            output[1] = Coefficient * b * c;
            output[2] = Coefficient * (c + Math.Sign(d));
        }

        object IObjectTransformer.GetInputType(int i)
        {
            return a;
        }

        object IObjectTransformer.GetOutputType(int i)
        {
            return a;
        }
    }
}
