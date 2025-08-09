"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const OrbitAct_1 = require("./Tests/Wrappers/OrbitAct");
const RandomAcr_1 = require("./Tests/Wrappers/RandomAcr");
const SimpleFeedAct_1 = require("./Tests/Wrappers/SimpleFeedAct");
const TwoAct_1 = require("./Tests/Wrappers/TwoAct");
const TestObjectTransformerSimpleAct_1 = require("./Tests/Wrappers/TestObjectTransformerSimpleAct");
const ConditionTestAct_1 = require("./Tests/Wrappers/ConditionTestAct");
//actOrbit();
//actRandom();
//actTwo();
//actSimpleFeed();
//actTestObjectTransformerSimple();
actCondition();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Is this example useful? [y/n] ', (answer) => {
    switch (answer.toLowerCase()) {
        case 'y':
            console.log('Super!');
            break;
        case 'n':
            console.log('Sorry! :(');
            break;
        default:
            console.log('Invalid answer!');
    }
    rl.close();
});
function load() {
    try {
        /*
                let orb = new Orbital();
                let objs = orb.getObjects();
                let p = new Performer();
                var al = p.select<ICategoryObject>(objs, "IAlias");
                var ln = p.select<ICategoryArrow>(objs, "DataLink");
                var dl = p.select<DataLink>(objs, "ICategoryArrow");
                let i = 0;*/
    }
    catch (e) {
        let ii = 0;
        ii++;
    }
}
function finish(e) {
    console.log(e);
    rl.question('Is this example useful? [y/n] ', (answer) => {
        switch (answer.toLowerCase()) {
            case 'y':
                console.log('Super!');
                break;
            case 'n':
                console.log('Sorry! :(');
                break;
            default:
                console.log('Invalid answer!');
        }
        rl.close();
    });
}
function actCondition() {
    try {
        var o = new ConditionTestAct_1.ConditionTestAct();
        o.test();
    }
    catch (e) {
        finish(e);
    }
}
function actTestObjectTransformerSimple() {
    try {
        var o = new TestObjectTransformerSimpleAct_1.TestObjectTransformerSimpleAct();
        o.test();
    }
    catch (e) {
        console.log(e);
        rl.question('Is this example useful? [y/n] ', (answer) => {
            switch (answer.toLowerCase()) {
                case 'y':
                    console.log('Super!');
                    break;
                case 'n':
                    console.log('Sorry! :(');
                    break;
                default:
                    console.log('Invalid answer!');
            }
            rl.close();
        });
    }
}
function actSimpleFeed() {
    try {
        var o = new SimpleFeedAct_1.SimpleFeedAct();
        o.test();
    }
    catch (e) {
        console.log(e);
        rl.question('Is this example useful? [y/n] ', (answer) => {
            switch (answer.toLowerCase()) {
                case 'y':
                    console.log('Super!');
                    break;
                case 'n':
                    console.log('Sorry! :(');
                    break;
                default:
                    console.log('Invalid answer!');
            }
            rl.close();
        });
    }
}
function actTwo() {
    try {
        var o = new TwoAct_1.TwoAct();
        o.test();
    }
    catch (e) {
        console.log(e);
        rl.question('Is this example useful? [y/n] ', (answer) => {
            switch (answer.toLowerCase()) {
                case 'y':
                    console.log('Super!');
                    break;
                case 'n':
                    console.log('Sorry! :(');
                    break;
                default:
                    console.log('Invalid answer!');
            }
            rl.close();
        });
    }
}
function actRandom() {
    try {
        var o = new RandomAcr_1.RandomAct();
        o.test();
    }
    catch (e) {
        console.log(e);
        rl.question('Is this example useful? [y/n] ', (answer) => {
            switch (answer.toLowerCase()) {
                case 'y':
                    console.log('Super!');
                    break;
                case 'n':
                    console.log('Sorry! :(');
                    break;
                default:
                    console.log('Invalid answer!');
            }
            rl.close();
        });
    }
}
function actOrbit() {
    try {
        var o = new OrbitAct_1.OrbitAct();
        o.test();
    }
    catch (e) {
        var i = 0;
    }
}
//# sourceMappingURL=app.js.map