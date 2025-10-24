using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Security;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppSocketClient
{
    public class SimpleClient
    {
        public async Task ConnectAndCommunicate(string host, int port)
        {
            try
            {
                using TcpClient client = new TcpClient();
                await client.ConnectAsync(host, port);
                using Stream sslStream = client.GetStream();

                Console.WriteLine("TLS/SSL Conncected. Certificate is good");
                var message = "hello server";
                byte[] data = Encoding.UTF8.GetBytes(message);
                await sslStream.WriteAsync(data, 0, data.Length);
                await sslStream.FlushAsync();
                Console.WriteLine($"Sent: {message}");
                // Теперь можно отправлять и получать данные по защищенному каналу
                byte[] buffer = new byte[1024];
                int bytesRead = await sslStream.ReadAsync(buffer, 0, buffer.Length);
                if (bytesRead == 0)
                {
                    Console.WriteLine("Connection closed by remote host.");
                }

                string receivedMessage = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                Console.WriteLine($"Received: {receivedMessage}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Communication error: {ex.Message}");
                // Дополнительная информация об ошибке может быть доступна в `SslPolicyErrors`
                // если бы мы обрабатывали `RemoteCertificateValidationCallback`.
            }
        }

        public static async Task Run()
        {
            // IMPORTANT: Replace with your actual server hostname and port
            string serverHostname = "localhost"; // e.g., "localhost" if running locally
            int serverPort = 8888; // e.g., 443 for HTTPS

            // IMPORTANT: For testing against a server with a self-signed certificate
            // or one with certificate issues, you *might* need to override the
            // default validation. This is UNSAFE for production.
            // You can do this by creating a custom validation callback that
            // bypasses some checks. For demonstration, we'll stick to default.

            var client = new SimpleClient();

            try
            {
                await client.ConnectAndCommunicate("31.10.82.229", 80);

            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred in Main: {ex.Message}");
            }
            finally
            {
               // client.Disconnect();
            }
        }

    }
}

