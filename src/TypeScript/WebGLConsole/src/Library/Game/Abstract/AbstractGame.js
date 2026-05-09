"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGame = void 0;
const ActionArray_1 = require("../../Utilities/Generic/ActionArray");
const GamePerformer_1 = require("../GamePerformer");
const EmptyGameObject_1 = require("./EmptyGameObject");
class AbstractGame extends EmptyGameObject_1.EmptyGameObject {
    constructor(name, factory) {
        super(name, factory);
        this.performer = new GamePerformer_1.GamePerformer();
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
        this.intAct = new ActionArray_1.ActionArray;
        this.areResourcesLoaded = false;
        this.resources = [];
        this.types.push("IGame");
        this.types.push("IObjectCollection");
        this.types.push("ISelfStart");
        this.types.push("IAddAction");
        this.types.push("ISelfLoad");
        this.types.push("IExternalAction");
        this.types.push("IResourceCollection");
        this.types.push("AbstractGame");
        this.typeName = "AbstractGame";
    }
    getResources() {
        return this.resources;
    }
    isRunning() {
        return this.isStarted;
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
    cycle(time) {
        if (!this.isStarted)
            return;
        this.intAct.action();
        this.externalAction.action();
        this.internalAction.action();
    }
    getObjectCollection() {
        return this.objects;
    }
    getExternalAction() {
        return this.externalAction;
    }
    setConsumerFactory(factory) {
        super.setConsumerFactory(factory);
        this.performer.setFactoryToObjectCollection(this, factory);
    }
    startItself(start) {
        if (this.isStarted == start)
            return false;
        this.isStarted = start;
        this.performer.startCollecion(start, this);
        this.intAct.clearActions();
        for (var scene of this.scenes) {
            this.intAct.addAction(scene[1].getExternalAction());
        }
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
            this.performer.collectResources(this, this);
            for (var s of this.scenes) {
                this.internalAction.addAction(s[1].getInternalAction());
            }
        }
        return true;
    }
    addChildT(child) {
        this.children.push(child);
        this.objects.push(child);
        var name = child.getName();
        if (!this.scenes.has(name)) {
            this.scenes.set(name, child);
        }
    }
    removeChildT(child) {
    }
    getChildernT() {
        return this.children;
    }
}
exports.AbstractGame = AbstractGame;
//# sourceMappingURL=AbstractGame.js.map