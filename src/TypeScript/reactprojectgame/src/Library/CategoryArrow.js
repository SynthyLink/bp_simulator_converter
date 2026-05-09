"use strict";
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryArrow = void 0;
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const EmptyObject_1 = require("./EmptyObject");
const FictiveCategoryObject_1 = require("./Fiction/FictiveCategoryObject");
const FictiveDesktop_1 = require("./Fiction/FictiveDesktop");
const Performer_1 = require("./Performer");
class CategoryArrow extends EmptyObject_1.EmptyObject {
    constructor(desktop, name) {
        super(name);
        this.desktop = new FictiveDesktop_1.FictiveDesktop();
        this.source = new FictiveCategoryObject_1.FictiveCategoryObject();
        this.target = new FictiveCategoryObject_1.FictiveCategoryObject();
        this.performer = new Performer_1.Performer();
        this.typeName = "CategoryArrow";
        this.types.push("ICategoryArrow");
        this.types.push("CategoryArrow");
        this.desktop = desktop;
        this.name = name;
        desktop.addCategoryArrow(this);
        desktop.addObject(this);
    }
    getDesktop() {
        return this.desktop;
    }
    getArrowName() {
        return this.name;
    }
    getSource() {
        return this.source;
    }
    getTarget() {
        return this.target;
    }
    setSource(source) {
        this.source = source;
    }
    setTarget(target) {
        this.target = target;
    }
    getObjectT(s, type) {
        return this.performer.convertObject(s, type);
    }
}
exports.CategoryArrow = CategoryArrow;
//# sourceMappingURL=CategoryArrow.js.map