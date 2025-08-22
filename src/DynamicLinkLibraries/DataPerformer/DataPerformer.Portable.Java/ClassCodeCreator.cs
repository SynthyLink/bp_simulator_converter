using BaseTypes.Attributes;
using BaseTypes.CodeCreator.Interfaces;
using DataPerformer.Interfaces;
using Diagram.UI;



namespace DataPerformer.Portable.Java
{
    [Language("Java")]
    public class ClassCodeCreator : Diagram.Java.ClassCodeCreator
    {
        protected static Performer mPerformer = new Performer();

        public ClassCodeCreator() : base(false)
        {
            classes = new Dictionary<string, string>()
            {
                {"DataLink", "measurements.arrows.DataLink" },
                   {"ObjectTransformerLink", "measurements.arrows.ObjectTransformerLink" },
                { "DataConsumer", "measurements.DataConsumer"},
                { "RandomGenerator", "measurements.RandomGenerator"},
               { "ObjectTransformer", "measurements.ObjectTransformer"},
         };

            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                   { (object o) => { return DetectType(o, "DataConsumer"); } , CreateDataConsumer },
                   { (object o) => { return o is DataLink; } , CreateDataLink },
                   { (object o) => { return o is ObjectTransformerLink; } , CreateObjectTransformerLink },
                 { (object o) => { return o is RandomGenerator; } , CreateRandom },
                 { (object o) => { return o is ObjectTransformer; } , CreateObjectTransformer },
          };
            this.AddCodeCreator(); 
        
        }


  

    

        static List<string> CreateDataLink(string preffix, object obj)
        {
            return new List<string>() { "}" };
        }


        static List<string> CreateObjectTransformerLink(string preffix, object obj)
        {
            return new List<string>() { "}" };
        }

        static List<string> CreateObjectTransformer(string preffix, object obj)
        {
            var ot = obj as ObjectTransformer;
            var io = ot.InputOutput;
            var dl = ot.Links;
            var d = enumerableIntCodeCreator.Create("array", io);
            var l = d.Values.ToArray()[0];
            l.Add("this.array = array;");
            l.Add("}");
            return l;
        }



        static List<string> CreateDataConsumer(string preffix, object obj)
        {
            return new List<string>() { "}" };
        }


        static List<string> CreateRandom(string preffix, object obj)
        {
            return new List<string>() { "}" };
        }


    }
}