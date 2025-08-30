using BaseTypes.Attributes;
using Diagram.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gravity_36_36.Wrapper.Java
{
    [Language("Java")]
    internal class ClassCodeCreator : Diagram.Java.ClassCodeCreator
    {
        internal ClassCodeCreator() : base(false)
        {
            this.AddClassCodeCreator();
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                   { (object o) => { return o is Gravity; } , CreateGravity }
              };

            classes = new Dictionary<string, string>()
            {
                {"Gravity", "external.gravity.Gravity36x36Transformer" }
            };
        }




        List<string> CreateGravity(string preffix, object obj)
        {
            var gr = obj as Gravity;
            var n0 = gr.N0 + "";
            var nk = gr.NK + "";
            return new List<string>() {

               "\tsetN0(" + n0 + ");",
               "\tsetNK(" + nk + ");",
                "}", "}" };
        }
    }
}
