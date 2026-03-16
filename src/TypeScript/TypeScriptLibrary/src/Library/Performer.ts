/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AliasName } from "./AliasName";
import { ConsolePrinter } from "./ConsolePrinter";
import { OwnError } from "./ErrorHandler/OwnError";
import { MeasurementsComparator } from "./Measurements/MeasurementsComparator";
import { SortingAlgorithma } from "./Utilities/Sort/SortingAlgorithms";
import { ActionArray } from "./Utilities/Generic/ActionArray";
import type { IAction } from "./Interfaces/IAction";
import type { IAlias } from "./Interfaces/IAlias";
import type { IAliasName } from "./Interfaces/IAliasName";
import type { ICategoryObject } from "./Interfaces/ICategoryObject";
import type { IComparator } from "./Utilities/Sort/Interfaces/IComparator";
import type { IDesktop } from "./Interfaces/IDesktop";
import type { IObject } from "./Interfaces/IObject";
import type { IPrintedObject } from "./Interfaces/IPrintedObject";
import type { IPrinter } from "./Interfaces/IPrinter";
import type { IValue } from "./Interfaces/IValue";
import type { IDataConsumer } from "./Measurements/Interfaces/IDataConsumer";
import type { IDerivation } from "./Measurements/Interfaces/IDerivation";
import type { IMeasurement } from "./Measurements/Interfaces/IMeasurement";
import type { IMeasurements } from "./Measurements/Interfaces/IMeasurements";
import type { IFeedbackCollection } from "./Interfaces/IFeedbackCollection";
import type { ICheck } from "./Interfaces/ICheck";
import type { ICheckHolder } from "./Interfaces/ICheckHolder";


export class Performer
{
    constructor() {
        this.mCompatator = new MeasurementsComparator(this);
    }

    protected a: number = 0;


    protected b: boolean = false;

    protected s: string = "";

    protected printer: IPrinter = new ConsolePrinter();

    protected sorting: SortingAlgorithma = new SortingAlgorithma();

    protected mCompatator !: IComparator<IMeasurements>;

    public setPrinter(printer: IPrinter): void {
        this.printer = printer;
    }


    public reoplaceArrayValue<T>(t: T[], s: T[]): void {

        if (s.length == 0) {
            if (t.length > 0) {
                t.pop();
                return;
            }
        }
        let ss = s[0]
        if (t.length > 0) {
            t[0] = ss;
            return;
        }
        t.push(ss);
    }


    public executeAction(acttion: IAction | undefined): void {
        if (acttion === undefined) return;
        acttion.action();
    }

    public sumOfActions(first: IAction | undefined, second: IAction | undefined): IAction | undefined {
        var act = new ActionArray();
        if (first === undefined) {
            return second;
        }
        else {
            act.addAction(first)
            if (second === undefined) {
                return first;
            }
            else {
                act.addAction(second);
            }
        }
        return act;
    }

    public setCheker(desktop: IDesktop, check: ICheck) {
        const objects = desktop.getCategoryObjects();
        for (let object of objects) {
            if (this.implementsType(object, "ICheckHolder")) {
                var ch = object as unknown as ICheckHolder;
                ch.setCheck(check);
            }
        }
    }

    public findMaxWithReduce(numbers: number[]): number | undefined {
        if (numbers.length === 0) {
            return undefined;
        }

        return numbers.reduce((max, current) => {
            return current > max ? current : max;
        }, -Infinity); // Start with -Infinity to ensure the first element is always greater
    }

    public findMinWithReduce(numbers: number[]): number | undefined {
        if (numbers.length === 0) {
            return undefined;
        }

        return numbers.reduce((min, current) => {
            return current > min ? current : min;
        }, Infinity); // Start with -Infinity to ensure the first element is always greater
    }



    public calculateAverage(numbers: number[]): number {
        if (numbers.length === 0) {
            return 0; // Or throw an error, depending on your requirements
        }

        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum / numbers.length;
    }


    public calculateAverageRobust(data: any[]): number {
        const numbers = data.filter((item): item is number => typeof item === 'number'); // Type guard

        if (numbers.length === 0) {
            return 0;
        }

        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum / numbers.length;
    }


    public calculateAverageNull(data: any[]): number | undefined {
        const numbers = data.filter((item): item is number => typeof item === 'number'); // Type guard

        if (numbers.length != data.length) {
            return undefined;
        }

        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum / numbers.length;
    }





    public getPrinter(): IPrinter {
        return this.printer;
    }

    public print(object: any): void {
        if (this.implementsType(object, "IPrintedObject"))
        {
            var pr = object as unknown as IPrintedObject;
            pr.print(this.printer);
            return;
        }
        this.printer.print(object);
    }

