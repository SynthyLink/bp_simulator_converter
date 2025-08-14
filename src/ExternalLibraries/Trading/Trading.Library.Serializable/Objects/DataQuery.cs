using System.Runtime.Serialization;

namespace Trading.Library.Serializable.Objects
{
    [Serializable]
    public class DataQuery : Library.Objects.DataQuery, ISerializable
    {

        private DataQuery(SerializationInfo info, StreamingContext context) 
        {
            Period = info.GetString("Period");
            Begin = (DateTime)info.GetValue("Begin", typeof(DateTime));
            End = (DateTime)info.GetValue("End", typeof(DateTime));
            try
            {
                Object = info.GetValue("Guid", typeof(Guid));
            }
            catch
            {
                Object = info.GetValue("Guid", typeof(Object));
            }
        }
        public DataQuery() 
        { 
        
        }

        void ISerializable.GetObjectData(SerializationInfo info, StreamingContext context)
        {
            info.AddValue("Period", Period);
            info.AddValue("Begin", Begin, typeof(DateTime));
            info.AddValue("End", End, typeof(DateTime));
            info.AddValue("Guid", Object, typeof(object));
        }
    }
}
