"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaDesktopEngine = void 0;
const ScadaDesktop_1 = require("./ScadaDesktop");
const EngineTimerProvider_1 = require("../Event/EngineTimerProvider");
const TimerPlayEngineFactory_1 = require("../Event/TimerPlayEngineFactory");
class ScadaDesktopEngine extends ScadaDesktop_1.ScadaDesktop {
    constructor(componentCollection, engine, factory, chart) {
        super(componentCollection);
        this.chart = "";
        this.engine = engine;
        this.chart = chart;
        this.factory = factory;
        this.createRuntime();
    }
    createRuntime() {
        let co = this.componentCollection.getCategoryObject(this.chart);
        let dc = co;
        let eev = this.factory.createRealtimeFromDataConsumer(dc);
        eev.setTimeProvider(new EngineTimerProvider_1.EngineTimerProvider(this.engine));
        eev.setTimerFactory(new TimerPlayEngineFactory_1.TimerPlayEngineFactory(this.engine));
        this.runtime = eev;
    }
}
exports.ScadaDesktopEngine = ScadaDesktopEngine;
//# sourceMappingURL=ScadaDesktopEngine.js.map