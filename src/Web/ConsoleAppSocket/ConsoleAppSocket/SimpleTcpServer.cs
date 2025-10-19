using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

public class SimpleTcpServer
{
    private readonly int _port;
    private TcpListener _server;
    private bool _isRunning;

    public SimpleTcpServer(int port)
    {
        _port = port;
    }

    public async Task Start()
    {
        try
        {
            _server = new TcpListener(IPAddress.Any, _port);
            _server.Start();
            _isRunning = true;
            Console.WriteLine($"Server started on port {_port}. Waiting for connections...");

            while (_isRunning)
            {
                // Accept incoming client connections asynchronously
                TcpClient client = await _server.AcceptTcpClientAsync();
                Console.WriteLine("Client connected!");

                // Handle communication with the client in a separate task
                _ = HandleClientCommunication(client);
            }
        }
        catch (SocketException ex)
        {
            Console.WriteLine($"Socket Exception: {ex.Message}");
        }
        finally
        {
            Stop();
        }
    }

    public void Stop()
    {
        _isRunning = false;
        _server?.Stop();
        Console.WriteLine("Server stopped.");
    }

    private async Task HandleClientCommunication(TcpClient client)
    {
        using (client) // Ensure client resources are disposed
        {
            NetworkStream stream = client.GetStream();
            byte[] buffer = new byte[1024];
            int bytesRead;

            try
            {
                while ((bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length)) != 0)
                {
                    string receivedData = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                    Console.WriteLine($"Received from client: {receivedData}");

                    // Echo back the received data
                    byte[] responseData = Encoding.UTF8.GetBytes($"Server received: {receivedData}");
                    await stream.WriteAsync(responseData, 0, responseData.Length);
                    Console.WriteLine($"Sent to client: Server received: {receivedData}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error handling client: {ex.Message}");
            }
            finally
            {
                Console.WriteLine("Client disconnected.");
            }
        }
    }
}