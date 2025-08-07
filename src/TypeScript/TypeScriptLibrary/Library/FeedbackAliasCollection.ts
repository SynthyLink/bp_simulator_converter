import { FeedbackAlias } from "./FeedbackAlias";
import { FictiveDesktop } from "./Fiction/FictiveDesktop";
import { FictiveMeasurements } from "./Fiction/FictiveMeasurements";
import { ICategoryObject } from "./Interfaces/ICategoryObject";
import { IDesktop } from "./Interfaces/IDesktop";
import { IFeedbackAlias } from "./Interfaces/IFeedbackAlias";
import { IFeedbackAliasCollection } from "./Interfaces/IFeedbackAliasCollection";
import { IValue } from "./Interfaces/IValue";
import { IMeasurements } from "./Measurements/Interfaces/IMeasurements";
import { Performer } from "./Performer";

export class FeedbackAliasCollection implements IFeedbackAliasCollection
{

    constructor(map: Map<string, string>, measurements: IMeasurements, obj: ICategoryObject)
    {
        this.performer.copyMap(map, this.map);
        this.desktop = obj.getDesktop();
        this.measurements = measurements;
    }

    getFeedbackAliasCollectionMap(): Map<string, string> {
        return this.map;
    }
    getFeedbackAliasCollectionAliases(): IFeedbackAlias[] {
        return this.aliases;
    }
    addFeedbackAliasCollectionAlias(alias: IFeedbackAlias): void {
        this.aliases.push(alias);
    }

    setFeedBackAliases(): void
    {
        for (var a of this.aliases)
        {
            a.setFeedBackAlias();
        }
    }

    fillFeedBackAliases(): void
    {
        var measuremets = this.performer.getMeasurementsMap(this.measurements);
        for (const [key, val] of this.map.entries())
        {
            var an = this.performer.getAliasName(this.desktop, val);
            var m = measuremets.get(key);
            var iv = m as unknown as IValue;
            var alias = new FeedbackAlias(an, iv);
            this.aliases.push(alias);
        }

    }

    performer: Performer = new Performer();

    
    protected aliases: IFeedbackAlias[] = [];

    protected map: Map<string, string> = new Map();

    protected desktop: IDesktop = new FictiveDesktop();

    protected measurements: IMeasurements = new FictiveMeasurements();
}