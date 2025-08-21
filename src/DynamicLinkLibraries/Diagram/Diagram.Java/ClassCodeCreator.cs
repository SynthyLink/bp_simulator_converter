using BaseTypes.Attributes;

using Diagram.UI.Interfaces;

namespace Diagram.Java
{
    [Language("Java")]
    public class ClassCodeCreator : IClassCodeCreator, IDictionaryCodeCreator<string, string>
    {
        protected static IDictionaryCodeCreator<string, string> dcc;

        protected NamedTree.Performer formulaPerformer = new();


        protected Dictionary<Func<object, bool>, Func<string, object, List<string>>> dictionary;

        protected Dictionary<string, string> classes;

        void Init()
        {
            dcc = this;
        }

        protected ClassCodeCreator(bool b)
        {
            Init();
        }

        public ClassCodeCreator()
        {
            Init();
            classes = new Dictionary<string, string>()
            {
               
            };

            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
          };
   
        }

        #region Interface

        List<string> IClassCodeCreator.CreateCode(string preffix, object obj)
        {
            return CreateCode(preffix, obj);
        }


        #endregion

        #region Protected Members

        protected bool DetectType(object o, string type)
        {
            return o.GetType().Name == type;
        }

        protected List<string> CreateExt(string preffix, object ob)
        {
            var l = new List<string>();
            var t = ob.GetType().Name;
            var s = classes[t];
            l.Add("protected class " + preffix + " extends " + s);
            l.Add("{");
            l.Add("\tpublic " + preffix + "(String name, IDesktop desktop) {");
            l.Add("\t\tsuper(name,  desktop);");
            return l;
        }

        protected virtual List<string> CreateCode(string preffix, object obj)
        {
            foreach (Func<object, bool> key in dictionary.Keys)
            {
                if (key(obj))
                {
                    var l = CreateExt(preffix, obj);
                    var ll = dictionary[key](preffix, obj);
                    formulaPerformer.Add(l, ll, 2);
                    l.Add("}");
                    l.Add("");
                    return l;
                }
            }
            return null;
        }


        #endregion

        #region  Creators

        static List<string> CreateDataLink(string preffix, object obj)
        {
            return new List<string>() { "}" };
        }


        static List<string> CreateDataConsumer(string preffix, object obj)
        {
            return new List<string>();
        }

        Dictionary<string, List<string>> IDictionaryCodeCreator<string, string>.Create(string id, 
            Dictionary<string, string> dictionary)
        {
            var n = dictionary.Count;
            var l = new List<string>();
            l.Add("var " + id + " = new java.util.HashMap<String, String>() {");
            l.Add("\t{");
            foreach (var i in dictionary)
            {
                l.Add("\t\tput(\""+ i.Key + "\", \""  + i.Value + "\");");
            }
            l.Add("\t}");
            l.Add("};");
            var d = new Dictionary<string, List<string>>();
            d["code"] = l;
            return d;
        }

        #endregion

    }
}
