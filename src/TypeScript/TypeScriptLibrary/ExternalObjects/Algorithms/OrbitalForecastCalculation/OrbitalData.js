"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.getOrbitalInitialCancel = exports.getOrbitalForecastFromNumber = void 0;
const http_1 = require("../../../Library/Communications/http/http");
const getOrbitalForecastFromNumber = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new AbortController();
    console.log('ForecastFromNumber');
    const result = yield (0, http_1.http_cancel)({
        path: `/orbital`,
        method: "post",
        body: condition,
    }, controller);
    console.log("ok", result.ok);
    console.log("body", result.body);
    if (result.ok && result.body) {
        return result.body;
    }
    else {
        return null;
    }
});
exports.getOrbitalForecastFromNumber = getOrbitalForecastFromNumber;
const getOrbitalInitialCancel = () => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new AbortController();
    const result = yield (0, http_1.http_cancel)({
        path: '/orbital/initial',
    }, controller);
    if (result.ok && result.body) {
        return result.body;
    }
    else {
        return null;
    }
});
exports.getOrbitalInitialCancel = getOrbitalInitialCancel;
//# sourceMappingURL=OrbitalData.js.map