namespace TCPLibrary.Interfaces
{
    public interface IByteTransformation
    {
        Task<byte[]> Transform(byte[] data, int length);
    }
}
