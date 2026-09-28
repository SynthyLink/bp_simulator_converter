using System.Net;
using System.Net.Sockets;

using ErrorHandler;

using TCPLibrary.Interfaces;

public class AsyncTcpServer
{
    private readonly IPAddress _ipAddress = IPAddress.Any; // Listen on all available interfaces
    private int _port = 13000;
    private TcpListener? _listener;
    private bool _isRunning = false;
    IByteTransformation tansformation = null;

    public AsyncTcpServer(int port, IByteTransformation tansformation)
    {
        this.tansformation = tansformation;
        _port = port; 
    }

    public async Task StartServerAsync()
    {
        try
        {
            // 1. Set up the listener
            _listener = new TcpListener(_ipAddress, _port);
            _listener.Start();
            _isRunning = true;
            $"Server started. Listening on port {_port}...".Log();

            // 2. Main Acceptance Loop
            while (_isRunning)
            {
                // AcceptTcpClientAsync waits non-blockingly for a connection
                TcpClient client = await _listener.AcceptTcpClientAsync();
                "Client Connected!".Log();

                // 3. Handle the connection in a separate task
                // This prevents the main loop from blocking while communicating with this client
                _ = HandleClientAsync(client);
            }
        }
        catch (SocketException ex)
        {
            $"Socket Error: {ex.Message}".Log();
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
                    var transformed = await tansformation.Transform(buffer, bytesRead);
                    if (transformed.Length > 1019)
                    {
                        byte[] intBytes = BitConverter.GetBytes(transformed.Length);
                        var tr = new byte[transformed.Length + 4];
                        Array.Copy(intBytes, 0, tr, 0, 4);
                        Array.Copy(transformed, 0, tr, 4, transformed.Length);
                        transformed = tr;
                    }
                    await stream.WriteAsync(transformed, 0, transformed.Length);
                }
            }
            catch (Exception ex)
            {
                $"Error handling client: {ex.Message}".Log();
            }
            finally
            {
                client.Close();
                "Client disconnected.".Log();
            }
        }
    }

    public void StopServer()
    {
        _isRunning = false;
        _listener?.Stop();
       "Server stopped.".Log();
    }
}

