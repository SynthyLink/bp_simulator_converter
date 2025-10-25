

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
/*   31.10.82.229
openssl req -x509 -out localhost.crt -keyout localhost.key 
  -newkey rsa:2048 - nodes - sha256 
  -subj '/CN=localhost' - extensions EXT - config < ( 
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
*/

string certificatePath = @"c:\temp\androids.pfx";
string certificatePassword = "J0hnksM0nster";


int port = 6666; // Or any other port

//var s = AppDomain.CurrentDomain.BaseDirectory;
//certificatePath = Path.Combine(s, certificatePath);

//TestSert(certificatePath, certificatePassword);

if (!File.Exists(certificatePath))
{
    Console.WriteLine($"Error: Certificate file not found at '{certificatePath}'.");
    Console.WriteLine("Please ensure you have a server certificate and provide the correct path and password.");
    return;
}

var serv = new SecureTcpServer(port, certificatePath, certificatePassword);
//await serv.StartAsync();
var s = new SimpleTcpServer(port);
await s.StartAsync();

Console.ReadKey(true);
int i = 0;

/*
 # Run PowerShell as Administrator
New-SelfSignedCertificate -DnsName "localhost" -CertStoreLocation "cert:\LocalMachine\My" -FriendlyName "AndroidS"
$cert = Get-ChildItem -Path "Cert:\LocalMachine\My\" | Where-Object {$_.FriendlyName -eq "AndroidS"}
Export-PfxCertificate -Cert $cert -FilePath "C:\temp\androids.pfx" -Password (ConvertTo-SecureString "J0hnksM0nster" -AsPlainText -Force)
*/
/*
KeyPass  KEY STORE
PS C:\WINDOWS\system32> New-SelfSignedCertificate -DnsName "localhost" -CertStoreLocation "cert:\LocalMachine\My" -FriendlyName "AndroidS"


   PSParentPath: Microsoft.PowerShell.Security\Certificate::LocalMachine\My

PS C:\WINDOWS\system32> New-SelfSignedCertificate -DnsName "localhost" -CertStoreLocation "cert:\LocalMachine\My" -FriendlyName "AndroidS"


   PSParentPath: Microsoft.PowerShell.Security\Certificate::LocalMachine\My

Thumbprint                                Subject
----------                                -------
064187392FE5234197107576517491CEA7E920CB  CN=localhost




    Directory: C:\temp


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        10/21/2025  12:53 PM           2669 androids.pfx


PS C:\WINDOWS\system32>






PS C:\WINDOWS\system32> $cert = Get-ChildItem -Path "Cert:\LocalMachine\My\" | Where-Object {$_.FriendlyName -eq "AndroidS"}
PS C:\WINDOWS\system32>
PS C:\WINDOWS\system32> Export-PfxCertificate -Cert $cert -FilePath "C:\temp\androids.pfx" -Password (ConvertTo-SecureString "J0hnksM0nster" -AsPlainText -Force)

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