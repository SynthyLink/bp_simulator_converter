"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSceneExample = void 0;
const webgl_operate_1 = require("webgl-operate");
const gl_matrix_1 = require("gl-matrix"); // correct imports?
const example_1 = require("./example");
class DefaultSceneRenderer extends webgl_operate_1.Renderer {
    // @TODO replace cuboid with scene?
    // @TODO gizmo?
    // - SCENE -
    // internal
    _cuboid;
    _texture;
    // - FRUSTUM -
    // internal
    _frustumData;
    _frustumBuffer;
    _frustumProgram;
    // settings
    _renderFrustumToFar = true;
    _frustumNearColor = gl_matrix_1.vec3.fromValues(1.0, 1.0, 1.0);
    _frustumFarColor = gl_matrix_1.vec3.fromValues(0.5, 0.5, 0.5);
    // - FRUSTUM-LABELS -
    // internal
    _fontFace;
    _labelPass;
    _labels;
    // - FRUSTUM-TEXTURE -
    // internal
    // @TODO change from blitting to texture on near plane
    _blit;
    _zoomSrcBounds;
    _zoomDstBounds;
    // - CLIPPING -
    // internal
    _uEnableClipping;
    _uObservedTransform;
    // settings
    _enableClipping = true;
    _observedTransform;
    // - OBSERVED CAMERA -
    // internal
    _observedCamera;
    _observedDepthBuffer;
    _observedColorRender;
    _observedFramebuffer;
    // settings
    _observedEye = gl_matrix_1.vec3.fromValues(0.0, 0.0, 5.0);
    _observedCenter = gl_matrix_1.vec3.fromValues(0, 0, 0);
    _observedUp = gl_matrix_1.vec3.fromValues(0, 1, 0);
    _observedNear = 1;
    _observedFar = 5;
    // - ACTUAL CAMERA -
    // internal
    _defaultFBO;
    _camera;
    _navigation;
    _program;
    _uViewProjection;
    onInitialize(context, callback, eventProvider) {
        const gl = context.gl;
        const gl2facade = this._context.gl2facade;
        // init the default final buffer
        this._defaultFBO = new webgl_operate_1.DefaultFramebuffer(context, 'DefaultFBO');
        this._defaultFBO.initialize();
        // - OBSERVED CAMERA -
        // init camera object
        this._observedCamera = new webgl_operate_1.Camera(this._observedEye, this._observedCenter, this._observedUp);
        this._observedCamera.near = this._observedNear;
        this._observedCamera.far = this._observedFar;
        // init observed color render
        // we to copy the internal format to out target texture
        const internalFormatAndType = webgl_operate_1.Wizard.queryInternalTextureFormat(this._context, gl.RGBA, webgl_operate_1.Wizard.Precision.half);
        this._observedColorRender = new webgl_operate_1.Texture2D(this._context, 'ObservedColorRender');
        this._observedColorRender.initialize(1, 1, internalFormatAndType[0], gl.RGBA, internalFormatAndType[1]);
        this._observedColorRender.filter(gl.LINEAR, gl.LINEAR);
        // init observed depth buffer for z test
        this._observedDepthBuffer = new webgl_operate_1.Renderbuffer(this._context, 'ObservedDepthBuffer');
        this._observedDepthBuffer.initialize(1, 1, gl.DEPTH_COMPONENT16);
        // init combined observed framebuffer based off the two
        this._observedFramebuffer = new webgl_operate_1.Framebuffer(this._context, 'ObservedFramebuffer');
        this._observedFramebuffer.initialize([
            [gl2facade.COLOR_ATTACHMENT0, this._observedColorRender],
            [gl.DEPTH_ATTACHMENT, this._observedDepthBuffer]
        ]);
        // - SCENE -
        // init cuboid
        this._cuboid = new webgl_operate_1.CuboidGeometry(context, 'Cuboid', true, [2.0, 2.0, 2.0]);
        this._cuboid.initialize();
        // init cuboid shaders
        const vert = new webgl_operate_1.Shader(context, gl.VERTEX_SHADER, 'mesh-clipping.vert');
        vert.initialize(require('./data/defaultsceneexample/mesh-clipping.vert'));
        const frag = new webgl_operate_1.Shader(context, gl.FRAGMENT_SHADER, 'mesh-clipping.frag');
        frag.initialize(require('./data/defaultsceneexample/mesh-clipping.frag'));
        // init cuboid program
        this._program = new webgl_operate_1.Program(context, 'CubeProgram');
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_vertex', this._cuboid.vertexLocation);
        this._program.attribute('a_texCoord', this._cuboid.uvCoordLocation);
        this._program.link();
        this._program.bind();
        this._uViewProjection = this._program.uniform('u_viewProjection');
        this._uObservedTransform = this._program.uniform('u_observedTransform');
        this._uEnableClipping = this._program.uniform('u_enableClipping');
        // @scene
        const identity = gl_matrix_1.mat4.identity(gl_matrix_1.mat4.create());
        gl.uniformMatrix4fv(this._program.uniform('u_model'), false, identity);
        gl.uniform1i(this._program.uniform('u_texture'), 0);
        gl.uniform1i(this._program.uniform('u_textured'), false);
        this._texture = new webgl_operate_1.Texture2D(context, 'Texture');
        this._texture.initialize(1, 1, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE);
        this._texture.wrap(gl.REPEAT, gl.REPEAT);
        this._texture.filter(gl.LINEAR, gl.LINEAR_MIPMAP_LINEAR);
        this._texture.maxAnisotropy(webgl_operate_1.Texture2D.MAX_ANISOTROPY);
        this._texture.fetch('/examples/data/blue-painted-planks-diff-1k-modified.webp').then(() => {
            const gl = context.gl;
            this._program.bind();
            gl.uniform1i(this._program.uniform('u_textured'), true);
            this.finishLoading();
            this.invalidate(true);
        });
        // @scene blit buffer
        this._blit = new webgl_operate_1.BlitPass(this._context);
        this._blit.initialize();
        // - ACTUAL CAMERA -
        // init actual camera
        this._camera = new webgl_operate_1.Camera();
        this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
        this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.eye = gl_matrix_1.vec3.fromValues(0.0, 0.0, 5.0);
        this._camera.near = 0.5;
        this._camera.far = 100.0;
        // init navigation for actual camera
        this._navigation = new webgl_operate_1.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        this._labelPass = new webgl_operate_1.LabelRenderPass(context);
        this._labelPass.initialize();
        this.updateObservedFrustum(this._observedCamera);
        this._frustumBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._frustumBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._frustumData, gl.STATIC_DRAW);
        const frustumVert = new webgl_operate_1.Shader(this._context, gl.VERTEX_SHADER, 'lines.vert');
        frustumVert.initialize(require('./data/lines.vert'));
        const frustumFrag = new webgl_operate_1.Shader(this._context, gl.FRAGMENT_SHADER, 'lines.frag');
        frustumFrag.initialize(require('./data/lines.frag'));
        this._frustumProgram = new webgl_operate_1.Program(this._context, "FrustumLinesProgram");
        this._frustumProgram.initialize([frustumVert, frustumFrag], false);
        this._frustumProgram.link();
        this._frustumProgram.bind();
        this._frustumProgram.attribute('a_vertex', 0);
        this._frustumProgram.attribute('a_color', 1);
        this._labelPass.camera = this._camera;
        this._labelPass.target = this._defaultFBO;
        this._labelPass.depthMask = false;
        // - FRUSTUM -
        // @TODO create frustum thingies
        webgl_operate_1.FontFace.fromFile('./data/opensans2048p160d16.fnt', context)
            .then((fontFace) => {
            this.setupLabels();
            this.updateObservedFrustum(this._observedCamera);
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
        super.uninitialize();
        // @scene
        this._cuboid.uninitialize();
        this._program.uninitialize();
        this._context.gl.deleteBuffer(this._frustumBuffer);
        this._frustumProgram.uninitialize();
        this._labelPass.uninitialize();
        this._defaultFBO.uninitialize();
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
        this._altered.alter('frameSize');
        this._altered.alter('multiFrameNumber');
    }
    onUpdate() {
        this._navigation.update();
        return this._altered.any || this._camera.altered;
    }
    onPrepare() {
        if (this._altered.frameSize) {
            this._observedFramebuffer.resize(this._frameSize[0], this._frameSize[1]);
            this._observedCamera.viewport = this._canvasSize;
            this._camera.viewport = this._canvasSize;
            this._zoomSrcBounds = gl_matrix_1.vec4.fromValues(0, 0, this._frameSize[0], this._frameSize[1]);
        }
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
            this._observedCamera.aspect = this._canvasSize[0] / this._canvasSize[1];
            this._camera.viewport = this._canvasSize;
            this._observedCamera.viewport = this._canvasSize;
            this._zoomDstBounds = gl_matrix_1.vec4.fromValues(this._canvasSize[0] * (1.0 - 0.2 * this._camera.aspect), this._canvasSize[1] * (1.0 - 0.2 * this._camera.aspect), this._canvasSize[0] * (1.0 - 0.008 * this._camera.aspect), this._canvasSize[1] * (1.0 - 0.008 * this._camera.aspect));
        }
        if (this._altered.clearColor) {
            this._observedFramebuffer.clearColor(this._clearColor);
            this._defaultFBO.clearColor(this._clearColor);
        }
        //this._labelPass.update();
        this._altered.reset();
        this._camera.altered = false;
        this._observedCamera.altered = false;
    }
    onFrame(frameNumber) {
        this.observedFrame();
        this.actualFrame();
    }
    observedFrame() {
        const gl = this._context.gl;
        this._observedFramebuffer.bind();
        this._observedFramebuffer.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, false, false);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        gl.disable(gl.CULL_FACE);
        // gl.cullFace(gl.BACK);
        gl.enable(gl.DEPTH_TEST);
        this._texture.bind(gl.TEXTURE0);
        this._program.bind();
        gl.uniformMatrix4fv(this._uViewProjection, false, this._observedCamera.viewProjection);
        this._cuboid.bind();
        this._cuboid.draw();
        this._cuboid.unbind();
        this._program.unbind();
        this._texture.unbind(gl.TEXTURE0);
        gl.cullFace(gl.BACK);
        gl.disable(gl.CULL_FACE);
        this._observedFramebuffer.unbind();
    }
    actualFrame() {
        const gl = this._context.gl;
        // We want to render into the actual FBO now
        this._defaultFBO.bind();
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, false, false);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.enable(gl.DEPTH_TEST);
        this._texture.bind(gl.TEXTURE0);
        this._program.bind();
        gl.uniformMatrix4fv(this._uViewProjection, false, this._camera.viewProjection);
        gl.uniformMatrix4fv(this._uObservedTransform, false, this._observedCamera.viewProjection);
        gl.uniform1i(this._uEnableClipping, +this._enableClipping);
        this._cuboid.bind();
        this._cuboid.draw();
        this._cuboid.unbind();
        this._program.unbind();
        this._texture.unbind(gl.TEXTURE0);
        this._frustumProgram.bind();
        gl.uniformMatrix4fv(this._frustumProgram.uniform('u_viewProjection'), gl.GL_FALSE, this._camera.viewProjection);
        this.updateObservedFrustum(this._observedCamera);
        this._frustumBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._frustumBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._frustumData, gl.STATIC_DRAW);
        // refer to https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer for more information
        gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.drawArrays(gl.LINES, 0, this._frustumData.length / 6);
        gl.bindBuffer(gl.ARRAY_BUFFER, webgl_operate_1.Buffer.DEFAULT_BUFFER);
        gl.disableVertexAttribArray(0);
        gl.disableVertexAttribArray(1);
        this._frustumProgram.unbind();
        gl.cullFace(gl.BACK);
        gl.disable(gl.CULL_FACE);
        // this._labelPass.update();
        // this._labelPass.frame();
        // this._labelPass.unbind();
    }
    onSwap() {
        this._blit.framebuffer = this._observedFramebuffer;
        this._blit.readBuffer = this._context.gl2facade.COLOR_ATTACHMENT0;
        this._blit.target = this._defaultFBO;
        this._blit.drawBuffer = this._context.gl.BACK;
        this._blit.srcBounds = this._zoomSrcBounds;
        this._blit.dstBounds = this._zoomDstBounds;
        this._blit.frame();
    }
    vertFovToHorFov(fov, aspect) {
        return 2 * Math.atan(Math.tan(fov / 2) * aspect);
    }
    calculateSideAndRUp(dir, up) {
        const side = gl_matrix_1.vec3.cross(gl_matrix_1.vec3.create(), dir, up);
        gl_matrix_1.vec3.normalize(side, side);
        const rUp = gl_matrix_1.vec3.cross(gl_matrix_1.vec3.create(), side, dir);
        gl_matrix_1.vec3.normalize(rUp, rUp);
        return { side, rUp };
    }
    buildCorner(out, eye, dir, up, upFac, side, sideFac) {
        gl_matrix_1.vec3.add(out, out, eye);
        gl_matrix_1.vec3.add(out, out, dir);
        gl_matrix_1.vec3.scaleAndAdd(out, out, up, upFac);
        return gl_matrix_1.vec3.scaleAndAdd(out, out, side, sideFac);
    }
    updateObservedFrustum(_camera) {
        const eye = _camera.eye;
        const near = _camera.near;
        const far = _camera.far;
        const dir = gl_matrix_1.vec3.sub(gl_matrix_1.vec3.create(), _camera.center, eye);
        gl_matrix_1.vec3.normalize(dir, dir);
        const up = _camera.up;
        const fovY = _camera.fovy * Math.PI / 180;
        const hFovY = fovY / 2;
        const tHFovY = Math.tan(hFovY);
        const hFovX = this.vertFovToHorFov(fovY, _camera.aspect) / 2;
        const tHFovX = Math.tan(hFovX);
        // calculate a new up vector that is actually perpendicular to dir
        const { side, rUp } = this.calculateSideAndRUp(dir, up);
        const nHalfWidth = tHFovX * near;
        const nHalfHeight = tHFovY * near;
        const nSide = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), side, nHalfWidth);
        const nUp = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), rUp, nHalfHeight);
        const nDir = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), dir, near);
        const fHalfWidth = tHFovX * far;
        const fHalfHeight = tHFovY * far;
        const fSide = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), side, fHalfWidth);
        const fUp = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), rUp, fHalfHeight);
        const fDir = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), dir, far);
        const nnn = this.buildCorner(gl_matrix_1.vec3.create(), eye, nDir, nUp, -1, nSide, -1);
        const npn = this.buildCorner(gl_matrix_1.vec3.create(), eye, nDir, nUp, -1, nSide, +1);
        const pnn = this.buildCorner(gl_matrix_1.vec3.create(), eye, nDir, nUp, +1, nSide, -1);
        const ppn = this.buildCorner(gl_matrix_1.vec3.create(), eye, nDir, nUp, +1, nSide, +1);
        const nnf = this.buildCorner(gl_matrix_1.vec3.create(), eye, fDir, fUp, -1, fSide, -1);
        const npf = this.buildCorner(gl_matrix_1.vec3.create(), eye, fDir, fUp, -1, fSide, +1);
        const pnf = this.buildCorner(gl_matrix_1.vec3.create(), eye, fDir, fUp, +1, fSide, -1);
        const ppf = this.buildCorner(gl_matrix_1.vec3.create(), eye, fDir, fUp, +1, fSide, +1);
        // build lines
        const numLines = (this._renderFrustumToFar) ? 19 : 11;
        const verticesPerLine = 2;
        const componentsPerVertex = 3;
        const colorComponentsPerVertex = 3;
        const vertices = new Float32Array(numLines * verticesPerLine * (componentsPerVertex + colorComponentsPerVertex));
        let offset = 0;
        const nearColor = this._frustumNearColor;
        const farColor = this._frustumFarColor;
        // near plane
        vertices.set(nnn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(npn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(npn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(ppn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(ppn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(pnn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(pnn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(nnn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        // cam to near plane
        vertices.set(_camera.eye, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(nnn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(_camera.eye, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(npn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(_camera.eye, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(ppn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(_camera.eye, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(pnn, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        // blender-like up indicator
        const upTriangle1 = this.buildCorner(gl_matrix_1.vec3.create(), eye, nDir, nUp, +1.1, nSide, +0.5);
        const upTriangle2 = this.buildCorner(gl_matrix_1.vec3.create(), eye, nDir, nUp, +1.1, nSide, -0.5);
        const upTriangleTop = this.buildCorner(gl_matrix_1.vec3.create(), eye, nDir, nUp, +1.4, nSide, 0);
        vertices.set(upTriangle1, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(upTriangle2, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(upTriangle1, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(upTriangleTop, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(upTriangle2, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        vertices.set(upTriangleTop, offset++ * 3);
        vertices.set(nearColor, offset++ * 3);
        // far plane
        if (this._renderFrustumToFar) {
            // far plane itself
            vertices.set(nnf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(npf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(npf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(ppf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(ppf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(pnf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(pnf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(nnf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            // near -> far connections
            vertices.set(nnn, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(nnf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(npn, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(npf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(pnn, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(pnf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(ppn, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
            vertices.set(ppf, offset++ * 3);
            vertices.set(farColor, offset++ * 3);
        }
        // const nearPoint = this.buildCorner(vec3.create(), eye, nDir, nUp, 0, nSide, +1);
        // const farPoint = this.buildCorner(vec3.create(), eye, fDir, fUp, 0, fSide, +1);
        // const upTriangleBottom = this.buildCorner(vec3.create(), eye, nDir, nUp, +1.1, nSide, 0);
        // const upTriangleSize = vec3.distance(upTriangleBottom, upTriangleTop) * 0.5;
        // this.updateLabels(); //dir, up, eye, nearPoint, farPoint, nHalfHeight, upTriangleBottom, upTriangleSize);
        this._frustumData = vertices;
    }
    setupLabels() {
        const worldFontSize = 0.3;
        const l0 = new webgl_operate_1.Position3DLabel(new webgl_operate_1.Text('Near-Clipping-Plane'), webgl_operate_1.Label.Type.Dynamic);
        l0.lineAnchor = webgl_operate_1.Label.LineAnchor.Center;
        l0.alignment = webgl_operate_1.Label.Alignment.Left;
        l0.position = [0.0, 0.0, 0.0];
        l0.direction = [1.0, 0.0, 0.0];
        l0.up = [0.0, 1.0, 0.0];
        l0.fontSize = worldFontSize;
        l0.fontSizeUnit = webgl_operate_1.Label.Unit.World;
        l0.color.fromHex('#ffffff');
        const l1 = new webgl_operate_1.Position3DLabel(new webgl_operate_1.Text('Far-Clipping-Plane'), webgl_operate_1.Label.Type.Dynamic);
        l1.lineAnchor = webgl_operate_1.Label.LineAnchor.Center;
        l1.alignment = webgl_operate_1.Label.Alignment.Left;
        l1.position = [0.0, 0.0, 0.0];
        l1.direction = [1.0, 0.0, 0.0];
        l1.up = [0.0, 1.0, 0.0];
        l1.fontSize = worldFontSize;
        l1.fontSizeUnit = webgl_operate_1.Label.Unit.World;
        l1.color.fromHex('#ffffff');
        const l2 = new webgl_operate_1.Position3DLabel(new webgl_operate_1.Text('Up'), webgl_operate_1.Label.Type.Dynamic);
        l2.lineAnchor = webgl_operate_1.Label.LineAnchor.Bottom;
        l2.alignment = webgl_operate_1.Label.Alignment.Center;
        l2.position = [0.0, 0.0, 0.0];
        l2.direction = [1.0, 0.0, 0.0];
        l2.up = [0.0, 1.0, 0.0];
        l2.fontSize = worldFontSize;
        l2.fontSizeUnit = webgl_operate_1.Label.Unit.World;
        l2.color.fromHex('#ffffff');
        const l3 = new webgl_operate_1.Projected3DLabel(new webgl_operate_1.Text('Eye'), webgl_operate_1.Label.Type.Dynamic);
        l3.lineAnchor = webgl_operate_1.Label.LineAnchor.Center;
        l3.alignment = webgl_operate_1.Label.Alignment.Left;
        l3.position = [0.0, 0.0, 0.0];
        l3.fontSize = 16.0;
        l3.fontSizeUnit = webgl_operate_1.Label.Unit.Mixed;
        l3.color.fromHex('#ffffff');
        this._labels = new Array();
        this._labels[0] = l0;
        this._labels[1] = l1;
        this._labels[2] = l2;
        this._labels[3] = l3;
        this._labelPass.labels = this._labels;
        this._labelPass.update();
    }
    updateLabels() {
        if (this._labels === undefined) {
            return;
        }
        // const camera = this._observedCamera;
        // const look = vec3.sub(vec3.create(), camera.eye, camera.center);
        // vec3.normalize(look, look);
        // // Up
        // const l2 = this._labels[2] as Position3DLabel;
        // l2.position = camera.eye;
        // l2.up = camera.up;
        // vec3.cross(l2.direction, camera.up, look);
        // // l0.direction = lookAt;
        // // l0.up = up;
        // const l1 = this._labels[1] as Position3DLabel;
        // vec3.copy(l1.position, farPoint);
        // // l1.position = farPoint;
        // // l1.direction = lookAt;
        // // l1.up = up;
        // const l2 = this._labels[2] as Position3DLabel;
        // vec3.copy(l2.position, upTriangleBottom);
        // // l2.position = upTriangleBottom;
        // // l2.direction = lookAt;
        // // l2.up = up;
        // const l3 = this._labels[3] as Projected3DLabel;
        // vec3.copy(l3.position, eye);
        // // l3.position = eye;
        this._labelPass.update();
    }
}
class DefaultSceneExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_1.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_1.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new DefaultSceneRenderer();
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
exports.DefaultSceneExample = DefaultSceneExample;
//# sourceMappingURL=default-scene-example.js.map