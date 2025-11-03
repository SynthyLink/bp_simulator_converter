// See https://aka.ms/new-console-template for more information

using ErrorHandler;
using System.Text;
using TCPLibrary.Interfaces;

var server = new AsyncTcpServer(7168, new Transformation());

StaticExtensionErrorHandler.Set(new ExceptionHandler());

server.StartServerAsync();

Console.ReadKey();

class Transformation : IByteTransformation
{
    byte[] IByteTransformation.Transform(byte[] data, int length)
    {
        string receivedData = Encoding.ASCII.GetString(data, 0, length);
        Console.WriteLine($"Received from client: {receivedData.Trim()}");

        // Echo the data back to the client (asynchronous send)
        byte[] echoData = Encoding.ASCII.GetBytes($"Echo: {receivedData}");
        return echoData;
    }
}

class ExceptionHandler : IExceptionHandler
{
    void IExceptionHandler.HandleException<T>(T exception, params object[]? obj)
    {
        throw new NotImplementedException();
    }

    void IExceptionHandler.Log(string message, params object[]? obj)
    {
        Console.WriteLine(message);
    }
}