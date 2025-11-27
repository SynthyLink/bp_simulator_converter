using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Trading.Library.Serializable.Objects
{
    [Serializable]
    public class Fiction : Library.Objects.Fiction, ISerializable
    {
        public Fiction() { }

        private Fiction(SerializationInfo info, StreamingContext context)
        { 
        
        }

        void ISerializable.GetObjectData(SerializationInfo info, StreamingContext context)
        {
        }
    }
}
