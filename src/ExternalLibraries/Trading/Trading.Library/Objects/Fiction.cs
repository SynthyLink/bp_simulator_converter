using CategoryTheory;
using Diagram.UI.Interfaces;

namespace Trading.Library.Objects
{
    public class Fiction : CategoryObject, IInitializeTask
    {
        public Fiction() 
        { 
        }

        Task IInitializeTask.InitializeAsync(CancellationToken cancellationToken)
        {
            return Task.Delay(2000);
        }
    }
}
