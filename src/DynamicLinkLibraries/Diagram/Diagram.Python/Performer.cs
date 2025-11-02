using Diagram.UI.Interfaces;

namespace Diagram.UI.TypeScript
{
 
    public class Performer : DataPerformer.Interfaces.Performer
    {

        public Performer() : base() { }


        // done
        public void AddObjectConstructor(List<string> l)
        {
            l.Add("\tdef __init__(desktop: IDesktop, name: str):");
            l.Add("\t\tsuper(desktop, name)");
        }


        public string ClassString(string preffix, string extends = null)
        {
            var s = "class " + preffix;
            if (extends != null)
            {
                s += " extends " + extends;
            }
            return s;
        }

     
        public string StringValue(object o)
        {
            if (o == null)
            {
                return "None";
            }
            Type t = o.GetType();
            if (t.Equals(typeof(double)))
            {
                double a = (double) o;
                return DoubleToString(a);
            }
            else if (t.Equals(typeof(bool)))
            {
                return ((bool) o) ? "True" : "False";
            }
            return o + "";
        }

        /// <summary>
        /// Any to string
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public string AnyToString(object obj)
        {
            Type t = obj.GetType();
            string s = StringValue(obj);
            if (t.Equals(typeof(double)))
            {
                return "(double)" + s;
            }
            if (t.Equals(typeof(string)))
            {
                return "\"" + s + "\"";
            }
            return s;
        }

        public List<string> CreateList(string id, IEnumerable<string> list)
        {
            var lt = list.ToList();
            var l = new List<string>();
            foreach ( var item in lt )
            {
                l.Add(id + ".push(\"" + item + "\");");
            }
            return l;
        }

        public List<string> CreateMap<T>(string id, Dictionary<T, string> map, string type = null)
        {
            var tt = (type == null) ? "any" : type;
            var l = new List<string>();
            l.Add("let " + id + " = new Map<" + tt + ", string>(");
            var r = new List<T>(map.Keys);
            int n = r.Count;
            l.Add("[");
            if (n == 0)
            {
                l.Add("]);");
            }
            else
            {
                for (int i = 0; i < n; i++)
                {
                    var x = r[i];
                    var s = "\t[" + StringValue(x) + ", \"" + map[x] + "\" ]";
                    if (i < (n - 1))
                    {
                        s += ',';
                    }
                    l.Add(s);
                }
                l.Add("]);");
            }
            return l;
        }
        
        public List<string> CreateStringDictionary(string id, Dictionary<string, string> dictionary)
        {
            List<string> l = new List<string>();
            var keys = new List<string>(dictionary.Keys);
            l.Add("let " + id + " = new Map<string, string>(");
            int n = keys.Count;
            l.Add("[");
            if (n == 0)
            {
                l.Add("]);");
            }
            else
            {
                for (int i = 0; i < n; i++)
                {
                    string s = keys[i];
                    s = "\t[\"" + s + "\", \"" + dictionary[s] + "\" ]";
                    if (i < (n - 1))
                    {
                        s += ',';
                    }
                    l.Add(s);
                }
                l.Add("]);");
            }
            return l;
        }




        public List<string> CreateTSAliasList(string id,  IAlias alias)
        {
            List<string> l = new List<string>();
            var al = alias.AliasNames;
            l.Add("let " + id + " = new Map<string, any>(");
            int n = al.Count;
            l.Add("[");
            if (n == 0)
            {
                l.Add("]);");
            }
            else
            {
                for (int i = 0; i < n; i++)
                {
                    string s = al[i];
                    s = "\t[\"" + s + "\", " + StringValue(alias[al[i]]) + " ]";
                    if (i < (n - 1))
                    {
                        s += ',';
                    }
                    l.Add(s);
                }
                l.Add("]);");
            }
            return l;
        }
    }
}
