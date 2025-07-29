using MySql.Data.MySqlClient;

namespace DataWarehouse.MySQL.EntityFramework
{

    public static class StaticExtensionDataWarehouseMySQLEntityFramework
    {

        public static bool Connect(string connectionString)
        {
            //   string connectionString = "Server=localhost;Database=yourdatabase;Uid=yourusername;Pwd=yourpassword;";

            try
            {
                using var connection = new MySqlConnection(connectionString);
                connection.Open();
                return true;
            }
            catch (Exception ex)
            {
            }
            return false;
        }
    }
}