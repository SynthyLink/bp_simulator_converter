"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionArray = void 0;
const Performer_1 = require("../../Performer");
class ActionArray {
    constructor() {
        this.actions = [];
        this.typeName = "ActionArray";
        this.types = ["IAction", "IObject", "ActionArray"];
        this.performer = new Performer_1.Performer();
    }
    addAction(action) {
        if (action === undefined)
            return;
        this.actions.push(action);
    }
    removeAction(action) {
        if (action === undefined)
            return;
        this.performer.remove(this.actions, action);
    }
    clearActions() {
        this.actions = [];
    }
    getClassName() {
        return this.typeName;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) > 0;
    }
    getName() {
        return "";
    }
    action() {
        for (let action of this.actions)
            action.action();
    }
}
exports.ActionArray = ActionArray;
//# sourceMappingURL=ActionArray.js.map