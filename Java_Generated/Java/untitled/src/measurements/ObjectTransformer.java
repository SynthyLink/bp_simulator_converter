package measurements;

import category_theory.CategoryObject;
import diagram.interfaces.IDesktop;
import error_handler.OwnNotImplemented;
import general_service.Performer;
import general_service.interfaces.IPostSetArrow;
import measurements.interfaces.*;

import java.util.HashMap;
import java.util.Map;

public class ObjectTransformer extends CategoryObject implements IObjectTransformerConsumer,
        IDataConsumer, IMeasurements, IPostSetArrow {
    public ObjectTransformer(String name, IDesktop desktop)
    {
        super(name, desktop);
    }

    @Override
    public void postSetArrow() {

    }

    @Override
    public IMeasurements[] getAllMeasurements() {
        return new IMeasurements[0];
    }

    @Override
    public void addMeasurements(IMeasurements item) {

    }

    @Override
    public int getMeasurementsCount() {
        return OutMea.length;
    }

    @Override
    public IMeasurement getMeasurement(int i) {
        return OutMea[i];
    }

    @Override
    public void updateMeasurements() {

    }

    @Override
    public void addMeasurement(IMeasurement measurement) {

    }

    @Override
    public void addTransfotmer(IObjectTransformer transformer) {
        if (this.transformer != null) {
            performer.show("Transformer already exists");
            return;
        }
        this.transformer = transformer;
    }

    /// <summary>
    /// This object as IObjectTransformer
    /// </summary>
    IObjectTransformer transformer;

    Performer performer = new Performer();

    /// <summary>
    /// Input
    /// </summary>
    protected Object[]  input;

    /// <summary>
    /// Output measurements
    /// </summary>
    protected TransMeasurement[]  OutMea = new TransMeasurement[0];

    /// <summary>
    /// Input measurements
    /// </summary>
    protected  IMeasurement[] ImMea = new IMeasurement[0];


    /// <summary>
    /// Input objects
    /// </summary>
    protected  Object[] inO;

    /// <summary>
    /// Output objects
    /// </summary>
    protected Object[] outO;

    /// <summary>
    /// Single output
    /// </summary>
    protected Object[] outS;
    /// <summary>
    /// Single input
    /// </summary>
    protected Object[] inS;

    /// <summary>
    /// The "is updated" sign
    /// </summary>
    protected  boolean isUpdated = false;

    /// <summary>
    /// External measurements
    /// </summary>
    /// <summary>
    /// Providers of measurements
    /// </summary>
    IMeasurements[] measurements  = new IMeasurements[0];

/// <summary>
/// Links to variables
/// </summary>
   Map<String, String> links = new HashMap<>();

    /// <summary>
    /// Providers of measurements
    /// </summary>
    IMeasurements providers;

    IDataConsumer consumer;


    class  TransMeasurement implements  IMeasurement {
        public TransMeasurement(int n, Object[] outO, String name, Object type) {
            this.n = n;
            this.outO = outO;
            this.name = name;
            this.type = type;
        }

        @Override
        public String getMeasurementName() {
            return name;
        }

        @Override
        public Object getMeasurementType() {
            return type;
        }

        @Override
        public Object getMeasurementValue() {
            return outO[n];
        }

        protected void setLinks(Map<String, String> links) {
            performer.copyMap(links, this.links);
        }

        Object type;

        String name;

        int n;

        Object[] outO;

        Map<String, String> links = new HashMap<>();

        Performer performer;
    }}
