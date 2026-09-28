
using System.Data;
using System.Windows.Input;

namespace DataWarehouse.SQLServer.EntityFramework;

public class QueriesTableAdapter : DataSetTableAdapters.QueriesTableAdapter, ICommandCollection
{
    IDbCommand[] ICommandCollection.CommandCollection => CommandCollection;
}
