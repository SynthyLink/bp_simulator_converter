

using System.ComponentModel;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Xml.Linq;
using static System.Net.Mime.MediaTypeNames;
/*
SimpleTcpServer server = new SimpleTcpServer(6666); // Use port 8888
await server.Start();

Console.ReadKey();
*/

/*
openssl req -x509 -out localhost.crt -keyout localhost.key 
  -newkey rsa:2048 - nodes - sha256 
  -subj '/CN=localhost' - extensions EXT - config < ( 
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
*/

string certificatePath = "android.pfx";
string certificatePassword = "J0hnksM0nster";


int port = 6666; // Or any other port

var s = AppDomain.CurrentDomain.BaseDirectory;
certificatePath = Path.Combine(s, certificatePath);

//TestSert(certificatePath, certificatePassword);

if (!File.Exists(certificatePath))
{
    Console.WriteLine($"Error: Certificate file not found at '{certificatePath}'.");
    Console.WriteLine("Please ensure you have a server certificate and provide the correct path and password.");
    return;
}

var  serv = new SecureTcpServer(port, certificatePath, certificatePassword);
await serv.StartAsync();

Console.ReadKey(true);
int i = 0;

/*
 # Run PowerShell as Administrator
New-SelfSignedCertificate -DnsName "localhost" -CertStoreLocation "cert:\LocalMachine\My" -FriendlyName "Android"
# Export the certificate with its private key (you'll need to create a password)
$cert = Get-ChildItem -Path "Cert:\LocalMachine\My\" | Where-Object {$_.FriendlyName -eq "Android"}
Export-PfxCertificate -Cert $cert -FilePath "C:\temp\android.pfx" -Password (ConvertTo-SecureString "J0hnksM0nster" -AsPlainText -Force)
*/

/*

Thumbprint                                Subject
----------                                -------
DC7D5484CE722B3B381E4BB693A5DB244676A34D  CN=localhost
*/

void TestSert(string path, string passs)
{
    try
    {
        // Replace with your actual path and password
        X509Certificate2 cert = new X509Certificate2(path, passs);
        Console.WriteLine($"Successfully loaded certificate: {cert.Subject}");
        // Try accessing the private key
        if (cert.HasPrivateKey)
        {
            Console.WriteLine("Certificate has a private key.");
        }
        else
        {
            Console.WriteLine("Certificate does NOT have a private key."); // This is a problem
        }
    }
   /* catch (CryptographicException ex)
    {
        Console.WriteLine($"Cryptographic error loading certificate: {ex.Message}");
        // This is a strong indicator of password or private key issues.
    }*/
    catch (Exception ex)
    {
        Console.WriteLine($"General error loading certificate: {ex.Message}");
    }
}