using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Security;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

public class ClientWithCertificate
{
    public  async Task ConnectAndCommunicate(string host, int port, string certificateThumbprint)
    {
        try
        {
            using TcpClient client = new TcpClient(host, port);
            using SslStream sslStream = new SslStream(client.GetStream(), true);
            X509Certificate2 clientCertificate = FindCertificateByThumbprint(certificateThumbprint);
            if (clientCertificate == null)
            {
                Console.WriteLine($"Error'{certificateThumbprint}' not found.");
                return;
            }

            var clientCertificates = new X509CertificateCollection { clientCertificate };

            // Аутентификация клиента. Сервер запрашивает сертификат клиента.
            await sslStream.AuthenticateAsClientAsync(
                host,
                clientCertificates,
                SslProtocols.Tls12,
                true
            );

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

    // Функция для поиска сертификата по отпечатку (Thumbprint)
    private  X509Certificate2 FindCertificateByThumbprint(string thumbprint)
    {
        using (var store = new X509Store(StoreName.My, StoreLocation.LocalMachine)) // Или StoreLocation.LocalMachine
        {
            store.Open(OpenFlags.ReadOnly);
            X509Certificate2Collection certificates = store.Certificates.Find(X509FindType.FindByThumbprint, thumbprint, false);
            if (certificates.Count > 0)
            {
                return certificates[0];
            }
        }
        return null;
    }
/*
    public static async Task Main(string[] args)
    {
       string serverHost = "your_server_hostname"; // Замените на реальное имя хоста сервера
        int serverPort = 5001; // Замените на реальный порт сервера
        string clientCertificateThumbprint = "YOUR_CERTIFICATE_THUMBPRINT"; // Замените на отпечаток вашего сертификата

       await ConnectAndCommunicate(serverHost, serverPort, clientCertificateThumbprint);
    }*/
}