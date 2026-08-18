"use strict";
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrbitalInitialCancel = exports.getOrbitalForecastFromNumber = void 0;
exports.actOrbitCalculation = actOrbitCalculation;
exports.orbitCalculation = orbitCalculation;
exports.nodeWheatherForecastClick = nodeWheatherForecastClick;
exports.nodeOrbitalIClickCanlel = nodeOrbitalIClickCanlel;
exports.nodeOrbitalClick = nodeOrbitalClick;
const OrbitalCommunication_1 = require("./Algorithms/OrbitalForecastCalculation/OrbitalCommunication");
let orbitalCommunication = new OrbitalCommunication_1.OrbitalCommunication();
async function actOrbitCalculation() {
    await orbitalCommunication.actOrbitCalculation();
}
;
async function orbitCalculation(condition) {
    const t = await orbitalCommunication.orbitCalculation(condition);
    return t;
}
const getOrbitalForecastFromNumber = async (condition) => {
    var t = await orbitalCommunication.getOrbitalForecastFromNumber(condition);
    return t;
};
exports.getOrbitalForecastFromNumber = getOrbitalForecastFromNumber;
const getOrbitalInitialCancel = async () => {
    return await orbitalCommunication.getOrbitalInitialCancel();
};
exports.getOrbitalInitialCancel = getOrbitalInitialCancel;
async function nodeWheatherForecastClick() {
    await orbitalCommunication.nodeWheatherForecastClick();
}
;
async function nodeOrbitalIClickCanlel() {
    await orbitalCommunication.nodeOrbitalIClickCanlel();
}
;
async function nodeOrbitalClick() {
    await orbitalCommunication.nodeOrbitalClick();
}
;
//# sourceMappingURL=OrbitalMethods.js.map