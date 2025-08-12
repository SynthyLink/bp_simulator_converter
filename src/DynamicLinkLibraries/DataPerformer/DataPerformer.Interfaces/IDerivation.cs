namespace DataPerformer.Interfaces
{
    /// <summary>
    /// Variable that has derivation
    /// </summary>
    public interface IDerivation
    {
        /// <summary>
        /// Derivation measure
        /// </summary>
        IMeasurement Derivation
        {
            get;
        }
    }
}
