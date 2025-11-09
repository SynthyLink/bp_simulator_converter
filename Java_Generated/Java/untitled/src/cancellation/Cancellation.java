package cancellation;

import cancellation.interfaces.ICancellation;
import cancellation.interfaces.ICancelledObject;

import java.util.*;
import java.util.concurrent.CompletableFuture;

public class Cancellation implements ICancellation {
    @Override
    public void addCancelledObject(ICancelledObject object) {
        list.add(object);
    }

    @Override
    public void removeCancelledObject(ICancelledObject object) {
        list.remove(object);
    }

    @Override
    public CompletableFuture<Void> cancelConcellation() {
        for (var o : list) {
            o.cancelObject();
        }
    }

    List<ICancelledObject> list = new ArrayList<>();
}
