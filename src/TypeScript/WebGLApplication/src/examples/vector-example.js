"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorExample = void 0;
const webgl_operate_1 = require("webgl-operate");
const gl_matrix_1 = require("gl-matrix");
const example_1 = require("./example");
class VectorRenderer extends webgl_operate_1.Renderer {
    _defaultFBO;
    _camera;
    _navigation;
    _fontFace;
    _points;
    _lines;
    _labels;
    _pointsBuffer;
    _pointsProgram;
    _linesBuffer;
    _linesProgram;
    _labelPass;
    onInitialize(context, callback, eventProvider) {
        const gl = this._context.gl;
        /* Create render buffer */
        this._defaultFBO = new webgl_operate_1.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._defaultFBO.initialize();
        /* create shader programs */
        // points
        // points data
        // @TODO: do not hard code this
        this._points = new Float32Array([
            -1.0, -1.0, -1.0, 0.0, 0.0, 0.0, Math.random() * 16 + 4.0,
            -1.0, -1.0, +1.0, 0.0, 0.0, 1.0, Math.random() * 16 + 4.0,
            -1.0, +1.0, -1.0, 0.0, 1.0, 0.0, Math.random() * 16 + 4.0,
            -1.0, +1.0, +1.0, 0.0, 1.0, 1.0, Math.random() * 16 + 4.0,
            +1.0, -1.0, -1.0, 1.0, 0.0, 0.0, Math.random() * 16 + 4.0,
            +1.0, -1.0, +1.0, 1.0, 0.0, 1.0, Math.random() * 16 + 4.0,
            +1.0, +1.0, -1.0, 1.0, 1.0, 0.0, Math.random() * 16 + 4.0,
            +1.0, +1.0, +1.0, 1.0, 1.0, 1.0, Math.random() * 16 + 4.0,
        ]);
        this._pointsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._pointsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._points, gl.STATIC_DRAW);
        // setup point shaders
        const pointsVert = new webgl_operate_1.Shader(this._context, gl.VERTEX_SHADER, 'points.vert');
        pointsVert.initialize(require('./data/points.vert'));
        const pointsFrag = new webgl_operate_1.Shader(this._context, gl.FRAGMENT_SHADER, 'points.frag');
        pointsFrag.initialize(require('./data/points.frag'));
        this._pointsProgram = new webgl_operate_1.Program(this._context, "PointsProgram");
        this._pointsProgram.initialize([pointsVert, pointsFrag], false);
        this._pointsProgram.link();
        this._pointsProgram.bind();
        this._pointsProgram.attribute('a_vertex', 0);
        this._pointsProgram.attribute('a_color', 1);
        this._pointsProgram.attribute('a_size', 2);
        // lines
        // lines data
        // @TODO: do not hard code this
        this._lines = new Float32Array([
            -2.0, -1.1, -1.1, 1.0, 0.0, 1.0,
            +2.0, -1.1, -1.1, 1.0, 0.0, 1.0,
            -1.1, -2.0, -1.1, 1.0, 1.0, 0.0,
            -1.1, +2.0, -1.1, 1.0, 1.0, 0.0,
            -1.1, -1.1, -2.0, 0.0, 1.0, 1.0,
            -1.1, -1.1, +2.0, 0.0, 1.0, 1.0,
        ]);
        this._linesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._linesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._lines, gl.STATIC_DRAW);
        // setup line shaders
        const linesVert = new webgl_operate_1.Shader(this._context, gl.VERTEX_SHADER, 'lines.vert');
        linesVert.initialize(require('./data/lines.vert'));
        const linesFrag = new webgl_operate_1.Shader(this._context, gl.FRAGMENT_SHADER, 'lines.frag');
        linesFrag.initialize(require('./data/lines.frag'));
        this._linesProgram = new webgl_operate_1.Program(this._context, "LinesProgram");
        this._linesProgram.initialize([linesVert, linesFrag], false);
        this._linesProgram.link();
        this._linesProgram.bind();
        this._linesProgram.attribute('a_vertex', 0);
        this._linesProgram.attribute('a_color', 1);
        /* Create and configure camera / navigation. */
        this._camera = new webgl_operate_1.Camera();
        this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
        this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.eye = gl_matrix_1.vec3.fromValues(0.0, 0.0, 4.0);
        this._camera.near = 0.1;
        this._camera.far = 16.0;
        this._navigation = new webgl_operate_1.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        /* Create and configure label pass. */
        this._labelPass = new webgl_operate_1.LabelRenderPass(context);
        this._labelPass.initialize();
        this._labelPass.camera = this._camera;
        this._labelPass.target = this._defaultFBO;
        this._labelPass.depthMask = true;
        // setup labels after font successfully loaded
        webgl_operate_1.FontFace.fromFile('./data/opensans2048p160d16.fnt', context)
            .then((fontFace) => {
            this.setupLabels();
            for (const label of this._labelPass.labels) {
                label.fontFace = fontFace;
            }
            this._fontFace = fontFace;
            this.finishLoading();
            this.invalidate(true);
        })
            .catch((reason) => webgl_operate_1.auxiliaries.log(webgl_operate_1.auxiliaries.LogLevel.Error, reason));
        return true;
    }
    onUninitialize() {
        const gl = this._context.gl;
        super.uninitialize();
        this._defaultFBO.uninitialize();
        gl.deleteBuffer(this._pointsBuffer);
        this._pointsProgram.uninitialize();
        gl.deleteBuffer(this._linesBuffer);
        this._linesProgram.uninitialize();
        this._labelPass.uninitialize();
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
        this._altered.alter('frameSize');
        this._altered.alter('multiFrameNumber');
    }
    // @TODO understand if more update checks are needed
    onUpdate() {
        this._navigation.update();
        for (const label of this._labelPass.labels) {
            if (label.altered || label.color.altered) {
                return true;
            }
        }
        return this._altered.any || this._camera.altered;
    }
    onPrepare() {
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
            this._camera.viewport = this._canvasSize;
        }
        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
        }
        this._labelPass.update();
        this._altered.reset();
        this._camera.altered = false;
    }
    onFrame(frameNumber) {
        const gl = this._context.gl;
        this._defaultFBO.bind();
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        gl.enable(gl.DEPTH_TEST);
        // render points
        this._pointsProgram.bind();
        gl.uniformMatrix4fv(this._pointsProgram.uniform('u_viewProjection'), gl.GL_FALSE, this._camera.viewProjection);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._pointsBuffer);
        // refer to https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer for more information
        gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 7 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, gl.FALSE, 7 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.vertexAttribPointer(2, 1, gl.FLOAT, gl.FALSE, 7 * Float32Array.BYTES_PER_ELEMENT, 6 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.enableVertexAttribArray(2);
        gl.drawArrays(gl.POINTS, 0, this._points.length / 7);
        gl.bindBuffer(gl.ARRAY_BUFFER, webgl_operate_1.Buffer.DEFAULT_BUFFER);
        gl.disableVertexAttribArray(0);
        gl.disableVertexAttribArray(1);
        gl.disableVertexAttribArray(2);
        this._pointsProgram.unbind();
        // render lines
        this._linesProgram.bind();
        gl.uniformMatrix4fv(this._linesProgram.uniform('u_viewProjection'), gl.GL_FALSE, this._camera.viewProjection);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._linesBuffer);
        // refer to https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer for more information
        gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.drawArrays(gl.LINES, 0, this._lines.length / 6);
        gl.bindBuffer(gl.ARRAY_BUFFER, webgl_operate_1.Buffer.DEFAULT_BUFFER);
        gl.disableVertexAttribArray(0);
        gl.disableVertexAttribArray(1);
        this._linesProgram.unbind();
        // render labels
        // @TODO dynamic updates needed?
        this._labelPass.update();
        this._labelPass.frame();
        this._labelPass.unbind();
    }
    setupLabels() {
        var labels = new Array(3);
        labels[0] = new webgl_operate_1.Position3DLabel(new webgl_operate_1.Text('Scatterplot'), webgl_operate_1.Label.Type.Static);
        labels[0].lineAnchor = webgl_operate_1.Label.LineAnchor.Bottom;
        labels[0].alignment = webgl_operate_1.Label.Alignment.Center;
        labels[0].position = [0.0, 0.0, 0.0];
        labels[0].direction = [1.0, 1.0, -1.0];
        labels[0].up = [-1.5, 0.5, -1.0];
        labels[0].fontSize = 0.3;
        labels[0].fontSizeUnit = webgl_operate_1.Label.Unit.World;
        labels[0].color.fromHex('#ffffff');
        labels[1] = new webgl_operate_1.Position3DLabel(new webgl_operate_1.Text('3D'), webgl_operate_1.Label.Type.Static);
        labels[1].lineAnchor = webgl_operate_1.Label.LineAnchor.Top;
        labels[1].alignment = webgl_operate_1.Label.Alignment.Center;
        labels[1].position = [-0.1, 0.2, 0.0];
        labels[1].direction = [1.0, 1.0, -1.0];
        labels[1].up = [-0.5, 1.5, +1.0];
        labels[1].fontSize = 1.2;
        labels[1].fontSizeUnit = webgl_operate_1.Label.Unit.World;
        labels[1].color.fromHex('#888888');
        labels[2] = new webgl_operate_1.Position3DLabel(new webgl_operate_1.Text('Probably the x-Axis'), webgl_operate_1.Label.Type.Static);
        labels[2].lineAnchor = webgl_operate_1.Label.LineAnchor.Bottom;
        labels[2].alignment = webgl_operate_1.Label.Alignment.Center;
        labels[2].position = [0.0, -1.1, -1.1];
        labels[2].up = [0.0, 0.0, -1.0];
        labels[2].direction = [1.0, 0.0, 0.0];
        labels[2].fontSize = 0.2;
        labels[2].fontSizeUnit = webgl_operate_1.Label.Unit.World;
        labels[2].color.fromHex('#ff00ff');
        labels[3] = new webgl_operate_1.Projected3DLabel(new webgl_operate_1.Text('   Point'), webgl_operate_1.Label.Type.Dynamic);
        labels[3].lineAnchor = webgl_operate_1.Label.LineAnchor.Bottom;
        labels[3].alignment = webgl_operate_1.Label.Alignment.Left;
        labels[3].position = [-1.0, +1.0, +1.0];
        labels[3].fontSize = 16.0;
        labels[3].fontSizeUnit = webgl_operate_1.Label.Unit.Mixed;
        labels[3].color.fromHex('#00ffff');
        this._labelPass.labels = labels;
        this._labelPass.update();
        this._labels = labels;
    }
}
class VectorExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_1.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_1.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new VectorRenderer();
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
exports.VectorExample = VectorExample;
//# sourceMappingURL=vector-example.js.map