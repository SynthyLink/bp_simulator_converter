using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstract2DConverters.Interfaces
{
    public interface INode2DUIConverter
    {
        object Create(IEnumerable<INode2DUI> nodes);

        object Create(INode2DUI node);
    }
}
