"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConsumer = void 0;
const CategoryObject_1 = require("../CategoryObject");
const ActionArray_1 = require("../Utilities/Generic/ActionArray");
const Performer_1 = require("../Performer");
class DataConsumer extends CategoryObject_1.CategoryObject {
    constructor(desktop, name) {
        super(desktop, name);
        this.isEvEnabled = false;
        this.measurements = [];
        this.success = true;
        this.events = [];
        this.eventAction = new ActionArray_1.ActionArray();
        this.fictiveAvtion = new ActionArray_1.ActionArray();
        this.currentAction = new ActionArray_1.ActionArray();
        this.typeName = "DataConsumer";
        this.types.push("DataConsumer");
        this.types.push("IDataConsumer");
        this.types.push("IPostSetArrow");
        this.types.push("ITimeMeasurementConsumer");
        this.types.push("IPrintedObject");
        this.types.push("ICheckHolder");
        this.types.push("IIteratorConsumer");
        this.types.push("IEventHandler");
        this.types.push("IEventStart");
        this.types.push("IAddRemove");
        this.tms = this;
        this.dataConsumer = this;
        this.currentAction = this.fictiveAvtion;
        this.eventAction.addAction(new UpdateAction(this));
    }
    isEventEnabled() {
        return this.isEvEnabled;
    }
    setEventEnabled(enabled) {
        if (enabled == this.isEvEnabled)
            return;
        this.isEvEnabled = enabled;
        if (enabled) {
            this.currentAction = this.eventAction;
            return;
        }
        this.currentAction = this.fictiveAvtion;
    }
    action() {
        this.currentAction.action();
    }
    getAddRemoveType() {
        return "";
    }
    getChildernT() {
        return this.events;
    }
    addChildT(child) {
        this.events.push(child);
    }
    removeChildT(child) {
        this.performer.remove(this.events, child);
    }
    resetDataConsumer() {
    }
    addIterator(iterator) {
        this.iterator = iterator;
    }
    removeIterator(iterator) {
    }
    getCheck() {
        return this.checker;
    }
    setCheck(check) {
        this.checker = check;
    }
    print(printer) {
        for (var m of this.measurements) {
            let co = m;
            let s = co.getCategoryObjectName() + "\t";
            let n = m.getMeasurementsCount();
            for (let i = 0; i < n; i++) {
                var mm = m.getMeasurement(i);
                var v = mm.getMeasurementValue();
                s += v + "\t";
            }
            printer.print(s);
        }
    }
    getInternalTime() {
        var tm = this.timeMeasurement;
        return tm.getTime();
    }
    getTimeMeasurement() {
        return this.timeMeasurement;
    }
    setTimeMeasurement(measurement) {
        this.timeMeasurement = measurement;
        ;
    }
    postSetArrow() {
        for (let event of this.events) {
            event.eventAction().addAction(this.eventAction);
        }
    }
    getAllMeasurements() {
        return this.measurements;
    }
    addMeasurements(item) {
        this.measurements.push(item);
    }
}
exports.DataConsumer = DataConsumer;
class UpdateAction {
    constructor(dc) {
        this.p = new Performer_1.Performer();
        this.dc = dc;
    }
    action() {
        this.p.updateChildrenData(this.dc);
    }
}
//# sourceMappingURL=DataConsumer.js.map