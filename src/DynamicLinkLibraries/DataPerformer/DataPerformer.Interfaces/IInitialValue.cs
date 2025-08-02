namespace DataPerformer.Portable.Interfaces
{
    /// <summary>
    /// Having initial value
    /// </summary>
    public interface IInitialValue
    {
        /// <summary>
        /// Sets initial valur
        /// </summary>
        void Set();

        /// <summary>
        /// Initial value
        /// </summary>
        object Value { get; }

    }
}
