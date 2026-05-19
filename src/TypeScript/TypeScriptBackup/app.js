"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actor_1 = require("./Actor");
let act = new Actor_1.Actor();
//
//act.actPI()
console.log('Hello world');
async function f() {
    await act.p();
}
//f()
act.loadGame();
console.log("");
//# sourceMappingURL=app.js.map