package trading.database.classes;

import cancellation.interfaces.ICancellation;
import cancellation.interfaces.ICancelledObject;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.internal.LinkedTreeMap;
import com.google.gson.reflect.TypeToken;
import communication.AsyncTcpClient;
import communication.interfaces.IByteReceiver;
import general_service.Performer;
import trading.database.interfaces.ITradingDatabaseHistoryInterface;

import java.lang.reflect.Array;
import java.util.*;
import java.util.concurrent.CompletableFuture;




public class TcpTradingDatabaseHistoryInterface implements ITradingDatabaseHistoryInterface, IByteReceiver, ICancelledObject
{

    Performer performer = new Performer();

    int port;

    String host;

    ICancellation cancellation;


    AsyncTcpClient client;

    Map<String, Object> map = new HashMap<>();


    public  TcpTradingDatabaseHistoryInterface(String host, int port)
    {
        this.host = host;


        this.port = port;
    }

    Gson getGson()
    {
        Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .create();
        return  gson;
    }

    @Override
    public CompletableFuture<Map<String, Object>> getSymbolsAsync(ICancellation cancellation) {
        return CompletableFuture.supplyAsync(() ->
        {
           set(cancellation);
            try
            {
                client = new AsyncTcpClient(host, port, this);
                var gson = getGson();
                String sym = gson.toJson("Symbols");
                var bt = sym.getBytes();
                client.start(bt);
            }
            catch (Throwable e)
            {
            int i = 0;
            }
            return map;
        });
    }


    void set(ICancellation cancellation)
    {
        if (this.cancellation != null)
        {
            cancellation.removeCancelledObject(this);
        }
        cancellation.addCancelledObject(this);
        this.cancellation = cancellation;
    }

    @Override
    public CompletableFuture<HistoricalDataMessageDateTime[]> getHistoricalDataMessageDateTimesAsync(Object id, double begin, double end, ICancellation cancellation) {
        var data = new Data();
        data.id = id.toString();
        data.begin = begin;
        data.end = end;
        return CompletableFuture.supplyAsync(() ->
        {
            set(cancellation);
            try
            {
                client = new AsyncTcpClient(host, port, this);
               // var d =
                var gson = getGson();
                var sym = gson.toJson(data);
                var bt = sym.getBytes();
                client.start(bt);
            }
            catch (Throwable e)
            {
                int i = 0;
            }
            return null;
        });

    }

    @Override
    public void receiveBytes(byte[] bytes, int length) {
        String s = new String(bytes);
      //   JsonObject jsonObject = JsonParser.parseString(s).getAsJsonObject();
        Gson gson = getGson();
        var o =  gson.fromJson(s, new TypeToken<Object>(){}.getType());
    //    var ob =  (Map<String, Object>)gson.fromJson(s, new TypeToken<Map<String, Object>>(){}.getType());
   //     performer.copyMap(ob, map);
        if (o instanceof ArrayList<?>)
        {
            var list = (ArrayList<?>)o;
            for (var x : list)
            {
var i = 0;
            }
        }

    }
    void change(ICancellation cancellation)
    {
    }

    @Override
    public CompletableFuture<Void>  cancelObject() {
        return null;
    }

    class Data
    {
        public  String id;

        public  double begin;

        public  double end;
    }
}
