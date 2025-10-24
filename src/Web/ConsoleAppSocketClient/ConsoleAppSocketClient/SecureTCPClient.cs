using System;
using System.Linq.Expressions;
using System.Net;
using System.Net.Security;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppSocketClient
{


    public class SecureTcpClient
    {
        private readonly string _serverHost;
        private readonly int _serverPort;
        private TcpClient _tcpClient;
        private SslStream _sslStream;
        X509Certificate certificate;
        public SecureTcpClient(string serverHost, int serverPort, string certificateThumbprint)
        {
            _serverHost = serverHost;
            _serverPort = serverPort;
            certificate = FindCertificateByThumbprint(certificateThumbprint);
        }

        private X509Certificate2 FindCertificateByThumbprint(string thumbprint)
        {
            StoreName[] names = [ StoreName.TrustedPeople,
            StoreName.Root, StoreName.AuthRoot,
                StoreName.CertificateAuthority,
            StoreName.TrustedPublisher, StoreName.AddressBook,
            StoreName.My];
            StoreLocation[] locations = [StoreLocation.LocalMachine, StoreLocation.CurrentUser];
            foreach (StoreLocation location in locations)
            {
                foreach (StoreName name in names)
                {


                    using var store = new X509Store(name, location);// Или StoreLocation.LocalMachine
                    store.Open(OpenFlags.ReadOnly);
                    X509Certificate2Collection certificates = store.Certificates.Find(X509FindType.FindByThumbprint, thumbprint, false);
                    if (certificates.Count > 0)
                    {
                        return certificates[0];
                    }
                }
            }
            return null;
        }


        public async Task ConnectAsync()
        {
            _tcpClient = new TcpClient();
            try
            {
                await _tcpClient.ConnectAsync(_serverHost, _serverPort);
                Console.WriteLine($"Connected to {_serverHost}:{_serverPort}");
               //_sslStream =  new SslStream(_tcpClient.GetStream(), true);
                // Create an SslStream to wrap the network stream
               _sslStream = new SslStream(
                    _tcpClient.GetStream(),
                    false, // LeaveInnerStreamOpen: false means the stream will be closed when SslStream is disposed
                    ValidateServerCertificate, // Callback for server certificate validation
                    ValidateClientCertificate // RemoteCertificateValidationCallback for client cert validation (if needed)
                );

                var clientCertificates = new X509CertificateCollection { certificate };

                // Authenticate as a client
                // targetHost is the hostname you expect in the server's certificate
             //  await _sslStream.AuthenticateAsClientAsync(_serverHost);
               await _sslStream.AuthenticateAsClientAsync(
                _serverHost,
                clientCertificates,
                SslProtocols.None,
                true
            );
                Console.WriteLine("SSL/TLS handshake successful.");
                Console.WriteLine($"Cipher: {_sslStream.CipherAlgorithm}");
                Console.WriteLine($"Hash: {_sslStream.HashAlgorithm}");
                Console.WriteLine($"Key Exchange: {_sslStream.KeyExchangeAlgorithm}");
                Console.WriteLine($"Is authenticated: {_sslStream.IsAuthenticated}");
                Console.WriteLine($"Is signed: {_sslStream.IsSigned}");
                Console.WriteLine($"Is mutually authenticated: {_sslStream.IsMutuallyAuthenticated}");

                // Now you can send and receive data securely
            }
            catch (AuthenticationException authEx)
            {
                Console.WriteLine($"Authentication Error: {authEx.Message}");
                // This is where "UntrustedRoot" would typically be caught if validation fails
                if (authEx.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {authEx.InnerException.Message}");
                }
                Disconnect(); // Ensure cleanup if authentication fails
                throw;
            }
            catch (SocketException socketEx)
            {
                Console.WriteLine($"Socket Error: {socketEx.Message}");
                Disconnect();
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
                Disconnect();
                throw;
            }
        }


        private X509Certificate ValidateClientCertificate(object sender, string targetHost, X509CertificateCollection localCertificates, X509Certificate? remoteCertificate, string[] acceptableIssuers)
        {
            return certificate;
        }


        // Callback delegate for server certificate validation
        private bool ValidateServerCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            Console.WriteLine("Validating server certificate...");

            // Handle the SSL Policy Errors
            if (sslPolicyErrors == SslPolicyErrors.None)
            {
                Console.WriteLine("Server certificate is valid.");
                return true; // Certificate is trusted
            }

            // Log any errors
            Console.WriteLine($"SSL Policy Errors: {sslPolicyErrors}");
            foreach (X509ChainElement element in chain.ChainElements)
            {
                Console.WriteLine($"  - Subject: {element.Certificate.Subject}");
                Console.WriteLine($"    Issuer: {element.Certificate.Issuer}");
                // Check status for each certificate in the chain
                foreach (X509ChainStatus status in element.ChainElementStatus)
                {
                    Console.WriteLine($"    Status: {status.StatusInformation} ({status.Status})");
                }
            }


            /*     if (sslPolicyErrors.HasFlag(SslPolicyErrors..RemoteCertChainErrors))
                 {
                     Console.WriteLine("Certificate chain errors encountered:");
                     foreach (X509ChainElement element in chain.ChainElements)
                     {
                         Console.WriteLine($"  - Subject: {element.Certificate.Subject}");
                         Console.WriteLine($"    Issuer: {element.Certificate.Issuer}");
                         // Check status for each certificate in the chain
                         foreach (X509ChainStatus status in element.ChainStatus)
                         {
                             Console.WriteLine($"    Status: {status.StatusInformation} ({status.Status})");
                         }
                     }
                 }
     */
            // Example: If you encounter "UntrustedRoot", you might see an error in ChainStatus
            // You *could* choose to accept a specific untrusted certificate here,
            // but it's generally a bad security practice for production.
            // For demonstration purposes, we'll fail validation if there are any errors.
            return false;
        }

        public async Task SendMessageAsync(string message)
        {
            if (_sslStream == null || !_sslStream.CanWrite)
            {
                Console.WriteLine("SSL stream is not available or not writable.");
                return;
            }

            byte[] data = Encoding.UTF8.GetBytes(message);
            await _sslStream.WriteAsync(data, 0, data.Length);
            await _sslStream.FlushAsync();
            Console.WriteLine($"Sent: {message}");
        }

        public async Task<string> ReceiveMessageAsync()
        {
            if (_sslStream == null || !_sslStream.CanRead)
            {
                Console.WriteLine("SSL stream is not available or not readable.");
                return null;
            }

            byte[] buffer = new byte[1024];
            int bytesRead = await _sslStream.ReadAsync(buffer, 0, buffer.Length);
            if (bytesRead == 0)
            {
                Console.WriteLine("Connection closed by remote host.");
                return null;
            }

            string receivedMessage = Encoding.UTF8.GetString(buffer, 0, bytesRead);
            Console.WriteLine($"Received: {receivedMessage}");
            return receivedMessage;
        }

        public void Disconnect()
        {
            if (_sslStream != null)
            {
                try
                {
                    _sslStream.Close();
                    _sslStream.Dispose();
                    _sslStream = null;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error closing SSL stream: {ex.Message}");
                }
            }

            if (_tcpClient != null)
            {
                try
                {
                    _tcpClient.Close();
                    _tcpClient = null;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error closing TCP client: {ex.Message}");
                }
            }
            Console.WriteLine("Disconnected.");
        }

        // Example Usage
        public static async Task Run(string cert)
        {
            // IMPORTANT: Replace with your actual server hostname and port
            string serverHostname = "localhost"; // e.g., "localhost" if running locally
            serverHostname = "31.10.82.229"; // e.g., "localhost" if running locally
            int serverPort = 80; // e.g., 443 for HTTPS

            // IMPORTANT: For testing against a server with a self-signed certificate
            // or one with certificate issues, you *might* need to override the
            // default validation. This is UNSAFE for production.
            // You can do this by creating a custom validation callback that
            // bypasses some checks. For demonstration, we'll stick to default.

            var client = new SecureTcpClient(serverHostname, serverPort, cert);

            try
            {
                await client.ConnectAsync();

                // Send a message
                await client.SendMessageAsync("Hello, secure server!");

                // Receive a response
                string response = await client.ReceiveMessageAsync();
                if (response != null)
                {
                    Console.WriteLine($"Final response: {response}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred in Main: {ex.Message}");
            }
            finally
            {
                client.Disconnect();
            }
        }
    }
}
