
using System.Reflection;

using Trading.Database.Interfaces;

namespace Trading.Database
{
    public static class StaticExtensionTradingDatabase
    {
        static List<string> strings = new List<string>();

        static List<ITradingDatabaseHistoryIntefaceFactory> list = new();

        static public IUserInterface @interface { get; set; }

        static public ITradingDatabaseHistoryIntefaceFactory Trading
        {
            get;
            private set;
        }

        public static string ConnectionString
        {
            get;
            set;
        } = string.Empty;

        public static Func<string, object, string> GetConnectionSring
        {
            get;
            set;
        }

        static public ITradingDatabaseHistoryInteface Connect()
        {
            while (true)
            {
                var conn = Trading.Create(ConnectionString);
                if (conn != null)
                {
                    @interface.Close();
                    return conn;
                }
                if (@interface == null)
                {
                    return null;
                }
                ConnectionString = @interface.Connect(ConnectionString);

            }
            return null;
        }

        static StaticExtensionTradingDatabase()
        {
            LoadBaseAssemblies();
            Trading = new TradingDatabaseHistoryIntefaceFactoryCollection(list);
        }

        /// Loads assemblies from base directory
        /// </summary>
        /// <param name="exceptionHandler">Exception handler</param>
        private static void LoadBaseAssemblies()
        {
            Assembly[] ass = AppDomain.CurrentDomain.GetAssemblies(); // Current domain assemblies
            foreach (var a in ass)
            {
                Load(a);
            }
            var dir = AppDomain.CurrentDomain.BaseDirectory;
            string[] fn = Directory.GetFiles(dir, "*.dll");   // Dll files
            foreach (var file in fn)
            {
                if (strings.Contains(file))
                {
                    continue;
                }
                try
                {
                    var assembly = Assembly.LoadFrom(file);
                    Load(assembly);
                }
                catch
                {

                }
            }
        }

        static void Load(Assembly assembly)
        {
            try
            {
                var d = assembly.Location;
                if (strings.Contains(d))
                {
                    return;
                }
            }
            catch
            {
                return;
            }
            Type[] types = null;
            try
            {
                types = assembly.GetTypes();
            }
            catch
            {
                return;
            }
            foreach (var type in types)
            {
                var tt = new List<Type>(type.GetInterfaces());
                if (tt.Contains(typeof(ITradingDatabaseHistoryIntefaceFactory)))
                {
                    var ci = type.GetConstructor([]);
                    if (ci != null)
                    {
                        var f = ci.Invoke([]) as ITradingDatabaseHistoryIntefaceFactory;
                        list.Add(f);
                    }
                }
            }

        }
    }
}