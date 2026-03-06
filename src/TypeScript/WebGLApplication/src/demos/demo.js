"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Demo = void 0;
const webgl_operate_1 = require("webgl-operate");
/* spellchecker: enable */
class Demo extends webgl_operate_1.Initializable {
    /**
     * Hide the loading spinner.
     */
    showSpinner() {
        const spinnerElement = document.getElementsByClassName('spinner').item(0);
        spinnerElement.style.display = 'inline';
    }
    /**
     * Hide the loading spinner.
     */
    hideSpinner() {
        const spinnerElement = document.getElementsByClassName('spinner').item(0);
        spinnerElement.style.display = 'none';
    }
    expose() {
        window['canvas'] = this.canvas;
        window['context'] = this.canvas.context;
        window['controller'] = this.canvas.controller;
        window['renderer'] = this.renderer;
    }
    initialize(element) {
        const result = this.onInitialize(element);
        this.renderer.loadingStatus$.subscribe((status) => {
            if (status === webgl_operate_1.LoadingStatus.Finished) {
                this.hideSpinner();
            }
            else if (status === webgl_operate_1.LoadingStatus.Started) {
                this.showSpinner();
            }
        });
        this.expose();
        return result;
    }
    uninitialize() {
        this.onUninitialize();
    }
    enableFullscreenOnCtrlClick() {
        const e = this.canvas.element;
        e.addEventListener('click', (event) => {
            if (event.ctrlKey) {
                webgl_operate_1.viewer.Fullscreen.toggle(e);
            }
        });
    }
}
exports.Demo = Demo;
//# sourceMappingURL=demo.js.map