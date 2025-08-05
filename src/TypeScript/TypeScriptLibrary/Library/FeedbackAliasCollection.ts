import { FictiveDesktop } from "./Fiction/FictiveDesktop";
import { FictiveMeasurements } from "./Fiction/FictiveMeasurements";
import { ICategoryObject } from "./Interfaces/ICategoryObject";
import { IDesktop } from "./Interfaces/IDesktop";
import { IMeasurements } from "./Measurements/Interfaces/IMeasurements";
import { Performer } from "./Performer";
import { PureFeedbackAliasCollection } from "./PureFeedbackAliasCollection";

export class FeedbackAliasCollection extends PureFeedbackAliasCollection
{

    constructor(measurements: IMeasurements, obj: ICategoryObject, map: Map<string, string>) {
        super(map);
        this.desktop = obj.getDesktop();
        this.measuerments = measurements;
    }


    fillFeedBackAliases(): void {
        

    }


    measuerments: IMeasurements = new FictiveMeasurements();

    desktop: IDesktop = new FictiveDesktop();

    performer: Performer = new Performer();

    
}