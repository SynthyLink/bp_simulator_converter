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
            l.Add("\t\tsuper(desktop, name);");
        }

        // done
        public string ClassString(string prefix, string extends = null)
        {
            var s = "class " + prefix;
            if (extends != null)
            {
                s += "(" + extends + "):";
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
                return "float(" + s + ")";
            }
            if (t.Equals(typeof(string)))
            {
                return "\"" + s + "\"";
            }
            return s;
        }

        //done
        public List<string> CreateList(string id, IEnumerable<string> list)
        {
            return new List<string> { "[" + string.Join(", ", list) + "]" };
        }

        //done
        public List<string> CreateMap<T>(string id, Dictionary<T, string> map, string type = null)
        {
            return ["{" + string.Join(", ", map.Select(kv => StringValue(kv.Key) + ": " + kv.Value)) + "}"];
        }
        
        public List<string> CreateStringDictionary(string id, Dictionary<string, string> dictionary)
        {
            return CreateMap<string>(id, dictionary);
        }

        public List<string> CreateTSAliasList(string id, IAlias alias)
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
