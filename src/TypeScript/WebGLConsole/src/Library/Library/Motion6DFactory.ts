import type { IRealtimeCollectionFactory } from "./Interfaces/IRealtimeCollectionFactory";
import type { IDifferentialEquationProcessor } from "./Measurements/DifferentialEquations/Interfaces/IDifferentialEquationProcessor ";
import { RungeProcessor } from "./Measurements/DifferentialEquations/Processors/RungeProcessor";
import { Motion6DRealtimeFactory } from "./Motion6D/Runtime/Event/Motion6DRealtimeFactory";
import { UniversalFactory } from "./UniversalFactory";

export class Motion6DFactory extends UniversalFactory {
    constructor() {
        super()
        let processor = new RungeProcessor();
        this.addFactory<IDifferentialEquationProcessor>(processor, "IDifferentialEquationProcessor")
        let f = new Motion6DRealtimeFactory()
        this.addFactory<IRealtimeCollectionFactory>(f, "IRealtimeCollectionFactory")

    }
}
