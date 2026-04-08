namespace Motion6D.Interfaces
{
    /// <summary>
    /// Saves graphical data
    /// </summary>
    public interface ISaveGrahicalData
    {
        /// <summary>
        /// Saves graph data
        /// </summary>
        /// <param name="directory">Directoryu</param>
        /// <param name="language">Language</param>
        void Save(string directory, string language);
    }
}
