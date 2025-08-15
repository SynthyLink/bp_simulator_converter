"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitValueAlias = void 0;
const FictiveAliasName_1 = require("./Fiction/FictiveAliasName");
const FictiveValue_1 = require("./Fiction/FictiveValue");
class InitValueAlias {
    constructor(alias, value) {
        this.value = new FictiveValue_1.FictiveValue();
        this.alias = new FictiveAliasName_1.FictiveAliasName();
        this.alias = alias;
        this.value = value;
    }
    getFeedBackAlias() {
        return this.alias;
    }
    setFeedBackAlias() {
        var x = this.value.getIValue();
        if (x != undefined) {
            this.alias.setAliasNameValue(x);
        }
    }
}
exports.InitValueAlias = InitValueAlias;
//# sourceMappingURL=InitValueAlias.js.map