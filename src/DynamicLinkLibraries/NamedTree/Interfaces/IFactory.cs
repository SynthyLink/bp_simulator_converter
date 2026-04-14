namespace NamedTree.Interfaces
{
    /// <summary>
    /// Universal facory
    /// </summary>
    public interface IFactory
    {
        /// <summary>
        /// Gets a facrory
        /// </summary>
        /// <typeparam name="T">The type</typeparam>
        /// <param name="name">The name</param>
        /// <returns>The factory</returns>
        T Get<T>(string name) where T : class;

        /// <summary>
        /// Sets the factory
        /// </summary>
        /// <typeparam name="T">The type</typeparam>
        /// <param name="name">The name</param>
        /// <param name="t">The factory</param>
        void Set<T>(string name, T t) where T : class;
    }
}
