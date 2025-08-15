import * as readline from 'readline';
import { OrbitAct } from './Tests/Wrappers/OrbitAct';
import { RandomAct } from './Tests/Wrappers/RandomAcr';
import { SimpleFeedAct } from './Tests/Wrappers/SimpleFeedAct';
import { TwoAct } from './Tests/Wrappers/TwoAct';
import { TestObjectTransformerSimpleAct } from './Tests/Wrappers/TestObjectTransformerSimpleAct';
import { ConditionTestAct } from './Tests/Wrappers/ConditionTestAct';
import { ODEAct } from './Tests/Wrappers/ODEAct';
//actOrbit();
//actRandom();
//actTwo();
//actSimpleFeed();
//actTestObjectTransformerSimple();

//actCondition();

actODE();

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
    catch (e: any) {
        let ii = 0;
        ii++;

    }
}

function finish(e: any) {
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

function actODE() {
    try
    {
        var o = new ODEAct();
        o.test();
    }
    catch (e: any) {
        finish(e);
    }
}

function actCondition()
{
    try
    {
        var o = new ConditionTestAct();
        o.test();
    }
    catch (e: any) {
        finish(e);
    }
}

function actTestObjectTransformerSimple() {
    try {
      /*  var o = new TestObjectTransformerSimpleAct();
        o.test();*/
    }
    catch (e: any) {
            finish(e);
        }
    }


function actSimpleFeed() {
    try {
        var o = new SimpleFeedAct();
        o.test();
    }
    catch (e: any) {
        console.log(e);
    }
}
function actTwo() {
    try {
        var o = new TwoAct();
        o.test();
    }
    catch (e: any) {
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
        var o = new RandomAct();
        o.test();
    }
    catch (e: any) {
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
        var o = new OrbitAct();
        o.test();
    }
    catch (e: any)
    {
        var i = 0;
    }
}

