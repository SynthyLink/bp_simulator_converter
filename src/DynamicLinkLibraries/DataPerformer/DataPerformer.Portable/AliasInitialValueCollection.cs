using DataPerformer.Interfaces;

using Diagram.UI;
using Diagram.UI.Attributes;
using Diagram.UI.Interfaces;

namespace DataPerformer.Portable
{
    public class AliasInitialValueConnection : InitialValueCollection
    {
        NamedTree.Performer performer = new NamedTree.Performer();

        Performer pr = new Performer();
        public AliasInitialValueConnection(IAlias alias, IMeasurements measurememts)
        {
          var attr = performer.GetAttribute<CodeCreatorAttribute>(measurememts);
            if (attr != null && attr.AliasInitialState)
            {
                for (int i = 0; i < measurememts.Count; i++)
                {
                    var al = pr.InitialValue(alias, measurememts[i]);
                    if (al != null)
                    {
                        initial.Add(al);
                    }
                }
            }
        }
    }

}