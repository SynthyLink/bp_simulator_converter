using System.Net;
using System.Net.Sockets;
using System.Text;

public class AsyncTcpServer
{
    private readonly IPAddress _ipAddress = IPAddress.Any; // Listen on all available interfaces
    private readonly int _port = 13000;
    private TcpListener? _listener;
    private bool _isRunning = false;

    public async Task StartServerAsync()
    {
        try
        {
            // 1. Set up the listener
            _listener = new TcpListener(_ipAddress, _port);
            _listener.Start();
            _isRunning = true;
            Console.WriteLine($"Server started. Listening on port {_port}...");

            // 2. Main Acceptance Loop
            while (_isRunning)
            {
                // AcceptTcpClientAsync waits non-blockingly for a connection
                TcpClient client = await _listener.AcceptTcpClientAsync();
                Console.WriteLine("Client Connected!");

                // 3. Handle the connection in a separate task
                // This prevents the main loop from blocking while communicating with this client
                _ = HandleClientAsync(client);
            }
        }
        catch (SocketException ex)
        {
            Console.WriteLine($"Socket Error: {ex.Message}");
        }
        finally
        {
            StopServer();
        }
    }

    private async Task HandleClientAsync(TcpClient client)
    {
        // Get the network stream for reading/writing
        await using (NetworkStream stream = client.GetStream())
        {
            try
            {
                byte[] buffer = new byte[1024];
                int bytesRead;

                // Loop to continuously read data from the client
                while ((bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length)) > 0)
                {
                    string receivedData = Encoding.ASCII.GetString(buffer, 0, bytesRead);
                    Console.WriteLine($"Received from client: {receivedData.Trim()}");

                    // Echo the data back to the client (asynchronous send)
                    byte[] echoData = Encoding.ASCII.GetBytes($"Echo: {receivedData}");
                    await stream.WriteAsync(echoData, 0, echoData.Length);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error handling client: {ex.Message}");
            }
            finally
            {
                client.Close();
                Console.WriteLine("Client disconnected.");
            }
        }
    }

    public void StopServer()
    {
        _isRunning = false;
        _listener?.Stop();
        Console.WriteLine("Server stopped.");
    }
}

// Example usage in a console application's Main method:
public class Program
{
    public static async Task Main(string[] args)
    {
        var server = new AsyncTcpServer();
        await server.StartServerAsync();
    }
}