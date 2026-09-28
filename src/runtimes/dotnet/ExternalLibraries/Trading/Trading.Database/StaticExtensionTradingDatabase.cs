
using System.Reflection;

using Trading.Database.Interfaces;

using Database.UI.Intrerfaces;

namespace Trading.Database
{
    public static class StaticExtensionTradingDatabase
    {
        static List<string> strings = new List<string>();

        static List<ITradingDatabaseHistoryIntefaceFactory> list = new();

        static public IConnectionStringEditor @interface
        {
            get;
            set;
        } = new Empty();

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

        static event Action<string, bool> onSuccess;


        public static event Action<string, bool> OnSuccess
        {
            add
            {
                onSuccess += value;
            }
            remove
            {
                onSuccess -= value;
            }
        }

        static public ITradingDatabaseHistoryInterface Connect()
        {
            while (true)
            {
                var conn = Trading.Create(ConnectionString);
                if (conn != null)
                {
                    onSuccess?.Invoke(ConnectionString, true);
                    @interface.Close();
                    return conn;
                }
                onSuccess?.Invoke(ConnectionString, false);
                if (@interface == null)
                {
                    return null;
                }
                ConnectionString = @interface.ConnectionStrig(ConnectionString);

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
                strings.Add(d);
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

        class Empty : IConnectionStringEditor
        {
            void IConnectionStringEditor.Close()
            {
            }

            string IConnectionStringEditor.ConnectionStrig(string connectionString)
            {
                return connectionString;
            }
        }
    }
}