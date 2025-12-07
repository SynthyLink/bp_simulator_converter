"use strict";
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Desktop = void 0;
const OwnNotImplemented_1 = require("./ErrorHandler/OwnNotImplemented");
const Performer_1 = require("./Performer");
class Desktop {
    constructor() {
        this.categoryObjects = [];
        this.categoryArrows = [];
        this.objects = [];
        this.performer = new Performer_1.Performer();
    }
    initializeTaksAsync(cancel) {
        return __awaiter(this, void 0, void 0, function* () {
            var init = [];
            var ii = this.performer.getByInterface(this, "IInitializeTask");
            for (var i of ii) {
                var k = i;
                var kk = k.initializeTaskAsync(cancel);
                init.push(k);
            }
            yield Promise.all(init);
        });
    }
    LoadAsync(cancel) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initializeTaksAsync(cancel);
            this.finish();
        });
    }
    finish() {
    }
    addObject(obj) {
        this.objects.push(obj);
    }
    getObjects() {
        return this.objects;
    }
    setCheck(check) {
        this.check = check;
    }
    getCheck() {
        return this.check;
    }
    getCategoryObject(name) {
        for (var o of this.categoryObjects) {
            var n = o.getCategoryObjectName();
            if (n == name) {
                return o;
            }
        }
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    getCategoryObjects() {
        return this.categoryObjects;
    }
    getCategoryArrows() {
        return this.categoryArrows;
    }
    addCategoryObject(obj) {
        this.categoryObjects.push(obj);
    }
    addCategoryArrow(arr) {
        this.categoryArrows.push(arr);
    }
    getName() {
        return this.name;
    }
}
exports.Desktop = Desktop;
//# sourceMappingURL=Desktop.js.map