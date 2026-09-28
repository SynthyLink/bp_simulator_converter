namespace Abstract2DConverters.Interfaces
{
    public interface INode2DUICreator
    {
        void Load(object obj);

        IEnumerable<INode2DUI> Nodes { get; }
    }
}
