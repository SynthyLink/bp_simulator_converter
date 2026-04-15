import { ActorWeb } from "./Tests/Actor/ActorWeb";

let a = new ActorWeb()

//a.actAirplane()

//await a.actDonchianLoad();


a.actPI()
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

