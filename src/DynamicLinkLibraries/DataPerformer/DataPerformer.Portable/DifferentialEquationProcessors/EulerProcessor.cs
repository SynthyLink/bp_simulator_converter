using DataPerformer.Interfaces;

namespace DataPerformer.Portable.DifferentialEquationProcessors
{
    /// <summary>
    /// Euler processor
    /// </summary>
    public class EulerProcessor : DifferentialEquationProcessor
    {
        /// <summary>
        /// Singleton
        /// </summary>
        new static public readonly DifferentialEquationProcessor Processor = new EulerProcessor();

        /// <summary>
        /// Auxiliary variable
        /// </summary>
        private double[] w;

        /// <summary>
        /// Constructor
        /// </summary>
        private EulerProcessor()
        {

        }

        /// <summary>
        /// Performs step of integration
        /// </summary>
        /// <param name="t0">Step start</param>
        /// <param name="t1">Step finish</param>
        protected override void Step(double t0, double t1)
        {
            isBusy = true;
            if (Dim == 0)
            {
                return;
            }
            double dt = t1 - t0;
            int i = 0;
            double t = t0;
            foreach (IMeasurements m in equations)
            {
                for (int j = 0; j < m.Count; j++)
                {
                    w[i] = (double)m[j].Parameter();
                    ++i;
                }
            }
            StaticExtensionDataPerformerPortable.Time = t;
            StaticExtensionDataPerformerPortable.Desktop.ResetUpdatedMeasurements();
            UpdateMeasurements();
            i = 0;
            foreach (IMeasurements m in equations)
            {
                IDifferentialEquationSolver s = m as IDifferentialEquationSolver;
                s.CalculateDerivations();
                for (int j = 0; j < m.Count; j++)
                {
                    IDerivation der = m[j] as IDerivation;
                    w[i] = w[i] + der.Derivation.ToDouble() * dt;
                    ++i;
                }
                s.CopyVariablesToSolver(i - m.Count, w);
            }
            isBusy = false;
        }

        /// <summary>
        /// Sets consumers
        /// </summary>
        /// <param name="collection">Consumers</param>
        /// <returns>Lists of parameters</returns>
        protected override void Set(object collection)
        {
            base.Set(collection);
            UpdateDimension();
        }

        /// <summary>
        /// Updates dimension
        /// </summary>
        protected override void UpdateDimension()
        {
            int n = Dim;
            w = new double[n];
        }

        /// <summary>
        /// Creates new processor
        /// </summary>
        protected override IDifferentialEquationProcessor New
        {
            get
            {
                return new EulerProcessor();
            }
        }

    }
}
