using BaseTypes;

using CategoryTheory;

using DataPerformer.Interfaces;
using Diagram.Interfaces;
using ErrorHandler;

using IBApi;

using IBApi.messages;

using NamedTree;
using System;
using System.Web;
using Trading.Database.Interfaces;
using Trading.Library.Classes;

namespace Trading.Library.Objects
{
    public class DataQuery : CategoryObject, IIterator, IMeasurements, IStartTask, IInitializeTask
    {


        #region Fields

        public Dictionary<string, object> Symbols { get; protected set; }


        IMeasurement[] measurements;

        Dictionary<int, HistoricalDataMessageDateTime> messages = new Dictionary<int, HistoricalDataMessageDateTime>();

        internal HistoricalDataMessageDateTime message;

        int step;

        double realTime;


        double[] vector = new double[4];

        IEnumerable<HistoricalDataMessageDateTime> enu;

        IEnumerator<HistoricalDataMessageDateTime> enumerator;

        bool isUpdated = false;

        IInitializeTask task;

        #endregion

        #region Proprerties

        static public ITradingDatabaseHistoryIntefaceFactory Factrory { get; set; }

        public ITradingDatabaseHistoryInteface Database { get; init; }

        public object Object { get; set; } = new object();

        public DateTime Begin { get; set; } = DateTime.Now;

        public DateTime End { get; set; } = DateTime.Now;

        public string Period { get; set; } = "1 day";

        object o = new object();

        public string Symbol
        {
            get
            {
                var o = this.Object;
                foreach (var symbol in Symbols)
                {
                    if (o.Equals(symbol.Value))
                    {
                        return symbol.Key;
                    }

                }
                return "";

            }
            set
            {
                foreach (var symbol in Symbols)
                {
                    if (o.Equals(symbol.Key))
                    {
                        Object = symbol.Key;
                    }
                }
            }
        }
   
        public  int ToIndex(object guid)
        {
            int i = 0;
            foreach (var symbol in Symbols.Values)
            {
                if (guid.Equals(symbol))
                {
                    return i;
                }
                ++i;

            }
            return -1;
        }

        #endregion

        #region Ctor


        public DataQuery()
        {
            task = this;
            Database = Trading.Database.StaticExtensionTradingDatabase.Connect();
            Symbols = Database.Symbols;
            measurements =
               [
               new RealTimeMeasurement(this),
                    new LowMeasurement(this),
                    new HighMeasurement(this),
                    new OpenMeasurement(this),
                    new CloseMeasurement(this),
                    new CandleMeasurement(this),
                    new IntegerTimeMeasurement(this),
                    new DateTimeMeasurement(this),
                    new FullTimeMeasurement(this)
               ];

        }
        

        event Action<IMeasurement> IChildren<IMeasurement>.OnAdd
        {
            add
            {
                throw new OwnNotImplemented();
            }

            remove
            {
                throw new OwnNotImplemented();
            }
        }

        event Action<IMeasurement> IChildren<IMeasurement>.OnRemove
        {
            add
            {
                throw new OwnNotImplemented();
            }

            remove
            {
                throw new OwnNotImplemented();
            }
        }

        #endregion

        #region IMeasurements Members

        IMeasurement IMeasurements.this[int number] => measurements[number];

        int IMeasurements.Count => measurements.Length;

        bool IMeasurements.IsUpdated { get => isUpdated; set => isUpdated = value; }

        IEnumerable<IMeasurement> IChildren<IMeasurement>.Children => measurements;

        void IMeasurements.UpdateMeasurements()
        {

        }

        #endregion

        #region IIterator Members


        void IIterator.Reset()
        {
            return;
            Exception exception;
            try
            {
                step = 0;
                messages.Clear();
                var bs = Period.ToBarSize();
                var ct = new CancellationToken();
                var dt = Database.GetHistoricalDataMessageDateTimes(Object, Begin, End);
                enu = dt.Convert(bs);
                enumerator = enu.GetEnumerator();
                enumerator.MoveNext();
                message = enumerator.Current;
                messages[step] = message;
                Set();
                return;
            }
            catch (Exception ex)
            {
                exception = IncludedException.Get(ex);
            }
            throw exception;
        }

        bool IIterator.Next()
        {
            if (!enumerator.MoveNext())
            { return false; }
            message = enumerator.Current;
            Set();
            ++step;
            messages[step] = message;
            return true;
        }

        #endregion

        #region Private

        void Set()
        {
            message.FillVector(vector);
            realTime = (double)step;
        }

        object CoordX(object obj)
        {
            double k = (double)obj;
            int p = (int)Math.Round(k);
            if (messages.ContainsKey(p))
            {
                var dt = messages[p];

                return ((DateTime)dt.Date).ToString("yyyy'-'MM'-'dd' 'HH':'mm':'ss");
            }
            return "";
        }

