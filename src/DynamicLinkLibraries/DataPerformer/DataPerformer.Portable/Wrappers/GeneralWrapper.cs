using Diagram.Interfaces;
using Diagram.UI.Interfaces;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DataPerformer.Portable.Wrappers
{
    public class GeneralWrapper
    {
        protected Diagram.UI.Performer performer = new ();
        public async Task Start(IComponentCollection componentCollection, 
            CancellationToken cancellationToken)
        {
            var l = new List<Task>();
            performer.ForEach(componentCollection, (IStartTask t) => 
            { 
                l.Add(t.StartAsync(cancellationToken)); 
            });
            await Task.WhenAll(l);
        }
    }
}
