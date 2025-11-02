// See https://aka.ms/new-console-template for more information

var server = new AsyncTcpServer(7168);

server.StartServerAsync();

Console.ReadKey();
