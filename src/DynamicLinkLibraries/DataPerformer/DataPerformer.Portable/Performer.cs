using System.Collections.Generic;
using BaseTypes.Interfaces;
using DataPerformer.Interfaces;
using DataPerformer.Portable.Interfaces;

using Diagram.UI;
using Diagram.UI.Aliases;
using Diagram.UI.Interfaces;
using Diagram.UI.Labels;

using ErrorHandler;

using NamedTree;


namespace DataPerformer.Portable
{
    public class Performer
    {

        public void InitValued1(IMeasurements measurements)
        {
            for (int i = 0; i < measurements.Count; i++)
            {
                var m = measurements[i];
                if (m is IInitialValue iv)
                {
                    iv.Set();
                }
            }
        }

        public void SetFeedBackAlias(IMeasurements measurements)
        {
            for (int i = 0; i < measurements.Count; i++)
            {
                var m = measurements[i];
                if (m is IFeedbackAlias iv)
                {
                    iv.Set();
                }
            }
        }


        public AliasName FindAliasName(IDataConsumer consumer, string alias, bool allowNulls = false)
        {
            if (alias == null)
            {
                if (allowNulls)
                {
                    throw new OwnException("Null alias is not accepted");
                }
                return null;
            }
            IAssociatedObject ao = consumer as IAssociatedObject;
            INamedComponent nc = ao.Object as INamedComponent;
            return FindAliasName(consumer, nc.Desktop, alias);
        }

        /// <summary>
        /// Finds alias 
        /// </summary>
        /// <param name="consumer">Data consumer</param>
        /// <param name="desktop">Desktop</param>
        /// <param name="alias">Alias name</param>
        /// <returns>Alias</returns>
        public  AliasName FindAliasName( IDataConsumer consumer,
            IDesktop desktop, string alias)
        {
            string ali = alias;
            IDesktop desk = null;
            if (ali.StartsWith("../"))
            {
                int k = ali.LastIndexOf('.');
                string n = ali.Substring(0, k);
                INamedComponent nc = PureDesktop.GetFromRoot(desktop, n);
                desk = nc.Desktop;
                k = ali.LastIndexOf("/");
                ali = ali.Substring(k + 1);
            }
            object[] o = FindAlias(consumer, desk, ali);
            if (o == null)
            {
                return null;
            }
            return new AliasName(o[0] as IAlias, o[1] as string); ;
        }


        /// <summary>
        /// Finds alias by name
        /// </summary>
        /// <param name="consumer">Data consumer</param>
        /// <param name="desktop">Desktop</param>
        /// <param name="alias">Alias name</param>
        /// <returns>Alias</returns>
        public  object[] FindAlias(IDataConsumer consumer, IDesktop desktop, string alias)
        {
            for (int i = 0; i < consumer.Count; i++)
            {
                object o = consumer[i];
                if (o is IAssociatedObject)
                {
                    IAssociatedObject ao = o as IAssociatedObject;
                    IAlias al = AliasWrapper.GetAlias(ao);
                    if (al != null)
                    {
                        if (ao.Object != null)
                        {
                            if (ao.Object is INamedComponent)
                            {
                                INamedComponent nc = ao.Object as INamedComponent;
                                string n = nc.Name;
                                IList<string> l = al.AliasNames;
                                foreach (string an in l)
                                {
                                    string s = n + "." + an;
                                    if (s.Equals(alias))
                                    {
                                        return new object[] { al, an };
                                    }
                                }
                            }
                        }
                    }
                }
                if (o is IDataConsumer)
                {
                    IDataConsumer c = o as IDataConsumer;
                    object[] r = FindAlias(c, desktop, alias);
                    if (r != null)
                    {
                        return r;
                    }
                }
            }
            return null;

        }




    }
}
