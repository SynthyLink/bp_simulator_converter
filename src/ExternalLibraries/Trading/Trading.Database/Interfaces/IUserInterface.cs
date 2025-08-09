namespace Trading.Database.Interfaces
{
    public interface IUserInterface
    {
        string Connect(string s);

        void Close();
    }
}
