using BaseTypes;
using BaseTypes.Attributes;
using DataPerformer.Interfaces.Attributes;
using System;
using System.Reflection.Metadata.Ecma335;

namespace DataPerformer.Interfaces
{
    /// <summary>
    /// Performer of basic operations
    /// </summary>
    public class Performer
    {
        NamedTree.Performer performer = new NamedTree.Performer();

        public Performer() { }

        public Func<double> Create(ITimeMeasurementConsumer consumer, TimeType timeType = TimeType.Second)
        {
            var m = consumer.Time;
            var f = () => (double)m.Parameter();
            if (timeType == TimeType.Second)
            {
                return f;
            }
            var k = TimeType.Second.Coefficient(timeType);
            return () => k * f();
        }

    }
}