    public convertTS<S, T>(s: S, type: string): T {
        if (this.implementsType(s, type)) {
            throw new OwnError("Illegal type", "Illegal type: " + type, undefined);
        }
        return s as undefined as T;
    }

    public getByInterface(desktop: IDesktop, type: string): IObject[] {
        let co = desktop.getCategoryObjects();
        let objects: IObject[] = [];
        for (var a of co) {
            if (this.implementsType(a, type)) {
                objects.push(a as unknown as IObject);
            }
        }
        return objects;
    }

    public sortMeasurements(measurements: IMeasurements[]): IMeasurements[] {
        return this.sorting.mergesort(measurements, this.mCompatator);
    }


    public getByType(desktop: IDesktop, type: string): IObject[] {
        let co = desktop.getCategoryObjects();
        let objects: IObject[] = [];
        for (var a of co)
        {
  
            if (this.implementsType(a, type))
            {
                var ob = a as unknown as IObject;
                if (ob.getClassName() == type)
                {
                    objects.push(a as unknown as IObject);
                }
            }
        }
        return objects;
    }


    public updateFeedbackData(dataConsumer: IDataConsumer, feedback: IFeedbackCollection): void {
        if (feedback.isEmpty()) return;
        feedback.setFeedbacks();
        this.updateChildrenData(dataConsumer);
    }

    public updateChildrenData(dataConsumer: IDataConsumer): void
    {
        let children = dataConsumer.getAllMeasurements();
        for (var child of children)
        {
            let o = child as unknown as IObject;
            if (this.implementsType(o, "IDataConsumer"))
            {
                let dc = child as unknown as IDataConsumer;
                this.updateChildrenData(dc);
            }
            child.updateMeasurements();
        }
    }

    public convertArray<T, S>(objects: T[], type: string): S[] {

        const s: S[] = [];
        for (let i = 0; i < objects.length; i++) {
            let o: IObject = objects[i] as IObject;
            if (o.imlplementsType(type)) {
                s.push(o as unknown as S);
            }
        }
        return s;
    }



    public convertMap<T, S, R>(objects: Map<T, S>, type: string): Map<T, R> {
        let map: Map<T, R> = new Map();
        var ent = objects.entries();
        for (const [key, val] of ent) {
            let o: IObject = val as IObject;
            if (o.imlplementsType(type)) {
                map.set(key, o as R);
            }

        }
        return map;
    }

    public convertObject<T, S>(s: S, type: string): T[] {
        let ob = s as unknown as IObject;
        var t: T[] = [];
        if (ob.imlplementsType(type)) {
            var x = s as unknown as IObject as T;
            t.push(x);
        }
        return t;
    }



    public select<T>(objects: IObject[], type: string): T[] {

        let t: T[] = [];
        for (var i = 0; i < objects.length; i++) {
            let o = objects[i];
            if (o.imlplementsType(type)) {
                t.push(o as unknown as T);
            }
        }
        return t;
    }


    public getDerivation(derivation: IDerivation): number
    {
        let m = derivation.getDerivation();
        let x = m.getMeasurementValue();
        return this.convertFromAny<number>(x);
    }

    public getDerivationMeasurement(measurement: IMeasurement): number {
        let d = measurement as unknown as IDerivation;
        return this.getDerivation(d);
    }

    public setDerivationValue(derivation: IDerivation, value: number): void
    {
        let m = derivation.getDerivation();
        let iv = m as unknown as IValue;
        iv.setIValue(value);
    }

    public setDerivationMeasuremtValue(measurement: IMeasurement, value: number): void
    {
        let d = measurement as unknown as IDerivation;
        this.setDerivationValue(d, value);
    }




    public convertFromAny<T>(t: any): T {
        return this.convert<any, T>(t);
    }


    public convert<T, S>(t: T): S {
        // Typeof checks against string representations of types. S is a generic type,
        // so you can't directly use typeof S.  It will just return the string "object" or "function".
        // You need to find a way to determine the *actual* type S at runtime
        //  and compare it against the type of 't'.
        // A very limited approach would be to use type guards, but that means
        // you'd have to know what type S *could* be in advance. This is not
        // really a general solution.
        if (typeof t === "string" && (null as any as S) instanceof String) { //VERY LIMITED AND UNSAFE EXAMPLE.
            return t as any as S; // Force the type assertion (VERY UNSAFE)
        }

        if (typeof t === "number") { // } && (t as unknown as S) instanceof Number) {  //VERY LIMITED AND UNSAFE EXAMPLE.
            return t as unknown as S; // Force the type assertion (VERY UNSAFE)
        }

        if (typeof t === "boolean") { //VERY LIMITED AND UNSAFE EXAMPLE.
            return t as any as S; // Force the type assertion (VERY UNSAFE)
        }

        //This is better, but assumes S is a string or number
        if (typeof t === 'string' && (null as any as S) as any === String) {
            return t as any as S;
        }

        if (typeof t === 'number' && (null as any as S) as any === Number) {
            return t as any as S;
        }

        throw new OwnError("Type conversion", "Performer", undefined);

        // In many cases, a direct conversion may not be possible
        // or may require a more complex transformation.
        // console.warn("Conversion not possible for types:", typeof t, S);
        return undefined as any as S; // Or throw an error, or return a default value.
    }


