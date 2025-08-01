using System;
using System.Collections.Generic;
using System.Linq;

using CategoryTheory;

using DataPerformer.Interfaces;

using Diagram.UI;
using Diagram.UI.Interfaces;

using NamedTree;

namespace DataPerformer.Portable
{

    /// <summary>
    /// Backup of time provider
    /// </summary>
    public class TimeProviderBackup : IDisposable
    {
        #region Fields

        Dictionary<ITimeMeasurementConsumer, IMeasurement> dictionary = new ();

        IDataConsumer consumer;

        IComponentCollection collection;

        IDataRuntime runtime;

        IDifferentialEquationProcessor processor;

        List<IMeasurements> measurements = null;


        #endregion

        #region Ctor

        /// <summary>
        /// Constructor
        /// </summary>
        private TimeProviderBackup()
        {

        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="collection">Collection</param>
        /// <param name="provider">Time provider</param>
        /// <param name="priority">Priority</param>
        /// <param name="reason">Reason</param>
        public TimeProviderBackup(IComponentCollection collection, ITimeMeasurementProvider provider,
           int priority, string reason) : this() 

        {
            this.collection = collection;
            CreateMeasurements(priority, reason);
            runtime = StaticExtensionDataPerformerPortable.Factory.Create(collection, priority, reason);
            SetTimeProvider(collection, provider, dictionary);
        }


        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="consumer">Data consumer</param>
        /// <param name="provider">Time provider</param>
        /// <param name="processor">Differential equation processor</param>
        /// <param name="reason">Reason</param>
        /// <param name="priority">Priority</param>
        public TimeProviderBackup(IDataConsumer consumer, ITimeMeasurementProvider provider, 
            IDifferentialEquationProcessor processor, string reason, int priority) : this() 
        {
            this.consumer = consumer;
            collection = consumer.GetDependentCollection(priority);
            runtime = consumer.CreateRuntime(reason, priority);
            SetTimeProvider(collection, provider, dictionary);
            CreateMeasurements(priority, null);
            Set(processor, collection);
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="collection">Collection</param>
        /// <param name="provider">Time provider</param>
        /// <param name="processor">Differential equation processor</param>
        /// <param name="priority">Priority</param>
        /// <param name="reason">Reason</param>
        public TimeProviderBackup(IComponentCollection collection, ITimeMeasurementProvider provider,
            IDifferentialEquationProcessor processor, int priority, string reason) : this()
        {
            this.collection = collection;
            CreateMeasurements(priority, reason);
            runtime = StaticExtensionDataPerformerPortable.Factory.Create(collection, priority);
            SetTimeProvider(collection, provider);
            Set(processor, collection);
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="collection">Collection</param>
        /// <param name="priority">Priority</param>
        /// <param name="reason">Reason</param>
        public TimeProviderBackup(IComponentCollection collection, int priority, string reason) : this()
        {
            this.collection = collection;
            CreateMeasurements(priority, reason);
            runtime = StaticExtensionDataPerformerPortable.Factory.Create(collection, priority);
            SetTimeProvider(collection, runtime.TimeProvider);
            Set(DifferentialEquationProcessors.DifferentialEquationProcessor.Processor, collection);
        }

        #endregion

        protected virtual void Dispose()
        {
            if (collection != null)
            {
                collection.ForEach((IStopped stop) => { stop.Stop(); });
                ResetTime();
                dictionary.Clear();
                return;
            }
            Reset(consumer);
            dictionary.Clear();
            if (runtime is IDisposable)
            {
                IDisposable d = runtime as IDisposable;
                d.Dispose();
            }
            if (processor != null)
            {
                processor.Clear();
            }
        }

        #region IDisposable Members

        void IDisposable.Dispose()
        {
            Dispose();
        }

        #endregion

        #region Members

        /// <summary>
        /// Component collection
        /// </summary>
        public IComponentCollection ComponentCollection => collection;

        /// <summary>
        /// Processor
        /// </summary>
        public IDifferentialEquationProcessor Processor => processor;

        /// <summary>
        /// Runtime
        /// </summary>
        public IDataRuntime Runtime
        {
            get
            {
                return runtime;
            }
        }

        /// <summary>
        /// Measurements
        /// </summary>
        public List<IMeasurements> Measurements
        {
            get
            {
                return measurements;
            }
        }

        public void SetTimeProvider(IComponentCollection collection, ITimeMeasurementProvider provider)
        {
            collection.ForEach((ITimeMeasurementConsumer c) =>
            {
                SetTimeProvider(c, provider);
            }
            );
        }


        public void SetTimeProvider(IEnumerable<object> enu, ITimeMeasurementProvider provider)
        {
            foreach (var o in enu)
            {
                SetTimeProvider(o, provider);
            }
        }
        void SetTimeProvider(ITimeMeasurementConsumer tc, ITimeMeasurementProvider provider)
        {
            SetTimeProvider(tc, provider, dictionary);
        }

        void SetTimeProvider(object o, ITimeMeasurementProvider provider)
        {
            if (o is ITimeMeasurementConsumer tc)
            {
                SetTimeProvider(tc, provider, dictionary);
            }
        }

        static void SetTimeProvider(ITimeMeasurementConsumer tc, ITimeMeasurementProvider provider,
            IDictionary<ITimeMeasurementConsumer, IMeasurement> dictionary)
        {
            var tct = tc.Time;
            var pt = provider.TimeMeasurement; 
            if (tct == pt)
            {
                return;
            }
            if (dictionary.ContainsKey(tc))
            {
                tc.Time = pt;
            }
            else
            {
                dictionary[tc] = tct;
                tc.Time = pt;
            }
            IChildren<IAssociatedObject> co = tc.GetLabelObject<IChildren<IAssociatedObject>>();
            if (co != null)
            {
                IAssociatedObject[] ch = co.Children.ToArray();
                if (ch != null)
                {
                    foreach (object ob in ch)
                    {
                        if (ob is ITimeMeasurementConsumer c)
                        {
                            SetTimeProvider(c, provider, dictionary);
                        }
                    }
                }
            }
        }

        void Set(IDifferentialEquationProcessor processor, IComponentCollection collection)
        {
            if (processor != null)
            {
                this.processor = processor;
                this.processor.Set(collection);
            }

        }

        private static void SetTimeProvider(IComponentCollection collection,
            ITimeMeasurementProvider provider, IDictionary<ITimeMeasurementConsumer, IMeasurement> dictionary)
        {
            var c = collection.GetAll<ITimeMeasurementConsumer>();
            foreach (var o in c)
            {
                SetTimeProvider(o, provider, dictionary);
            }
        }

        void ResetTime()
        {
            foreach (var key in dictionary.Keys)
            {
                key.Time = dictionary[key];
            }
        }

        private void Reset(object o)
        {
            if (o is ITimeMeasurementConsumer)
            {
                ITimeMeasurementConsumer tc = o as ITimeMeasurementConsumer;
                if (dictionary.ContainsKey(tc))
                {
                    tc.Time = dictionary[tc];
                }
            }
            if (o is IChildren<IAssociatedObject> co)
            {
                IAssociatedObject[] ch = co.Children.ToArray();
                foreach (object ob in ch)
                {
                    Reset(ob);
                }
            }
        }


        private void Reset(IDesktop desktop)
        {
            IEnumerable<ICategoryObject> co = desktop.CategoryObjects;
            foreach (object o in co)
            {
                Reset(o);
            }
        }


        /// <summary>
        /// Sets time provider to data consumer and all dependent objects
        /// </summary>
        /// <param name="consumer">Data consumer</param>
        /// <param name="provider">Data provider</param>
        /// <param name="dictionary">Backup dictionary</param>
        private static void SetTimeProvider(IDataConsumer consumer,
            ITimeMeasurementProvider provider, IDictionary<ITimeMeasurementConsumer, IMeasurement> dictionary)
        {
            if (consumer is ITimeMeasurementConsumer)
            {
                ITimeMeasurementConsumer tc = consumer as ITimeMeasurementConsumer;
                if (dictionary.ContainsKey(tc))
                {
                    if (tc.Time != provider.TimeMeasurement)
                    {
                        dictionary[tc] = tc.Time;
                        tc.Time = provider.TimeMeasurement;
                    }
                }
                else
                {
                    dictionary[tc] = tc.Time;
                    tc.Time = provider.TimeMeasurement;
                }
            }
            // IDataRuntime dr = consumer.CreateRuntime();
        }

        static void SetTimeProvider(IChildren<IAssociatedObject> co, ITimeMeasurementProvider provider, IDictionary<ITimeMeasurementConsumer, IMeasurement> dictionary)
        {
            IAssociatedObject[] ao = co.Children.ToArray();
            foreach (object o in ao)
            {
                if (o is IDataConsumer)
                {
                    IDataConsumer dc = o as IDataConsumer;
                    SetTimeProvider(dc, provider, dictionary);
                }
                else if (o is IMeasurements)
                {
                    IMeasurements mea = o as IMeasurements;
                    SetTimeProvider(mea, provider, dictionary);
                }
                if (o is IChildren<IAssociatedObject> cho)
                {
                    SetTimeProvider(cho, provider, dictionary);
                }
            }
        }

        static void SetTimeProvider(IMeasurements m, ITimeMeasurementProvider provider, IDictionary<ITimeMeasurementConsumer, IMeasurement> dictionary)
        {
            if (m is ITimeMeasurementConsumer)
            {
                ITimeMeasurementConsumer mc = m as ITimeMeasurementConsumer;
                if (dictionary.ContainsKey(mc))
                {
                    if (mc.Time != provider.TimeMeasurement)
                    {
                        dictionary[mc] = mc.Time;
                        mc.Time = provider.TimeMeasurement;
                    }
                }
                else
                {
                    dictionary[mc] = mc.Time;
                    mc.Time = provider.TimeMeasurement;
                }
            }
            if (m is IDataConsumer)
            {
                IDataConsumer dc = m as IDataConsumer;
                SetTimeProvider(dc, provider, dictionary);
            }
            if (m is MeasurementsWrapper)
            {
                MeasurementsWrapper mw = m as MeasurementsWrapper;
                int n = mw.Count;
                for (int i = 0; i < n; i++)
                {
                    SetTimeProvider(mw[i], provider, dictionary);
                }
            }
        }

        private void Reset(IDataConsumer consumer)
        {
            if (consumer is ITimeMeasurementConsumer)
            {
                ITimeMeasurementConsumer tc = consumer as ITimeMeasurementConsumer;
                if (dictionary.ContainsKey(tc))
                {
                    tc.Time = dictionary[tc];
                }
            }
            for (int i = 0; i < consumer.Count; i++)
            {
                IMeasurements m = consumer[i];
                if (m is ITimeMeasurementConsumer)
                {
                    ITimeMeasurementConsumer mc = m as ITimeMeasurementConsumer;
                    if (dictionary.ContainsKey(mc))
                    {
                        mc.Time = dictionary[mc];
                    }
                }
                if (m is IDataConsumer)
                {
                    IDataConsumer dc = m as IDataConsumer;
                    Reset(dc);
                }
            }
        }

        private void CreateMeasurements(int priority, string reason)
        {
            List<IMeasurements> l = new List<IMeasurements>();
            collection.ForEach((IDataConsumer c) =>
            {
                if (c.SatisfiesReason(reason))
                {
                    for (int i = 0; i < c.Count; i++)
                    {
                        IMeasurements m = c[i];
                        if (!l.Contains(m))
                        {
                            l.Add(m);
                        }
                    }
                }
            });
            collection.ForEach((IMeasurements m) =>
            {

                if (priority == 0)
                {
                    if (!l.Contains(m))
                    {
                        l.Add(m);
                    }
                }
                else
                {
                    int n = m.GetPriority();
                    if (n == 0)
                    {
                        l.Add(m);
                    }
                    else
                    {
                        if (n < priority)
                        {
                            l.Add(m);
                        }
                    }
                }
            }
            );
            List<IMeasurements> add = new List<IMeasurements>();
            l.Sort(StaticExtensionDiagramUI.ObjectComparer);
            measurements = l;
            measurements.SortMeasurements();
        }

        #endregion
    }

}
