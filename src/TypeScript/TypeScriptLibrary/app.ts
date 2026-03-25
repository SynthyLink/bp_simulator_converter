import { Actor } from "./src/Tests/Actor/Actor";

let a = new Actor();


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

