namespace TCPLibrary.Interfaces
{
    public interface IByteTransformation
    {
        byte[] Transform(byte[] data, int length);
    }
}
