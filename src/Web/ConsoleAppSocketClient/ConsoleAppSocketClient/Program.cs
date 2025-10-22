// See https://aka.ms/new-console-template for more information

using ConsoleAppSocketClient;

var client = new ClientWithCertificate();

/*
 		s	"AAA3A878DEF2A37B3BC9708114D1468E546C0AFB"	string
		sr	"AA:A3:A8:78:DE:F2:A3:7B:3B:C9:708114D1468E546C0AFB"	string
*/

string serverHost = "localhost"; // Замените на реальное имя хоста сервера
int serverPort = 6666; // Замените на реальный порт сервера
string clientCertificateThumbprint = "AA:A3:A8:78:DE:F2:A3:7B:3B:C9:708114D1468E546C0AFB"; // Замените на отпечаток вашего сертификата
clientCertificateThumbprint = "AAA3A878DEF2A37B3BC9708114D1468E546C0AFB"; // Замените на отпечаток вашего сертификата
clientCertificateThumbprint = "DC7D5484CE722B3B381E4BB693A5DB244676A34D"; // Замените на отпечаток вашего сертификата
clientCertificateThumbprint = "EA6C246A4060B17DB906A659BB1C532A510E5751"; // Замените на отпечаток вашего сертификата
clientCertificateThumbprint = "064187392FE5234197107576517491CEA7E920CB"; // Замените на отпечаток вашего сертификата

//SecureTcpClientSecureTcpClient
//ci.GetCertificateThumbprint(clientCertificateThumbprint);

//await client.ConnectAndCommunicate(serverHost, serverPort, clientCertificateThumbprint);

//await SecureTcpClient.Run(clientCertificateThumbprint);
await SimpleClient.Run();

Console.ReadKey();