using BaseTypes;
using BaseTypes.Attributes;
using Diagram.UI;
using Diagram.UI.CodeCreators.Interfaces;
using Diagram.UI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataPerformer.Portable.Python

{
    /// <summary>
    /// Creator of Python code
    /// </summary>
    [Language("Python")]
    internal class ClassCodeCreator : IClassCodeCreator
    {
        static Diagram.UI.Python.Performer performer = new Diagram.UI.Python.Performer();


        #region Ctor
        internal ClassCodeCreator()
        {
           this.AddClassCodeCreator();
        }
        #endregion

        static readonly Dictionary<Func<object, bool>, Func<string, object, List<string>>> classCreationDictionary =
         new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
             { (object o) => { return o is ObjectTransformer; }, CreateObjectTransformer },
             { (object o) => { return o is DataLink; }, CreateDataLink},
             { (object o) => { return o is RandomGenerator; }, CreateRandomGenerator},
             { (object o) => { return o is ObjectTransformerLink; }, CreateObjectTransformerLink},
         };

        protected IDesktopCodeCreator DesktopCodeCreator
        { get; set; }


        List<string> IClassCodeCreator.CreateCode(string prefix, object obj, string volume)
        {
            return classCreationDictionary.Keys.Select(k => k(obj)).Any() ? CreateObject(prefix, obj) : null;
            /*foreach (var val in classCreationDictionary)
            {
                if (val.Key(obj))
                {
                    return CreateObject(prefix, obj);
                    //return val.Value(prefix, obj);
                }
            }*/
            /*string th = obj.GetType().Name;
            if (th.Equals("DataConsumer"))
            {
                return CreateDataConsumer(prefix, obj);
            }*/
            return null;
        }

        static List<string> CreateObjectTransformer(string prefix, object obj)
        {
            List<string> l = new List<string>();
            var ot = obj as ObjectTransformer;
            var s = performer.ClassString(prefix, "ObjectTransformer");
            var ll = performer.CreateStringDictionary("map", ot.Links);
            l.Add(s);
            performer.AddObjectConstructor(l);
            performer.Add(l, ll, 1);
            l.Add("\t\tself.setLinks(map);");
            return l;
        }

        static List<string> CreateDataConsumer(string prefix, object obj)
        {
            List<string> l = new List<string>();
            var s = performer.ClassString(prefix, "DataConsumer");
            l.Add(s);
            performer.AddObjectConstructor(l);
            return l;
        }

        static List<string> CreateRandomGenerator(string prefix, object obj)
        {
            List<string> l = new List<string>();
            var s = performer.ClassString(prefix, "RandomGenerator");
            l.Add(s);
            performer.AddObjectConstructor(l);
            return l;
        }

        static List<string> CreateObject(string prefix, object clazz)
        {
            string className = clazz.GetType().Name;
            string packageName = string.Concat(className
                .Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToLower();
            List<string> l = ["from lib.measurements." + packageName + " import " + className];
            l.Add(performer.ClassString(prefix, className));
            performer.AddObjectConstructor(l);
            return l;
        }

   

        public S Convert<T, S>(T obj)
        {
            var o = (object)obj;
            return (S)o;
        }

        static List<string> CreateObjectTransformerLink(string prefix, object obj)
        {

            List<string> l = new List<string>();
            var s = performer.ClassString(prefix, "ObjectTransformerLink");
            l.Add(s);
            performer.AddObjectConstructor(l);
            return l;
        }


        static List<string> CreateDataLink(string prefix, object obj)
        {

            List<string> l = new List<string>();
            var s = performer.ClassString(prefix, "DataLink");
            l.Add(s);
            performer.AddObjectConstructor(l);
            return l;
        }

        protected virtual string ClassString(string prefix, object obj)
        {
            return "";
        }


  
        protected virtual string BaseClassString(string prefix, object obj)
        {
            return obj.GetType().Name;
        }
    }
}

