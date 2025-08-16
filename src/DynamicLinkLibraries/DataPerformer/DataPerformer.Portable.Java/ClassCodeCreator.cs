using BaseTypes.CodeCreator.Interfaces;

using Diagram.UI;

using Diagram.UI.Attributes;

using Diagram.UI.Interfaces;

namespace DataPerformer.Portable.Java
{
    [Language("Java")]
    public class ClassCodeCreator : IClassCodeCreator
    {

        protected DataPerformer.Interfaces.Performer nPerformer = new();

        protected NamedTree.Performer formulaPerformer = new();

        protected ITypeCreator TypeCreator { get; } = new TypeCreator();

        protected Dictionary<Func<object, bool>, Func<string, object, List<string>>> dictionary;

        protected Dictionary<string, string> classes;

        protected ClassCodeCreator(bool b)
        {

        }

        public ClassCodeCreator() 
        {
            classes = new Dictionary<string, string>()
            {
                {"DataLink", "measurements.arrows.DataLink" }
            };

            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                   { (object o) => { return DetectType(o, "DataConsumer"); } , CreateDataConsumer },
                   { (object o) => { return o is DataLink; } , CreateDataLink }
       //          { (object o) => { return o is DifferentialEquationSolver; } , CreateDiffrerentialSolver },
           //      { (object o) => { return o is Recursive; } , CreateRecursive },
          };
            this.AddCodeCreator(); 
        
        }

        bool DetectType(object o, string type)
        {
            return o.GetType().Name == type;
        }

        protected List<string> CreateExt(string preffix, object ob)
        {
            var l = new List<string>();
            var t = ob.GetType().Name;
            var s =  classes[t];
            l.Add("protected class " + preffix + " extends " + s);
            l.Add("{");
            l.Add("\tpublic " + preffix + "(String name, IDesktop desktop) {");
            l.Add("\t\tsuper(name,  desktop);");
            return l;
        }
        /*
      public CategoryArrow0(String name, IDesktop desktop) {
            super(name, desktop);
          */


        List<string> IClassCodeCreator.CreateCode(string preffix, object obj)
        {
            return CreateCode(preffix, obj);
        }

        protected virtual List<string> CreateCode(string preffix, object obj)
        {
            foreach (Func<object, bool> key in dictionary.Keys)
            {
                if (key(obj))
                {
                    var l = CreateExt(preffix, obj);
                    var ll =   dictionary[key](preffix, obj);
                    formulaPerformer.Add(l, ll, 2);
                    l.Add("}");
                    l.Add("");
                    return l;
                }
            }
            return null;
        }



        static List<string> CreateDataLink(string preffix, object obj)
        {
            return new List<string>() { "}" };
        }


        static List<string> CreateDataConsumer(string preffix, object obj)
        {
            return new List<string>();
        }

    }
}