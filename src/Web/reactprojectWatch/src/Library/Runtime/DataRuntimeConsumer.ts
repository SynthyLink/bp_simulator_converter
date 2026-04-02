/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { Performer } from "../Performer";
import { PerformerMeasuremets } from "../Measurements/PerformerMeasuremets"
import { FictiveCategoryObject } from "../Fiction/FictiveCategoryObject";
import type { IDataConsumer } from "../Measurements/Interfaces/IDataConsumer";
import type { IMeasurements } from "../Measurements/Interfaces/IMeasurements";
import type { ITimeMeasurementProvider } from "../Measurements/Interfaces/ITimeMeasurementProvider";
import type { IStarted } from "../Measurements/Interfaces/IStarted";
import type { ICategoryArrow } from "../Interfaces/ICategoryArrow";
import type { ICategoryObject } from "../Interfaces/ICategoryObject";
import type { IDataRuntime } from "../Interfaces/IDataRuntime";
import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IObject } from "../Interfaces/IObject";

export class DataRuntimeConsumer implements IDataRuntime, IComponentCollection
{


    protected performer: Performer = new Performer();


    protected mPerformer: PerformerMeasuremets = new PerformerMeasuremets()

    protected timeProvider !: ITimeMeasurementProvider;

    protected measurements: IMeasurements[] = [];

    protected categoryObjects: ICategoryObject[] = [];

    protected categoryObjectsMap: Map<string, ICategoryObject> = new Map();


    protected categoryArrows: ICategoryArrow[] = [];

    protected started: IStarted[] = [];

    protected objects: IObject[] = []


    constructor(dataConsumer: IDataConsumer)
    {
        this.prepare(dataConsumer)
        this.objects = []
        this.performer.getAllIObjects(this.categoryObjects, this.categoryArrows, this.objects)
    }

    protected prepare(dataConsumer: IDataConsumer): void {
        let nm: IMeasurements[] = [];



        this.addDataConsumer(dataConsumer, nm);
        for (let i = nm.length - 1; i >= 0; i--) {
            var n = nm[i];
            this.measurements.push(nm[i]);
            if (this.performer.implementsType(n, "ICategoryObject")) {
                this.addCategoryObjectToRuntime(n as unknown as ICategoryObject);
            }
            if (this.performer.implementsType(n, "IStarted")) {
                this.started.push(n as unknown as IStarted);
            }

        }
        if (this.performer.implementsType(dataConsumer, "IMeasurements")) {
            this.measurements.push(dataConsumer as unknown as IMeasurements);
        }

        this.measurements = this.performer.sortMeasurements(this.measurements);

    }

    getCategoryObjects(): ICategoryObject[] {
        return this.categoryObjects
    }
    getCategoryArrows(): ICategoryArrow[] {
        return this.categoryArrows;
    }

    getObjects(): IObject[] {
        return this.objects;
    }
    getCategoryObject(name: string): ICategoryObject {
        let a = this.categoryObjectsMap.get(name)
        if (a != undefined) return a;
        return new FictiveCategoryObject()
    }

    addCategoryObjectToRuntime(object: ICategoryObject): void {
        this.categoryObjects.push(object);
        var n = object.getCategoryObjectName();
        this.categoryObjectsMap.set(n, object);
    }


    getRuntimeObject(name: string): ICategoryObject
    {
        return this.categoryObjectsMap.get(name) as ICategoryObject;
    }

    getStarted(): IStarted[]
    {
        return this.started;
    }

    updateRuntime(): void
    {
        let n = this.measurements.length;
        for (let i = 0; i < n; i++)
        {
            this.measurements[i].updateMeasurements();
        }
    }

    stepRuntime(begin: number, end: number): void
    {

    }

    refreshRuntime(): void {
        throw new OwnNotImplemented();
    }

    startRuntime(time: number): void
    {
        for (let st of this.started)
        {
            st.startedStart(time);
        }
    }

    setTimeProvider(timeProvider: ITimeMeasurementProvider): void
    {
        this.timeProvider = timeProvider;
        this.mPerformer.setTimeProvider(timeProvider, this.measurements)
    }


    getTimeProvider(): ITimeMeasurementProvider
    {
        return this.timeProvider;
    }

    getRuntimeObjects(): ICategoryObject[]
    {
        return this.categoryObjects;
    }

    getRuntimeArrows(): ICategoryArrow[]
    {
        return this.categoryArrows;
    }


 
    addDataConsumer(dc: IDataConsumer, measurements: IMeasurements[]): void
    {
        var m = dc.getAllMeasurements();
        var n = m.length;
        if (n != 0)
        {
            for (let i = 0; i < n; i++)
            {
                let mea = m[i];
                if (measurements.indexOf(mea) >= 0) {
                    continue;
                }
                measurements.push(mea);
                if (!this.performer.implementsType(mea, "IDataConsumer")) {
                    continue;
                }
                let c: IDataConsumer = mea as unknown as IDataConsumer;
                this.addDataConsumer(c, measurements);

            }
        }
        else
        {

        }
    }
}