    public getMeasurement(i: number, j: number, dataConsumer: IDataConsumer): IMeasurement {
        return dataConsumer.getAllMeasurements()[i].getMeasurement(j);
    }

    public remove<T>(t: T[], x: T): T[] {
        let tt: T[] = [];
        for (let y of t) {
            if (y != x) {
                tt.push(x)
            }
        }
        return tt;
    }



    public enlarge<T>(t: T[], x: T, size: number): void {
        for (let i = 0; i < size; i++) t.push(x);
    }

    public enlarge2<T>(t: T[][], x: T, row: number, column: number): void {
        for (let i = 0; i < row; i++) {
            let y: T[] = [];
            t.push(y);
            for (let j = 0; i < column; j++) y.push(x);
        }
    }

    public enlargeNumber(x: number[], size: number): void {
        this.enlarge<number>(x, 0, size);
    }

    public enlargeNumber2(x: number[][], row: number, column: number): void {
        this.enlarge2<number>(x, 0, row, column);
    }

    public pushArray<T>(f: T[], t: T[]): void {
        for (let i = 0; i < f.length; i++) {
            t.push(f[i]);
        }
    }

    public copyArray<T>(f: T[], t: T[]): void {
        for (let i = 0; i < f.length; i++) {
            t[i] = f[i];
        }
    }


    public setAliasType(name: string, value: any, map: Map<string, any>, names: string[]): boolean {
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

    public setAliasMap(map: Map<string, any>, alias: IAlias): void {
        var keys = map.keys();
        /*    keys.foreach(
                key => alias.setAliasValue(key, map.get(key));
            );
            return;*/
        for (var key of keys) {
            alias.setAliasValue(key, map.get(key));
        }
    }

    public copyMap<T, S>(s: Map<T, S>, t: Map<T, S>): void {
        for (const [key, value] of s) {
            t.set(key, value);
        }
    }

    public implementsType(o: unknown, type: string): boolean {
        let obj: IObject = o as IObject;
        return obj.imlplementsType(type);
    }

    public getMeasurementsMap(measurements: IMeasurements): Map<string, IMeasurement> {

        let map: Map<string, IMeasurement> = new Map();
        var n = measurements.getMeasurementsCount();
        for (let i = 0; i < n; i++) {
            let m = measurements.getMeasurement(i);
            var nn = m.getMeasurementName();
            map.set(nn, m);
        }
        return map;
    }

    public getMeasurementDC(consumer: IDataConsumer, name: string): IMeasurement
    {

        var mm = consumer.getAllMeasurements();
        for (var mea of mm) {
            var co = mea as unknown as ICategoryObject;
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


    public getMeasurementsMMap(measurements: IMeasurements, map: Map<string, IMeasurement>): void
    {
        var n = measurements.getMeasurementsCount();
        for (let i = 0; i < n; i++) {
            var m = measurements.getMeasurement(i);
            var name = m.getMeasurementName();
            map.set(name, m);

        }
    }


    public getMeasurementsDCMap(consumer: IDataConsumer): Map<string, IMeasurement> {
        var map: Map<string, IMeasurement> = new Map();
        var mm = consumer.getAllMeasurements();
        for (var mea of mm) {
            var co = mea as unknown as ICategoryObject;
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

    public getMeasurements(desktop: IDesktop, name: string): IMeasurements {
        var a = desktop.getCategoryObject(name);
        if (this.implementsType(a, "IMeasurements")) {
            var al = a as unknown as IMeasurements;
            return al;
        }
        return this.measurements;
    }


    public getAlias(desktop: IDesktop, name: string): IAlias {
        var a = desktop.getCategoryObject(name);
        if (this.implementsType(a, "IAlias")) {
            var al = a as unknown as IAlias;
            return al;
        }
        return this.alias;
    }

    public getAliasName(desktop: IDesktop, name: string): IAliasName {

        var l = name.length;
        var n = name.lastIndexOf('.');
        var s = name.substring(n + 1, l);
        var t = name.substring(0, n);
        var al = this.getAlias(desktop, t);
        return new AliasName(al, s);
    }

    measurements !: IMeasurements;

    measurement !: IMeasurement;



    alias !: IAlias;


}
