package general_service;

import general_service.interfaces.IFeedback;
import general_service.interfaces.IFeedbackCollection;

import java.util.*;

public class FeedbackCollection implements IFeedbackCollection {

    public FeedbackCollection(Map<String, String> map)
    {
        var e = map.entrySet();
        for (var item : e)
        {
            this.map.put(item.getKey(), item.getValue());
        }
    }
    @Override
    public Map<String, String> getFeedbacksMap() {
        return map;
    }

    @Override
    public void addFeedback(IFeedback feedback) {
        feedbacks = performer.extend(feedbacks, feedback);
    }

    @Override
    public IFeedback[] getFeedbacks() {
        return feedbacks;
    }

    @Override
    public void setFeedbacks() {
        for (var feedback : feedbacks) {
            feedback.setFeedback();
        }
    }

    protected IFeedback[] feedbacks = new IFeedback[0];

    protected Performer performer = new Performer();

    protected Map<String, String> map = new HashMap<>();


}
