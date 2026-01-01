using System.Reflection;

using BaseTypes;
using BaseTypes.Attributes;
using BaseTypes.CodeCreator.Interfaces;
using CategoryTheory;
using Diagram.UI;
using Diagram.UI.Interfaces;
using System.Linq;

namespace Diagram.Python
{
    [Language("Python")]
    public class CodeCreator : ITypeCreator, IDictionaryCodeCreator<string, string>,
        IDictionaryCodeCreator<string, object>, 
        IEnumerableCodeCreator<string>, IAliasCodeCreator, 
        IFeedbackCollectionCodeCreator

    {
        #region Fields

        public static ITypeCreator TypeCreator
        {
            get;
        } = new CodeCreator();


        static protected UI.Python.Performer performer = new();

        // done! need?
        static public readonly Dictionary<Type, string> TypeCorrespodnence =
            new Dictionary<Type, string>()
            {
               { typeof(double), "float" },
               { typeof(float), "float" },
               { typeof(sbyte), "float" },
               { typeof(byte), "byte" },
               { typeof(short), "float" },
               { typeof(ushort), "float" },
               { typeof(int), "int" },
               { typeof(uint), "int" },
               { typeof(long), "int" },
               { typeof(ulong), "int" },
               { typeof(bool), "bool" },
              { typeof(string), "str" },
            };

        static private readonly Dictionary<string, string> defaultValue = new Dictionary<string, string>()
        {
            {"False", "false"},
            {"True", "true"},
            {"\"\"", "\"\""},
        };


        #endregion

        protected CodeCreator(bool b)
        {
            
        }


        private CodeCreator()
        {
           this.AddTypeCreator();
        }

        #region ITypeCreator Members

        /// <summary>
        /// Get string type of object
        /// </summary>
        /// <param name="o">Object</param>
        /// <returns>The string type</returns>
        /// done?
        public string GetType(object o)
        {
            if (o is ArrayReturnType)
            {
                ArrayReturnType t = o as ArrayReturnType;
                string dtype = "object";
                if (!t.IsObjectType)
                {
                    dtype = GetType(t.ElementType);
                }
                return dtype;
            }
            Type type = o.GetType();
            if (TypeCorrespodnence.ContainsKey(type))
            {
                return TypeCorrespodnence[type];
            }
            if (o is Type)
            {
                Type t = o as Type;
                return t.FullName;
            }
            return "object";
        }

        /// <summary>
        /// Gets default value of object
        /// </summary>
        /// <param name="o">The object</param>
        /// <returns></returns>
        public string GetDefaultValue(object o)
        {
            if (o.GetType().ToString().Contains("System.Tuple"))
            {
                return "";
            }
            string ot = o.GetDefaultStringValue();
            if (ot != null)
            {
                return ot;
            }
            else if (o is ArrayReturnType)
            {
                ArrayReturnType t = o as ArrayReturnType;
                string dtype = GetType(t);
                string dims = string.Join(", ", t.Dimension);
                string result = "numpy.zeros([" + dims + "], dtype=" + dtype + ")";
                // If array is of pure object type, fill it with `None`.
                // The above text will generate an array filled with 0's as objects insteead
                if (dtype == "object")
                {
                    int totalLength = t.Dimension.Aggregate(1, (a, b) => a * b);
                    result = "numpy.asarray([None] * " + totalLength + ").reshape(" + dims + ")";
                }
                return result;
            }
            else if (o is DateTime)
            {
                return "datetime.fromtimestamp(0)";
            }
            string s = o + "";
            if (defaultValue.ContainsKey(s))
            {
                return defaultValue[s];
            }
            if (o is Type)
            {
                Type t = o as Type;
                TypeInfo ti = IntrospectionExtensions.GetTypeInfo(t);
                if (ti.IsClass | ti.IsInterface | ti.IsAbstract)
                {
                    return "None";
                }
                else
                {
                    return "";
                }
            }
            if (s.Equals("System.Object"))
            {
                return "";
            }
            return s;
        }

        //done
        string ITypeCreator.GetStringValue(object o)
        {
            return (o is string) ? "\"" + o + "\"" : "str(" + o + ")";
        }

        #endregion

        //done
        Dictionary<string, List<string>> IDictionaryCodeCreator<string, object>.Create(string id, Dictionary<string, object> dictionary)
        {
            List<string> l = new List<string> { "# Python generated code \n" };
            l.Add(id + " = {" + string.Join(", ", dictionary.Select(entry => "\"" + entry.Key + "\" : " + performer.StringValue(entry.Value))) + "}");
            //l.Add(string.Join(", ", dictionary.Select((k, v) => "\"" + k + "\" : " + performer.StringValue(v))));
            return new Dictionary<string, List<string>> { ["code"] = l };
        }


        //done
        Dictionary<string, List<string>> IDictionaryCodeCreator<string, string>.Create(string id, Dictionary<string, string> dictionary)
        {
            return (this as IDictionaryCodeCreator<string, object>)
                .Create(id, dictionary.ToDictionary(kv => kv.Key, kv => (object)kv.Value));
        }

        //done
        Dictionary<string, List<string>> IFeedbackCollectionCodeCreator.Create(IFeedbackCollectionHolder holder)
        {
            var d = new Dictionary<string, List<string>>();
            d["code"] = Create(holder);
            return d;
        }

        //done
        Dictionary<string, List<string>> Create(string id, IAlias alias)
        {
            UI.Performer p = new UI.Performer();
            IDictionaryCodeCreator<string, object> d = this;
            var dp = p.FromAlias(alias);
            var cd = d.Create("map", dp);
            return cd;
        }

        Dictionary<string, List<string>> IAliasCodeCreator.Create(string id, IAlias alias)
        {
            return Create(id, alias);
        }

        IDictionaryCodeCreator<string, string> dcc => this;


        //irrelevant???
        private List<string> Create(IFeedbackCollectionHolder holder)
        {
            var feedback = holder.Feedback;
            var l = new List<string>();
            if (feedback is IFeedbackAliasCollection fa)
            {
                feedback.Fill();
                var d = fa.Dictionary;
                if (d.Count > 0)
                {
                    l.Add("setFeedback() -> None: ");
                    var ll = dcc.Create("map", fa.Dictionary).Values.ToArray()[0];
                    ll.Add("\tself.feedback = FeedbackAliasCollection(map, self, self)");
                    performer.Add(l, ll, 1);
                    //l.Add("}");
                }
            }
            return l;
        }

        Dictionary<string, List<string>> IEnumerableCodeCreator<string>.Create(string id, IEnumerable<string> values)
        {
            return new Dictionary<string, List<string>>();  
        }
    }
}
