using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.SqlServer.Extension

{
    partial class SqlConnection
    {

        System.Data.SqlClient.SqlConnection connection;

        async Task FillAsync<T>(System.Data.DataTable t, CancellationToken cancellationToken)  where T : System.Data.DataRow 
        {
           if (t is  System.Data.TypedTableBase<T> s)
            {
                }
            await Task.Delay(1);
        }
    }
}
