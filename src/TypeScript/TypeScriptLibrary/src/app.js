"use strict";
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
const Actor_1 = require("./Tests/Actor/Actor");
let a = new Actor_1.Actor();
//a.actAirplane()
//await a.actDonchianLoad();
//a.readTest(caravan)
//a.readTest(caravan)
//a.actAirplane()
//await a.actDonchianLoad();
//a.actPI()
//a.testDate();
//a.actTime();
//a.actOrbitCalculation(true);// 1770457504
//a.actDensity();
//a.actODEFeedback();
//a.actRecursiveFeedback();
//a.actFeedbackFormula();
//a.actRecursiveFeedbackSimplw();
//a.actODE_FeedAct();
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        yield a.actDonchianLoad();
    });
}
//test();
a.finish(undefined);
//# sourceMappingURL=app.js.map