"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actor_1 = require("./src/Tests/Actor/Actor");
let a = new Actor_1.Actor();
var mtl = "c:\\AUsers\\1MySoft\\CSharp\\src\\Web\\reactprojectgenerated\\static\\models\\pLANE\\master.mtl";
var caravan = "c:\\AUsers\\1MySoft\\CSharp\\src\\Web\\reactprojectgenerated\\static\\models\\pLANE\\Cessna_208_Caravan.obj";
//a.loadObj(caravan)
//a.readTest(mtl)
//a.actAirplane()
//await a.actDonchianLoad();
//a.readTest000m()
//a.actPI()
//a.testDate();
//a.actTime();
a.actOrbitCalculation(true); // 1770457504
//a.actDensity();
//a.actODEFeedback();
//a.actRecursiveFeedback();
//a.actFeedbackFormula();
//a.actRecursiveFeedbackSimplw();
//a.actODE_FeedAct();
async function test() {
    await a.actDonchianLoad();
}
//test();
a.finish(undefined);
//# sourceMappingURL=app.js.map