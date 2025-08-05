using System;
using System.Collections.Generic;

using Diagram.UI.Attributes;
using Diagram.UI;
using Diagram.UI.Interfaces;

namespace DataPerformer.Portable.TypeScript
{
    /// <summary>
    /// Creator of TS code
    /// </summary>
    [Language("TS")]
    internal class TSCodeCreator : IClassCodeCreator
    {
        static Diagram.UI.TypeScript.Performer performer = new Diagram.UI.TypeScript.Performer();


        #region Ctor
        internal TSCodeCreator()
        {
            this.AddCodeCreator();
        }
        #endregion

        static readonly Dictionary<Func<object, bool>, Func<string, object, List<string>>> dictionary =
         new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                      { (object o) => { return o is ObjectTransformer; } , CreateObjectTransformer },
              { (object o) => { return o is DataLink; } ,CreateDataLink},
                   { (object o) => { return o is RandomGenerator; } , CreateRandomGenerator},
               { (object o) => { return o is ObjectTransformerLink; } , CreateObjectTransformeLink},
         };

        List<string> IClassCodeCreator.CreateCode(string preffix, object obj)
        {
            foreach (var val in dictionary)
            {
                if (val.Key(obj))
                {
                    return val.Value(preffix, obj);
                }
            }
            string th = obj.GetType().Name;
            if (th.Equals("DataConsumer"))
            {
                DataConsumer c = obj as DataConsumer;
                return CreateDataConsumer(preffix, obj);
            }
            return null;
        }


        static List<string> CreateObjectTransformer(string preffix, object obj)
        {
            List<string> l = new List<string>();
            var s = performer.ClassString(preffix, "ObjectTransformer");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t}");
            l.Add("}");
            return l;
        }


        static List<string> CreateDataConsumer(string preffix, object obj)
        {
            List<string> l = new List<string>();
            var s = performer.ClassString(preffix, "DataConsumer");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t}");
            l.Add("}");
            return l;
        }

        static List<string> CreateRandomGenerator(string preffix, object obj)
        {
            List<string> l = new List<string>();
            var s = performer.ClassString(preffix, "RandomGenerator");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t}");
            l.Add("}");
            return l;
        }

   

        public S Convert<T, S>(T obj)
        {
            var o = (object)obj;
            return (S)o;
        }

        static List<string> CreateObjectTransformeLink(string preffix, object obj)
        {

            List<string> l = new List<string>();
            var s = performer.ClassString(preffix, "ObjectTransformeLink");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t}");
            l.Add("}");
            return l;
        }


        static List<string> CreateDataLink(string preffix, object obj)
        {

            List<string> l = new List<string>();
            var s = performer.ClassString(preffix, "DataLink");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t}");
            l.Add("}");
            return l;
        }

    }
}