        void IChildren<IMeasurement>.AddChild(IMeasurement child)
        {
            throw new OwnNotImplemented();
        }

        void IChildren<IMeasurement>.RemoveChild(IMeasurement child)
        {
            throw new OwnNotImplemented();
        }

        #endregion

        #region Measurements
        class BasicMeasurement : IMeasurement, IAssociatedObject
        {
            protected object type;

            string name;

            protected DataQuery query;

            protected Func<object> func;

            public BasicMeasurement(string name, DataQuery query)
            {
                this.name = name;
                this.query = query;
                type = (double)0;
            }


            Func<object> IMeasurement.Parameter => func;

            string IMeasurement.Name => name;

            object IMeasurement.Type => type;

            object IAssociatedObject.Object { get => query; set { } }
        }


        class LowMeasurement : BasicMeasurement
        {
            public LowMeasurement(DataQuery query) : base("Low", query)
            {

                func = () => query.message.Low;
            }
        }


        class HighMeasurement : BasicMeasurement
        {
            public HighMeasurement(DataQuery query) : base("High", query)
            {

                func = () => query.message.High;
            }
        }

        class OpenMeasurement : BasicMeasurement
        {
            public OpenMeasurement(DataQuery query) : base("Open", query)
            {

                func = () => query.message.Open;
            }
        }

        class CloseMeasurement : BasicMeasurement
        {
            public CloseMeasurement(DataQuery query) : base("Close", query)
            {

                func = () => query.message.Close;
            }
        }

        class RealTimeMeasurement : BasicMeasurement, IAssociatedObject
        {
            Func<object, object>[] f;
            public RealTimeMeasurement(DataQuery query) : base("RealTime", query)
            {

                func = () => query.realTime;
                f = [query.CoordX, null];
            }



            object IAssociatedObject.Object { get => f; set { } }
        }

        class IntegerTimeMeasurement : BasicMeasurement
        {
            public IntegerTimeMeasurement(DataQuery query) : base("Step", query)
            {
                type = (int)0;

                func = () => query.step;
            }
        }

        class DateTimeMeasurement : BasicMeasurement
        {
            public DateTimeMeasurement(DataQuery query) : base("DateTime", query)
            {
                type = typeof(DateTime);
                func = () => query.message.Date;
            }
        }

        class FullTimeMeasurement :  BasicMeasurement
        {
            public FullTimeMeasurement(DataQuery query) : base("FullTime", query)
            {
                type = (double)0;

                func = f;
             }
            object f()
            {
                var d = query.message.Date;
                if (d == null)
                {
                    return null;
                }
                return d.Value.ToOADate();
            }
    }





    class CandleMeasurement : BasicMeasurement
        {

            public CandleMeasurement(DataQuery query) : base("Candle", query)
            {
                type = new ArrayReturnType((double)0, new int[4], false);
                func = () => query.vector;
            }

        }


        #endregion

        public  object ToGuid(string symbol)
        {
            return Symbols[symbol];
        }

  
        async Task IStartTask.Start(CancellationToken cancellationToken)
        {
           Exception exception;
            try
            {
                step = 0;
                messages.Clear();
                var bs = Period.ToBarSize();
                var ct = new CancellationToken();
                var dt = await Database.GetHistoricalDataMessageDateTimes(Object, Begin, End, cancellationToken);
                enu = dt.Convert(bs);
                enumerator = enu.GetEnumerator();
                enumerator.MoveNext();
                message = enumerator.Current;
                messages[step] = message;
                Set();
                return;
            }
            catch (Exception ex)
            {
                exception = IncludedException.Get(ex);
            }
            throw exception;
        }

        async Task IInitializeTask.Initialize(CancellationToken cancellationToken)
        {
            var dt = await Database.GetSymbols(cancellationToken);
            Symbols = dt;
        }

        public static async Task<DataQuery> Create(CancellationToken cancellationToken)
        {
            var x = new DataQuery();
            await x.task.Initialize(cancellationToken);
            return x;
        }

        public static async Task<Dictionary<string, object>> GetHistorycalSymbols(CancellationToken cancellationToken)
        {
            var x = new DataQuery();
            await x.task.Initialize(cancellationToken);
            return x.Symbols;
        }


        public static async Task<DataQuery> Create(DataQueryInit init, CancellationToken cancellationToken)
        {
            var x = await Create(cancellationToken);
            x.Period = init.period;
            x.Symbol = init.symbol;
            x.Begin = new DateTime(init.begin);
            x.End = new DateTime(init.end);
            return x;
        }
    }
}

