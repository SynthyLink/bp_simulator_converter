"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaInterface = void 0;
const ActionArray_1 = require("../Utilities/Generic/ActionArray");
const Performer_1 = require("../Performer");
class ScadaInterface {
    constructor() {
        this.name = "";
        this.typeName = "ScadaInterface";
        this.types = ["IObject", "IScadaInterface", "IObjectCollection", "ScadaInterface"];
        this.performer = new Performer_1.Performer();
        this.inputs = new Map();
        this.outputs = new Map();
        this.constants = new Map();
        this.objects = new Map();
        this.events = [];
        //  !!! FOR LATER EVENTS WITH ARGUMENTS   protected List<string> eventOutputs = new List<string>();
        this.dInput = new Map();
        this.dConstant = new Map();
        this.fConstant = new Map();
        this.dEvents = new Map();
        this.dEventOutputs = new Map();
        this.dOutput = new Map();
        /// <summary>
        /// On start event
        /// </summary>
        this.onStart = new ActionArray_1.ActionArray();
        /// <summary>
        /// On Stop event
        /// </summary>
        this.onStop = new ActionArray_1.ActionArray();
        this.onRefresh = new ActionArray_1.ActionArray();
        this.isEnabled = false;
        console.log("UUUUUUUUUUUUUUUUU");
    }
    getClassName() {
        return this.typeName;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) >= 0;
    }
    getName() {
        return this.name;
    }
    getScadaInputs() {
        return this.inputs;
    }
    getScadaOutputs() {
        return this.outputs;
    }
    setScadaConstant(name, value) {
        this.constants.set(name, value);
    }
    getScadaConstant(name) {
        return this.constants.get(name);
    }
    getScadaConstants() {
        return this.constants;
    }
    getScadaEventsArray() {
        return this.events;
    }
    getScadaObects() {
        return this.objects;
    }
    getScadaInputEvent(name) {
        return this.dInput.get(name);
    }
    getScadaConstantEvent(name) {
        return this.dConstant.get(name);
    }
    getScadaOutputsFunc(name) {
        return undefined;
    }
    getScadaOutputFunc(name) {
        return this.dOutput.get(name);
    }
    getScadaEvent(name) {
        return this.dEvents.get(name);
    }
    setScadaEnabled(enabled) {
        this.isEnabled = enabled;
    }
    isScadaEnabled() {
        return this.isEnabled;
    }
    getScadaStop() {
        return this.onStop;
    }
    getScadaStart() {
        return this.onStart;
    }
    getScadaExceptionHanler() {
        return this.exceptionHandler;
    }
    setScadaExceptionHanler(e) {
        this.exceptionHandler = e;
    }
    refreshScada() {
    }
    getScadaRefresh() {
        return this.onRefresh;
    }
    getNamedName() {
        return this.name;
    }
    setNamedName(name) {
        this.name = name;
    }
}
exports.ScadaInterface = ScadaInterface;
//# sourceMappingURL=ScadaInterface.js.map