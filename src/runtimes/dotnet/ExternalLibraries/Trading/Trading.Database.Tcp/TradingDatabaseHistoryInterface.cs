using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Newtonsoft.Json;
using TCPLibrary.Interfaces;
using Trading.Database.Classes;
using Trading.Database.Interfaces;
using Trading.Library.Classes;

namespace Trading.Database.Tcp
{
    public class TradingDatabaseHistoryInterface : IByteTransformation
    {
        ITradingDatabaseHistoryInterface Interface;

        AsyncTcpServer server;

        CancellationToken cancellationToken;

        int port;


        public TradingDatabaseHistoryInterface(ITradingDatabaseHistoryInterface Interface, int port)
        {
            this.Interface = Interface;
            this.port = port;
            server = new AsyncTcpServer(port, this);
        }


        #region  IByteTransformation

        class Data
        {
            public string id;

            public double begin;

            public double end;
        }


        async Task<byte[]> IByteTransformation.Transform(byte[] data, int length)
        {
            try
            {
                byte[] bt = null;
                string output = null;
                string str = Encoding.ASCII.GetString(data, 0, length);
                var reader = new StringReader(str);
                JsonReader jsonReader = new JsonTextReader(reader);
                var js = Newtonsoft.Json.JsonSerializer.CreateDefault();
                var ob = js.Deserialize(jsonReader) as Newtonsoft.Json.Linq.JObject;
                if (ob.ContainsKey("id"))
                {
                    var t = ob.Value<string>("id");
                    var id = new Guid(t);
                    var b = ob.Value<double>("begin");
                    var e = ob.Value<double>("end");
                    var begin = DateTime.FromOADate(b);
                    var end = DateTime.FromOADate(e);
                    var res = await Interface.GetHistoricalDataMessageDateTimesAsync(id, begin, end, new CancellationToken());
                    var l = from tt in res select new HistoricalDataMessageDateTimeDouble(tt);
                    var rr = JsonConvert.SerializeObject(l.ToList());
                    bt = Encoding.ASCII.GetBytes(rr);
                    return bt;
                }
            }
            catch (Exception ex)
            {

            }
     /*       //       
            //Data? ob = Newtonsoft.Json.JsonSerializer.(jsonReader);
     /     //  Data?ob = System.Text.Json.JsonSerializer.Deserialize(s);
            switch (s)
            {
                case "\"Symbols\"":
                    cancellationToken = new CancellationToken();
                    var a = await Interface.GetSymbolsAsync(cancellationToken);
                    output = JsonConvert.SerializeObject(a);
                    break;
                default:
                    break;
            }
            if (output != null)
            {
                return Encoding.ASCII.GetBytes(output);
            }*/
            return new byte[0];
        }

        #endregion

        public async Task StarAsync()
        {
           await  server.StartServerAsync();
        }
    }
}
