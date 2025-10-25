using System.Runtime.Serialization;

namespace Test.Calculation.Forms.Seriaizable
{
    [Serializable]
    public class ObjectTransformer : Forms.ObjectTransformer, ISerializable
    {
        // Test.Calculation.Forms.Seriaizable.ObjectTransformer,Test.Calculation.Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
        public ObjectTransformer()
        {
        }

        private ObjectTransformer(SerializationInfo info, StreamingContext context)
        {
            Coefficient = info.GetDouble("Coefficient");
        }

        void ISerializable.GetObjectData(SerializationInfo info, StreamingContext context)
        {
            info.AddValue("Coefficient", Coefficient);
        }
    }
}
