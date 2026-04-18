import { Actor } from "./src/Tests/Actor/Actor";

let a = new Actor()

var caravan = "c:\\AUsers\\1MySoft\\CSharp\\src\\Web\\reactprojectgenerated\\static\\models\\pLANE\\Cessna_208_Caravan.obj"

a.loadObj(caravan)

//a.actAirplane()

//await a.actDonchianLoad();

//a.readTest(caravan)
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

