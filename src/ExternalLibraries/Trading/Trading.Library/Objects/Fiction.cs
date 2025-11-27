using CategoryTheory;
using Diagram.UI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trading.Library.Objects
{
    public class Fiction : CategoryObject, IInitializeTask
    {
        Task IInitializeTask.InitializeAsync(CancellationToken cancellationToken)
        {
            return Task.Delay(2000);
        }
    }
}
