using BaseTypes.Attributes;
using Diagram.UI;

namespace DinAtm.Portable.Java
{
    [Language("Java")]
    internal class ClassCodeCreator : Diagram.Java.ClassCodeCreator
    {
        internal ClassCodeCreator() : base(false)
        {
            this.AddClassCodeCreator();
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                   { (object o) => { return o is Atmosphere; } , CreateAtmosphere }
              };

            classes = new Dictionary<string, string>()
            {
                {"Atmosphere", "external.atmosphere.DynamicalAtmosphereTransformer" }
            };
        }




        List<string> CreateAtmosphere(string preffix, object obj)
        {
             return new List<string>() {

                "}", "}" };
        }
    }
}
