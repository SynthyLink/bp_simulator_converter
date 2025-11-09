package trading.database.classes;

import cancellation.interfaces.ICancellation;
import cancellation.interfaces.ICancelledObject;
import communication.interfaces.IByteReceiver;
import trading.database.interfaces.ITradingDatabaseHistoryInterface;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

public class TcpTradingDatabaseHistoryInterface implements ITradingDatabaseHistoryInterface, IByteReceiver, ICancelledObject
{

    int port;

    String host;

    ICancellation cancellation;

    public  TcpTradingDatabaseHistoryInterface(String host, int port)
    {

    }

    @Override
    public CompletableFuture<Map<String, Object>> getSymbols(ICancellation cancellation) {
        cancellation.addCancelledObject(this);
        this.cancellation = cancellation;
        return null;
    }

    @Override
    public void Receive(byte[] bytes, int length)
    {

    }

    void change(ICancellation cancellation)
    {
    }

    @Override
    public CompletableFuture<Void>  cancelObject() {
        return null;
    }
}
