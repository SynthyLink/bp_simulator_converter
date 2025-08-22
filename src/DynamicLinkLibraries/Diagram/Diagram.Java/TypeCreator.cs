using BaseTypes.Attributes;
using BaseTypes.CodeCreator.Interfaces;
using Diagram.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagram.Java
{
    [Language("Java")]
    internal class TypeCreator : ITypeCreator
    {
        internal TypeCreator()
        {
            this.AddTypeCreator();
        }
        string ITypeCreator.GetDefaultValue(object o)
        {
            throw new NotImplementedException();
        }

        string ITypeCreator.GetStringValue(object o)
        {
            throw new NotImplementedException();
        }

        string ITypeCreator.GetType(object o)
        {
            throw new NotImplementedException();
        }
    }
}
