"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.viewer = exports.Benchmark = exports.RunsFinishedCallback = exports.FramePrepareCallback = exports.ray_math = exports.fetch = exports.properties = void 0;
/* spellchecker: disable */
__exportStar(require("./webgl-operate.slim"), exports);
__exportStar(require("./gltf/index"), exports);
/* ADVANCED facilities */
const root_properties = __importStar(require("./properties"));
exports.properties = root_properties;
const root_fetch = __importStar(require("./fetch"));
exports.fetch = root_fetch;
const root_raymath = __importStar(require("./raymath"));
exports.ray_math = root_raymath;
/* DEBUG facilities */
var benchmark_1 = require("./benchmark");
Object.defineProperty(exports, "FramePrepareCallback", { enumerable: true, get: function () { return benchmark_1.FramePrepareCallback; } });
Object.defineProperty(exports, "RunsFinishedCallback", { enumerable: true, get: function () { return benchmark_1.RunsFinishedCallback; } });
Object.defineProperty(exports, "Benchmark", { enumerable: true, get: function () { return benchmark_1.Benchmark; } });
__exportStar(require("./debug/index"), exports);
/* VIEWER facilities */
const viewer_EventBlocker = __importStar(require("./viewer/eventblocker"));
const viewer_Fullscreen = __importStar(require("./viewer/fullscreen"));
var viewer;
(function (viewer) {
    viewer.EventBlocker = viewer_EventBlocker.EventBlocker;
    viewer.Fullscreen = viewer_Fullscreen.Fullscreen;
})(viewer || (exports.viewer = viewer = {}));
/* DEVELOPMENT facilities (should be none when publishing) */
/* spellchecker: enable */
//# sourceMappingURL=webgl-operate.js.map