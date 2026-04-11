"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Performer = void 0;
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const AliasName_1 = require("./AliasName");
const ConsolePrinter_1 = require("./ConsolePrinter");
const OwnError_1 = require("./ErrorHandler/OwnError");
const MeasurementsComparator_1 = require("./Measurements/MeasurementsComparator");
const SortingAlgorithms_1 = require("./Utilities/Sort/SortingAlgorithms");
const ActionArray_1 = require("./Utilities/Generic/ActionArray");
class Performer {
    constructor() {
        this.a = 0;
        this.b = false;
        this.s = "";
        this.printer = new ConsolePrinter_1.ConsolePrinter();
        this.sorting = new SortingAlgorithms_1.SortingAlgorithms();
        this.mCompatator = new MeasurementsComparator_1.MeasurementsComparator(this);
    }
    addUnique(list, item) {
        for (let x of list) {
            if (x == item) {
                return false;
            }
        }
        list.push(item);
        return true;
    }
    getAllIObjects(categoryObjects, arrows, objects) {
        for (let o of categoryObjects) {
            var l = this.convertObject(o, "IObject");
            if (l.length > 0) {
                objects.push(l[0]);
            }
        }
        for (let a of arrows) {
            var l = this.convertObject(a, "IObject");
            if (l.length > 0) {
                objects.push(l[0]);
            }
        }
    }
    setPrinter(printer) {
        this.printer = printer;
    }
    forEach(collection, action, type) {
        let obj = collection.getObjectCollection();
        for (let o of obj) {
            var x = this.convertObject(o, type);
            if (x.length > 0)
                action.actionT(x[0]);
        }
    }
    getAll(collection, type) {
        let t = [];
        let obj = collection.getObjectCollection();
        for (let o of obj) {
            var x = this.convertObject(o, type);
            if (x.length > 0)
                t.push(x[0]);
        }
        return t;
    }
    reoplaceArrayValue(t, s) {
        if (s.length == 0) {
            if (t.length > 0) {
                t.pop();
                return;
            }
        }
        let ss = s[0];
        if (t.length > 0) {
            t[0] = ss;
            return;
        }
        t.push(ss);
    }
    executeAction(acttion) {
        if (acttion === undefined)
            return;
        acttion.action();
    }
    sumOfActions(first, second) {
        var act = new ActionArray_1.ActionArray();
        if (first === undefined) {
            return second;
        }
        else {
            act.addAction(first);
            if (second === undefined) {
                return first;
            }
            else {
                act.addAction(second);
            }
        }
        return act;
    }
    setCheker(desktop, check) {
        const objects = desktop.getCategoryObjects();
        for (let object of objects) {
            if (this.implementsType(object, "ICheckHolder")) {
                var ch = object;
                ch.setCheck(check);
            }
        }
    }
    findMaxWithReduce(numbers) {
        if (numbers.length === 0) {
            return undefined;
        }
        return numbers.reduce((max, current) => {
            return current > max ? current : max;
        }, -Infinity); // Start with -Infinity to ensure the first element is always greater
    }
    findMinWithReduce(numbers) {
        if (numbers.length === 0) {
            return undefined;
        }
        return numbers.reduce((min, current) => {
            return current > min ? current : min;
        }, Infinity); // Start with -Infinity to ensure the first element is always greater
    }
    calculateAverage(numbers) {
        if (numbers.length === 0) {
            return 0; // Or throw an error, depending on your requirements
        }
        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum / numbers.length;
    }
    calculateAverageRobust(data) {
        const numbers = data.filter((item) => typeof item === 'number'); // Type guard
        if (numbers.length === 0) {
            return 0;
        }
        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum / numbers.length;
    }
    calculateAverageNull(data) {
        const numbers = data.filter((item) => typeof item === 'number'); // Type guard
        if (numbers.length != data.length) {
            return undefined;
        }
        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum / numbers.length;
    }
    getPrinter() {
        return this.printer;
    }
    print(object) {
        if (this.implementsType(object, "IPrintedObject")) {
            var pr = object;
            pr.print(this.printer);
            return;
        }
        this.printer.print(object);
    }
    convertTS(s, type) {
        if (this.implementsType(s, type)) {
            throw new OwnError_1.OwnError("Illegal type", "Illegal type: " + type, undefined);
        }
        return s;
    }
    getByInterface(desktop, type) {
        let co = desktop.getCategoryObjects();
        let objects = [];
        for (var a of co) {
            if (this.implementsType(a, type)) {
                objects.push(a);
            }
        }
        return objects;
    }
    sortMeasurements(measurements) {
        return this.sorting.mergesort(measurements, this.mCompatator);
    }
    getByType(desktop, type) {
        let co = desktop.getCategoryObjects();
        let objects = [];
        for (var a of co) {
            if (this.implementsType(a, type)) {
                var ob = a;
                if (ob.getClassName() == type) {
                    objects.push(a);
                }
            }
        }
        return objects;
    }
    updateFeedbackData(dataConsumer, feedback) {
        if (feedback.isEmpty())
            return;
        feedback.setFeedbacks();
        this.updateChildrenData(dataConsumer);
    }
    updateChildrenData(dataConsumer) {
        let children = dataConsumer.getAllMeasurements();
        for (var child of children) {
            let o = child;
            if (this.implementsType(o, "IDataConsumer")) {
                let dc = child;
                this.updateChildrenData(dc);
            }
            child.updateMeasurements();
        }
    }
    convertArray(objects, type) {
        const s = [];
        for (let i = 0; i < objects.length; i++) {
            let o = objects[i];
            if (o.imlplementsType(type)) {
                s.push(o);
            }
        }
        return s;
    }
    convertMap(objects, type) {
        let map = new Map();
        var ent = objects.entries();
        for (const [key, val] of ent) {
            let o = val;
            if (o.imlplementsType(type)) {
                map.set(key, o);
            }
        }
        return map;
    }
    getName(obj) {
        var o = this.convertArray(obj, "IObject");
        return o[0].getName();
    }
    convertObject(s, type) {
        let ob = s;
        var t = [];
        if (ob.imlplementsType(type)) {
            var x = s;
            t.push(x);
        }
        return t;
    }
    getObjectCollectionArray(collection, type) {
        let t = [];
        var s = collection.getObjectCollection();
        for (let o of s) {
            let tt = this.convertObject(o, type);
            if (tt.length == 0)
                continue;
            t.push(tt[0]);
        }
        return t;
    }
    getObjectCollectionMap(collection, type) {
        let map = new Map();
        var s = collection.getObjectCollection();
        for (let o of s) {
            let tt = this.convertObject(o, type);
            if (tt.length == 0)
                continue;
            let named = this.convertObject(o, "INamed");
            if (named.length > 0) {
                map.set(named[0].getNamedName(), tt[0]);
            }
        }
        return map;
    }
    getCollectionObject(collection, name, type) {
        let o = collection.getCategoryObject(name);
        return this.convertObject(o, type);
    }
    convertProperties(o, type) {
        let ob = this.convertObject(o, type);
        if (ob.length > 0)
            return ob;
        let prp = this.convertObject(o, "IProperties");
        if (prp.length > 0) {
            var pp = this.convertObject(prp[0].getProperties(), type);
            if (pp.length > 0)
                return pp;
        }
        return [];
    }
    select(objects, type) {
        let t = [];
        for (var i = 0; i < objects.length; i++) {
            let o = objects[i];
            if (o.imlplementsType(type)) {
                t.push(o);
            }
        }
        return t;
    }
    getDerivation(derivation) {
        let m = derivation.getDerivation();
        let x = m.getMeasurementValue();
        return this.convertFromAny(x);
    }
    getDerivationMeasurement(measurement) {
        let d = measurement;
        return this.getDerivation(d);
    }
    setDerivationValue(derivation, value) {
        let m = derivation.getDerivation();
        let iv = m;
        iv.setIValue(value);
    }
    setDerivationMeasuremtValue(measurement, value) {
        let d = measurement;
        this.setDerivationValue(d, value);
    }
    convertFromAny(t) {
        return this.convert(t);
    }
    convert(t) {
        // Typeof checks against string representations of types. S is a generic type,
        // so you can't directly use typeof S.  It will just return the string "object" or "function".
        // You need to find a way to determine the *actual* type S at runtime
        //  and compare it against the type of 't'.
        // A very limited approach would be to use type guards, but that means
        // you'd have to know what type S *could* be in advance. This is not
        // really a general solution.
        if (t === undefined) {
            throw new OwnError_1.OwnError("Type conversion", "Performer undefined. NULL OBJECT", undefined);
        }
        if (typeof t === "string" && null instanceof String) { //VERY LIMITED AND UNSAFE EXAMPLE.
            return t; // Force the type assertion (VERY UNSAFE)
        }
        if (typeof t === "number") { // } && (t as unknown as S) instanceof Number) {  //VERY LIMITED AND UNSAFE EXAMPLE.
            return t; // Force the type assertion (VERY UNSAFE)
        }
        if (typeof t === "boolean") { //VERY LIMITED AND UNSAFE EXAMPLE.
            return t; // Force the type assertion (VERY UNSAFE)
        }
        //This is better, but assumes S is a string or number
        if (typeof t === 'string' && null === String) {
            return t;
        }
        if (typeof t === 'number' && null === Number) {
            return t;
        }
        console.warn(t, typeof t);
        throw new OwnError_1.OwnError("Type conversion", "Performer", undefined);
        // In many cases, a direct conversion may not be possible
        // or may require a more complex transformation.
        // warn("Conversion not possible for types:", typeof t, S);
        return undefined; // Or throw an error, or return a default value.
    }
    getMeasurement(i, j, dataConsumer) {
        return dataConsumer.getAllMeasurements()[i].getMeasurement(j);
    }
    remove(t, x) {
        let tt = [];
        for (let y of t) {
            if (y != x) {
                tt.push(x);
            }
        }
        return tt;
    }
    enlarge(t, x, size) {
        for (let i = 0; i < size; i++)
            t.push(x);
    }
    enlarge2(t, x, row, column) {
        for (let i = 0; i < row; i++) {
            let y = [];
            t.push(y);
            for (let j = 0; i < column; j++)
                y.push(x);
        }
    }
    enlargeNumber(x, size) {
        this.enlarge(x, 0, size);
    }
    enlargeNumber2(x, row, column) {
        this.enlarge2(x, 0, row, column);
    }
    pushArray(f, t) {
        for (let i = 0; i < f.length; i++) {
            t.push(f[i]);
        }
    }
    copyArray(f, t) {
        for (let i = 0; i < f.length; i++) {
            t[i] = f[i];
        }
    }
    copyArraySize(f, t, size) {
        for (let i = 0; i < size; i++) {
            t[i] = f[i];
        }
    }
    addArray(array, add) {
        for (let f of add) {
            array.push(f);
        }
    }
    setAliasType(name, value, map, names) {
        if (map.has(name)) {
            return false;
        }
        names.push(name);
        if (typeof value === 'number') {
            map.set(name, this.a);
        }
        if (typeof value === 'boolean') {
            map.set(name, this.b);
        }
        if (typeof value === 'string') {
            map.set(name, this.s);
        }
        return true;
    }
    setAliasMap(map, alias) {
        var keys = map.keys();
        /*    keys.foreach(
                key => alias.setAliasValue(key, map.get(key));
            );
            return;*/
        for (var key of keys) {
            alias.setAliasValue(key, map.get(key));
        }
    }
    copyMap(s, t) {
        for (const [key, value] of s) {
            t.set(key, value);
        }
    }
    implementsType(o, type) {
        let obj = o;
        return obj.imlplementsType(type);
    }
    getMeasurementsMap(measurements) {
        let map = new Map();
        var n = measurements.getMeasurementsCount();
        for (let i = 0; i < n; i++) {
            let m = measurements.getMeasurement(i);
            var nn = m.getMeasurementName();
            map.set(nn, m);
        }
        return map;
    }
    getMeasurementDC(consumer, name) {
        var mm = consumer.getAllMeasurements();
        for (var mea of mm) {
            var co = mea;
            var nm = co.getCategoryObjectName();
            nm += ".";
            var n = mea.getMeasurementsCount();
            for (let i = 0; i < n; i++) {
                var m = mea.getMeasurement(i);
                var nam = nm + m.getMeasurementName();
                if (nam == name) {
                    return m;
                }
            }
        }
        return this.measurement;
    }
    getMeasurementsMMap(measurements, map) {
        var n = measurements.getMeasurementsCount();
        for (let i = 0; i < n; i++) {
            var m = measurements.getMeasurement(i);
            var name = m.getMeasurementName();
            map.set(name, m);
        }
    }
    getMeasurementsDCMap(consumer) {
        var map = new Map();
        var mm = consumer.getAllMeasurements();
        for (var mea of mm) {
            var co = mea;
            var nm = co.getCategoryObjectName();
            nm += ".";
            var n = mea.getMeasurementsCount();
            for (let i = 0; i < n; i++) {
                var m = mea.getMeasurement(i);
                var name = nm + m.getMeasurementName();
                map.set(name, m);
            }
        }
        return map;
    }
    getMeasurements(desktop, name) {
        var a = desktop.getCategoryObject(name);
        if (this.implementsType(a, "IMeasurements")) {
            var al = a;
            return al;
        }
        return this.measurements;
    }
    getAlias(desktop, name) {
        var a = desktop.getCategoryObject(name);
        if (this.implementsType(a, "IAlias")) {
            var al = a;
            return al;
        }
        return this.alias;
    }
    getAliasName(desktop, name) {
        var l = name.length;
        var n = name.lastIndexOf('.');
        var s = name.substring(n + 1, l);
        var t = name.substring(0, n);
        var al = this.getAlias(desktop, t);
        return new AliasName_1.AliasName(al, s);
    }
}
exports.Performer = Performer;
//# sourceMappingURL=Performer.js.map