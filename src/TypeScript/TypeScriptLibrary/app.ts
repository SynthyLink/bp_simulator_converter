import { ActorWeb } from "./src/Tests/Actor/ActorWeb";

let a = new ActorWeb()

//a.actAirplane()

//await a.actDonchianLoad();

a.readTest("c:\\AUsers\\1MySoft\\CSharp\\src\\Web\\reactprojectgenerated\\static\\models\\pLANE\\Cessna_208_Caravan.obj")
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


async function test() {
    await a.actDonchianLoad();
}

//test();

a.finish(undefined);

