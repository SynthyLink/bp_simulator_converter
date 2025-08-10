// See https://aka.ms/new-console-template for more information
using DataWarehouse.Classes;
using DataWarehouse.Interfaces;
using DataWarehouse.Interfaces.Async;
using PostgreSQLWarehouse.Models;
using System.Threading.Tasks;
//var t = CopyToFile();
//await t;

return;

PostgreSQLConsoleApp.A.TestA();

//var k = Test3();

/*
 DELETE FROM public."BinaryTree"
 WHERE "Id" <> "ParentId";
*/
return;

async Task CopyToFile()
{
    try
    {

        var c = new DatabaseCoordinatorCollection(false);
        c.LoadDirectory();

        IDatabaseCoordinator coord = c;
        

        var to = coord["Host=127.0.0.1;Database=PostgreSQL_Warehouse;Username=postgres;Password=GREM0nP0"];
        if (to is IDatabaseInterfaceAsync async)
        {

            var rt = async.GetRoots([".cfa"]);
            await rt;
            var dr = rt.Result[0] as IDirectory;
            var dir = new DirectoryInfo(@"c:\0\dir");
            var tasks = new List<Task>();
            var p = new DataWarehouse.Performer();
            var t = p.Copy(dr, dir, tasks);
            tasks.Add(t);
            await t;
            Task.WaitAll(tasks);
        }


    }
    catch (Exception ex)
    {

    }

    //  IDatabaseCoordinator coord = c;

}

var c = new DatabaseCoordinatorCollection(false);

IDatabaseCoordinator coord = c;

c.LoadDirectory();

var from = coord[@"Data Source=IVANKOV\SQLEXPRESS;Initial Catalog=AstronomyExpress;Integrated Security=True;Encrypt=False"];
var to = coord["Host=127.0.0.1;Database=PostgreSQL_Warehouse;Username=postgres;Password=GREM0nP0"];
//var to = coord["Dsn=MySQL"];
var p = new DataWarehouse.Performer();

p.Copy(from, to);



int Test3()
{
 var cs = "Server=localhost;User ID=root;Password=SQj0Myhnks!12;Database=mysqlwarehouse";
 using var conn = new MySqlConnector.MySqlConnection(cs);
 conn.Open();
 using var command = conn.CreateCommand();
 command.CommandType = System.Data.CommandType.StoredProcedure;
 //command.CommandText = "fiction";
 command.CommandText = $"`mysqlwarehouse`.`fiction`";
 var ll = command.ExecuteNonQuery();
 return ll;
}




async Task<int> Test1()
{
 var cs = "Server=localhost;User ID=root;Password=SQj0Myhnks!12;Database=mysqlwarehouse";
 using var conn = new MySqlConnector.MySqlConnection(cs);
 conn.Open();
 using var command = conn.CreateCommand();
 command.CommandType = System.Data.CommandType.StoredProcedure;
 //command.CommandText = "fiction";
 command.CommandText = $"`mysqlwarehouse`.`fiction`";
 var ll = command.ExecuteNonQueryAsync();
 await ll;
 return ll.Result;
}


void Test2()
{

 var adapter = new PostgreSqlWarehouseContext();

 var tables = adapter.BinaryTrees.ToArray();

 int i = 0;
}

void Test()
{

 var adapter = new PostgreSqlWarehouseContext();

 var tables = adapter.BinaryTrees.ToArray();

 int i = 0;
}
