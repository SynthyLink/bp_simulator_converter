package cancellation.interfaces;

import java.util.concurrent.CompletableFuture;

public interface IInitializeTask {
    CompletableFuture<Void> InitializeFuture(ICancellation cancellation);
}
