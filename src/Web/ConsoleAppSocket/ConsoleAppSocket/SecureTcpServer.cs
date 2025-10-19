using System;
using System.Net;
using System.Net.Sockets;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.IO;

public class SecureTcpServer
{
    private readonly int _port;
    private readonly string _certificatePath;
    private readonly string _certificatePassword;
    private X509Certificate2 _serverCertificate;

    public SecureTcpServer(int port, string certificatePath, string certificatePassword)
    {
        _port = port;
        _certificatePath = certificatePath;
        _certificatePassword = certificatePassword;
    }

    public async Task StartAsync()
    {
        try
        {
            // Load the server certificate
            _serverCertificate = new X509Certificate2(_certificatePath, _certificatePassword);
            Console.WriteLine($"Server certificate loaded: {_serverCertificate.Subject}");

            // Create a TCP listener
            TcpListener listener = new TcpListener(IPAddress.Any, _port);
            listener.Start();
            Console.WriteLine($"Server listening on port {_port}...");

            while (true)
            {
                // Accept an incoming client connection
                TcpClient client = await listener.AcceptTcpClientAsync();
                Console.WriteLine($"Client connected from {client.Client.RemoteEndPoint}");

                // Handle the client connection asynchronously
                _ = HandleClientAsync(client); // Fire and forget for simplicity
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Server error: {ex.Message}");
        }
    }

    private async Task HandleClientAsync(TcpClient tcpClient)
    {
        SslStream sslStream = null;
        try
        {
            // Get the network stream
            NetworkStream networkStream = tcpClient.GetStream();

            // Create an SslStream to wrap the network stream
            // We are authenticating as the server
            sslStream = new SslStream(networkStream, false); // 'false' means we don't own the inner stream

            // Authenticate the server
            // The LocalCertificateValidationCallback is for *client* certificates,
            // and RemoteCertificateValidationCallback is for *server* certificates from the client's perspective.
            // For basic server authentication, we only need to provide our certificate.
            await sslStream.AuthenticateAsServerAsync(_serverCertificate,
                                                     clientCertificateRequired: true, // Set to true if you need client authentication
                                                     enabledSslProtocols:
                                                     System.Security.Authentication.SslProtocols.Tls12,
                                                     checkCertificateRevocation: true);

            Console.WriteLine("Client authenticated.");

            // Now you can read and write data over the encrypted sslStream
            using StreamReader reader = new StreamReader(sslStream, Encoding.UTF8, leaveOpen: true);
            using StreamWriter writer = new StreamWriter(sslStream, Encoding.UTF8, leaveOpen: true);
            //     { AutoFlush = true };
             byte[] buffer = new byte[1024];
              var k = await sslStream.ReadAsync(buffer, 0, buffer.Length);
            // Example: Read a message from the client*/          string receivedMessage = Encoding.UTF8.GetString(buffer, 0, bytesRead);
            string message = Encoding.UTF8.GetString(buffer, 0, k);
            Console.WriteLine($"Received from client: {message}");
            byte[] data = Encoding.UTF8.GetBytes($"Server received: {message}");
            await sslStream.WriteAsync(data, 0, data.Length);
            await sslStream.FlushAsync();

   
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Client handling error: {ex.Message}");
        }
        finally
        {
            // Clean up resources
            sslStream?.Dispose();
            tcpClient?.Close();
            Console.WriteLine($"Client disconnected.");
        }
    }

    public static async Task Main(string[] args)
    {
        // !!! IMPORTANT !!!
        // Replace with the actual path to your .pfx certificate file
        // and its password.
    }
}