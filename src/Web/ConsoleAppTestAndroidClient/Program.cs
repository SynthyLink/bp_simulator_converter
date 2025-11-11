// See https://aka.ms/new-console-template for more information

using ErrorHandler;
using System.Text;
using TCPLibrary.Interfaces;
using Trading.Database.Interfaces;

ITradingDatabaseHistoryIntefaceFactory factory = new Trading.Database.SqlServer.Factory.TradingDatabaseHistoryIntefaceFactory();

var cs =  @"Data Source=IVANKOV\SQLEXPRESS;Initial Catalog=TradeStation;Integrated Security=True;Encrypt=False;MultipleActiveResultSets=True;TrustServerCertificate=true";

var db = factory.Create(cs);


StaticExtensionErrorHandler.Set(new ExceptionHandler());


var tr = new Trading.Database.Tcp.TradingDatabaseHistoryInterface(db, 7168);

await tr.StarAsync();

throw new Exception();
/*
var server = new AsyncTcpServer(7168, new Transformation());

server.StartServerAsync();
*/

Console.ReadKey();

/*
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
*/
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