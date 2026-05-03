"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGame = void 0;
const OwnNotImplemented_1 = require("../../ErrorHandler/OwnNotImplemented");
const ActionArray_1 = require("../../Utilities/Generic/ActionArray");
const GamePerformer_1 = require("../GamePerformer");
class AbstractGame {
    constructor(name, factory) {
        this.typeName = "AbstractGame";
        this.types = ["IObject", "IGame", "IChildrenT<IScene>", "ISelfLoad",
            "IAddAction", "SelfStart", "IObjectCollection", "IExternalAction",
            "IFactoryConsumer", "AbstractGame"];
        this.name = "";
        this.scenes = new Map();
        this.children = [];
        this.objects = [];
        this.externalAction = new ActionArray_1.ActionArray();
        this.internalAction = new ActionArray_1.ActionArray();
        this.isStarted = false;
        this.isLoaded = false;
        this.performer = new GamePerformer_1.GamePerformer(this);
        this.factory = factory;
        this.name = name;
    }
    addScene(name, scene) {
        this.scenes.set(name, scene);
        this.objects.push(scene);
    }
    getName() {
        return this.name;
    }
    getClassName() {
        return this.typeName;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) >= 0;
    }
    getScenes() {
        return this.scenes;
    }
    getObjectCollection() {
        return this.objects;
    }
    getExternalAction() {
        return this.externalAction;
    }
    setConsumerFactory(factory) {
        this.factory = factory;
        this.performer.setFactoryToObjectCollection(this, factory);
    }
    getConsumerFactory() {
        return this.factory;
    }
    startItself(start) {
        if (this.isStarted == start)
            return false;
        this.isStarted = start;
        this.performer.startCollecion(start, this);
        return true;
    }
    addAction(action, add) {
        if (add)
            this.externalAction.addAction(action);
        else
            this.externalAction.removeAction(action);
    }
    loadItself(load) {
        if (this.isLoaded == load)
            return false;
        this.isLoaded = load;
        this.performer.loadCollecion(load, this);
        this.internalAction.clearActions();
        if (load) {
            for (var s of this.scenes) {
                this.internalAction.addAction(s[1].getInternalAction());
            }
        }
        return true;
    }
    addChildT(child) {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    removeChildT(child) {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    getChildernT() {
        return this.children;
    }
}
exports.AbstractGame = AbstractGame;
//# sourceMappingURL=AbstractGame.js.map