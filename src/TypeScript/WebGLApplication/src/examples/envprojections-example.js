"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentProjectionExample = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const example_1 = require("./example");
// tslint:disable:max-classes-per-file
class EnvironmentProjectionRenderer extends webgl_operate_1.Renderer {
    _defaultFBO;
    _environmentRenderingPass;
    _cubeMap;
    _equiRectangularMap;
    _sphereMap;
    _polarMaps;
    _camera;
    _navigation;
    onInitialize(context, callback, eventProvider) {
        this._defaultFBO = new webgl_operate_1.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._defaultFBO.initialize();
        this._defaultFBO.bind();
        this.fetchTextures();
        // Initialize camera
        if (this._camera === undefined) {
            this._camera = new webgl_operate_1.Camera();
            this._camera.eye = gl_matrix_1.vec3.fromValues(0.0, 0.5, -1.0);
            this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.4, 0.0);
            this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
            this._camera.near = 0.1;
            this._camera.far = 4.0;
        }
        this._navigation = new webgl_operate_1.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        this._environmentRenderingPass = new webgl_operate_1.EnvironmentRenderingPass(this._context);
        this._environmentRenderingPass.initialize();
        this._environmentRenderingPass.camera = this._camera;
        return true;
    }
    onUninitialize() {
        this._cubeMap.uninitialize();
        this._equiRectangularMap.uninitialize();
        this._sphereMap.uninitialize();
        for (const map of this._polarMaps) {
            map.uninitialize();
        }
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
    }
    onUpdate() {
        this._navigation.update();
        return this._altered.any || this._camera.altered;
    }
    onPrepare() {
        if (this._altered.canvasSize) {
            this._camera.viewport = [this._frameSize[0], this._frameSize[1]];
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
        }
        this._altered.reset();
    }
    onFrame( /*frameNumber: number*/) {
        if (this.isLoading) {
            return;
        }
        const gl = this._context.gl;
        gl.viewport(0, 0, this._canvasSize[0], this._canvasSize[1]);
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, false, false);
        const b = 1.0;
        const w = (this._frameSize[0] - (4.0 - 1.0) * b) / 4.0;
        const h = this._frameSize[1];
        gl.enable(gl.SCISSOR_TEST);
        // Sphere Map
        gl.scissor((w + b) * 0.0, 0, w, h);
        this._environmentRenderingPass.environmentTexture = this._sphereMap;
        this._environmentRenderingPass.environmentTextureType = webgl_operate_1.EnvironmentTextureType.SphereMap;
        this._environmentRenderingPass.frame();
        // Equirectangular Map
        gl.scissor((w + b) * 1.0, 0, w, h);
        this._environmentRenderingPass.environmentTexture = this._equiRectangularMap;
        this._environmentRenderingPass.environmentTextureType = webgl_operate_1.EnvironmentTextureType.EquirectangularMap;
        this._environmentRenderingPass.frame();
        // Cube map
        gl.scissor((w + b) * 2.0, 0, w, h);
        this._environmentRenderingPass.environmentTexture = this._cubeMap;
        this._environmentRenderingPass.environmentTextureType = webgl_operate_1.EnvironmentTextureType.CubeMap;
        this._environmentRenderingPass.frame();
        gl.scissor((w + b) * 3.0, 0, w, h);
        this._environmentRenderingPass.environmentTexture = this._polarMaps[0];
        this._environmentRenderingPass.environmentTexture2 = this._polarMaps[1];
        this._environmentRenderingPass.environmentTextureType = webgl_operate_1.EnvironmentTextureType.PolarMap;
        this._environmentRenderingPass.frame();
        gl.disable(gl.SCISSOR_TEST);
    }
    onSwap() {
        this.invalidate();
    }
    setupTexture2D(texture) {
        const gl = this._context.gl;
        texture.wrap(gl.REPEAT, gl.REPEAT, true, false);
        texture.filter(gl.NEAREST, gl.NEAREST, false, true);
        this.invalidate(true);
    }
    fetchTextures() {
        const gl = this._context.gl;
        const promises = new Array();
        const internalFormatAndType = webgl_operate_1.Wizard.queryInternalTextureFormat(this._context, gl.RGB, webgl_operate_1.Wizard.Precision.byte);
        this._cubeMap = new webgl_operate_1.TextureCube(this._context);
        this._cubeMap.initialize(592, internalFormatAndType[0], gl.RGB, internalFormatAndType[1]);
        this._cubeMap.fetch({
            positiveX: '/examples/data/cube-map-px.jpg', negativeX: '/examples/data/cube-map-nx.jpg',
            positiveY: '/examples/data/cube-map-py.jpg', negativeY: '/examples/data/cube-map-ny.jpg',
            positiveZ: '/examples/data/cube-map-pz.jpg', negativeZ: '/examples/data/cube-map-nz.jpg',
        }).then(() => {
            const gl = this._context.gl;
            this._cubeMap.filter(gl.NEAREST, gl.NEAREST, true, true);
            this.invalidate(true);
        });
        this._equiRectangularMap = new webgl_operate_1.Texture2D(this._context);
        this._equiRectangularMap.initialize(1, 1, internalFormatAndType[0], gl.RGB, internalFormatAndType[1]);
        promises.push(this._equiRectangularMap.fetch('/examples/data/equirectangular-map.jpg').then(() => {
            this.setupTexture2D(this._equiRectangularMap);
        }));
        this._sphereMap = new webgl_operate_1.Texture2D(this._context);
        this._sphereMap.initialize(1, 1, internalFormatAndType[0], gl.RGB, internalFormatAndType[1]);
        promises.push(this._sphereMap.fetch('/examples/data/sphere-map-ny.jpg').then(() => {
            this.setupTexture2D(this._sphereMap);
        }));
        this._polarMaps = new Array(2);
        this._polarMaps[0] = new webgl_operate_1.Texture2D(this._context);
        this._polarMaps[0].initialize(1, 1, internalFormatAndType[0], gl.RGB, internalFormatAndType[1]);
        promises.push(this._polarMaps[0].fetch('/examples/data/paraboloid-map-py.jpg').then(() => {
            this.setupTexture2D(this._polarMaps[0]);
        }));
        this._polarMaps[1] = new webgl_operate_1.Texture2D(this._context);
        this._polarMaps[1].initialize(1, 1, internalFormatAndType[0], gl.RGB, internalFormatAndType[1]);
        promises.push(this._polarMaps[1].fetch('/examples/data/paraboloid-map-ny.jpg').then(() => {
            this.setupTexture2D(this._polarMaps[1]);
        }));
        Promise.all(promises).then(() => {
            this.finishLoading();
        });
    }
}
class EnvironmentProjectionExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_1.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_1.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new EnvironmentProjectionRenderer();
        this._canvas.renderer = this._renderer;
        return true;
    }
    onUninitialize() {
        this._canvas.dispose();
        this._renderer.uninitialize();
    }
    get canvas() {
        return this._canvas;
    }
    get renderer() {
        return this._renderer;
    }
}
exports.EnvironmentProjectionExample = EnvironmentProjectionExample;
//# sourceMappingURL=envprojections-example.js.map