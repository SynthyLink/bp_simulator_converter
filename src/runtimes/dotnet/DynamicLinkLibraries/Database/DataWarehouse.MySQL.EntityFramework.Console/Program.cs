// See https://aka.ms/new-console-template for more information

using DataWarehouse.MySQL.EntityFramework;

var connectionString = "Server=localhost;Database=mysqlwarehouse;Uid=root;Pwd=SQj0Myhnks!12;";

Console.WriteLine(connectionString);

var b = StaticExtensionDataWarehouseMySQLEntityFramework.Connect(connectionString);

Console.WriteLine(connectionString);