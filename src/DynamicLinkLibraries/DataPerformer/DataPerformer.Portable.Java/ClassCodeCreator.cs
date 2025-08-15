using Diagram.UI;
using Diagram.UI.Attributes;
using Diagram.UI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataPerformer.Portable.Java
{
    [Language("Java")]
    internal class ClassCodeCreator : IClassCodeCreator
    {
        public ClassCodeCreator() { this.AddCodeCreator(); }
        List<string> IClassCodeCreator.CreateCode(string preffix, object obj)
        {
            throw new NotImplementedException();
        }
    }
}
