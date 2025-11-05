package cancellation.interfaces;

public interface ICancellation {

    void  addCancelledObject(ICancelledObject object);
    void  removeCancelledObject(ICancelledObject object);

    void cancelConcellation();

}
