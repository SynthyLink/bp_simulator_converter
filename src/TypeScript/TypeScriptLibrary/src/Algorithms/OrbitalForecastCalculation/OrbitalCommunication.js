"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbitalCommunication = void 0;
const OrbitalForecastCalculation_1 = require("./OrbitalForecastCalculation");
const http_interface_1 = require("../../Library/Communications/http/http_interface");
const OrbitalMethods_1 = require("../../OrbitalMethods");
const AppSettings_1 = require("../../Library/Communications/http/AppSettings");
const RemoteServer_1 = require("../../RemoteServer");
class OrbitalCommunication extends http_interface_1.HttpCommunication {
    connected = false;
    async actOrbitCalculation() {
        let o = new OrbitalForecastCalculation_1.OrbitalForecastCalculation();
        const cond = {
            begin: 0, end: 20000, x: -5448.34815324, y: -4463.93698421, z: 0, vx: -0.98539477743, vy: 1.21681893834, vz: 7.45047785592
        };
        const ab = new AbortController();
        const t = await o.calculate(cond, ab);
        console.log("IMITATION", t);
        //*/
    }
    async orbitCalculation(condition) {
        let o = new OrbitalForecastCalculation_1.OrbitalForecastCalculation();
        const ab = new AbortController();
        const t = await o.calculate(condition, ab);
        return t;
    }
    async getOrbitalForecastFromNumber(condition) {
        const controller = new AbortController();
        const result = await this.http_cancel({
            path: `/orbital`,
            method: "post",
            body: condition,
        }, controller);
        if (result.ok && result.body) {
            return result.body;
        }
        else {
            return undefined;
        }
    }
    getOrbitalInitialCancel = async () => {
        const controller = new AbortController();
        const result = await this.http_cancel({
            path: '/orbital/initial',
        }, controller);
        if (result.ok && result.body) {
            return result.body;
        }
        else {
            return null;
        }
    };
    setServer = async () => {
        if (this.connected) {
            return;
        }
        this.connected = true;
        try {
            const controller = new AbortController();
            const result = await this.http_cancel({
                path: '/TestConnection/test',
            }, controller);
            if (result.ok && result.body) {
                return;
            }
        }
        finally {
        }
        (0, AppSettings_1.setCommunicationServer)((0, RemoteServer_1.server)());
    };
    async nodeWheatherForecastClick() {
        try {
            const response = await fetch('weatherforecastt/ttts');
            if (response.ok) {
                console.log("WHEATHER", response);
                const data = await response.json();
                console.log("WHEATHER", data);
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    async nodeOrbitalIClickCanlel() {
        try {
            //      const cond = {
            //          Begin: 0, End: 20000, X: -5448.34815324, Y: -4463.93698421, Z: 0, Vx: 0.98539477743, Vy: 1.21681893834, Vz: 7.45047785592
            //       };
            console.log("ORBITAL INITIAL");
            const response = await (0, OrbitalMethods_1.getOrbitalInitialCancel)();
            console.log("ORBITAL INITIAL", response);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    async nodeOrbitalClick() {
        try {
            const cond = {
                begin: 0, end: 20000, x: -5448.34815324, y: -4463.93698421, z: 0, vx: 0.98539477743, vy: 1.21681893834, vz: 7.45047785592
            };
            const response = await (0, OrbitalMethods_1.getOrbitalForecastFromNumber)(cond);
            console.log("ORBITAL SERVER", response);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}
exports.OrbitalCommunication = OrbitalCommunication;
;
//# sourceMappingURL=OrbitalCommunication.js.map