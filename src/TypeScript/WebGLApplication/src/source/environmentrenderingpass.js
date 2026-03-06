"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentTextureType = exports.EnvironmentRenderingPass = void 0;
const auxiliaries_1 = require("./auxiliaries");
const camera_1 = require("./camera");
const context_1 = require("./context");
const initializable_1 = require("./initializable");
const ndcfillingtriangle_1 = require("./ndcfillingtriangle");
const program_1 = require("./program");
const shader_1 = require("./shader");
const texture2d_1 = require("./texture2d");
const texturecube_1 = require("./texturecube");
/**
 * This pass renders an environment from a texture in a single screen-space pass.
 */
class EnvironmentRenderingPass extends initializable_1.Initializable {
    /**
     * Context, used to get context information and WebGL API access.
     */
    _context;
    _environmentTexture;
    _environmentTexture2;
    _envTextureType;
    _camera;
    _cubeMapProgram;
    _equiMapProgram;
    _sphereMapProgram;
    _polarMapProgram;
    _uSkipLod;
    _ndcTriangle;
    _skipCubeLod = false;
    _altered = true;
    constructor(context) {
        super();
        this._context = context;
        this._cubeMapProgram = new program_1.Program(context, 'CubemapEnvironmentProgram');
        this._equiMapProgram = new program_1.Program(context, 'EquimapEnvironmentProgram');
        this._polarMapProgram = new program_1.Program(context, 'PolarmapEnvironmentProgram');
        this._sphereMapProgram = new program_1.Program(context, 'SpheremapEnvironmentProgram');
        this._ndcTriangle = new ndcfillingtriangle_1.NdcFillingTriangle(this._context, 'EnvironmentNdcTriangle');
    }
    @initializable_1.Initializable.initialize()
    initialize() {
        const gl = this._context.gl;
        this._ndcTriangle.initialize();
        /**
         * Compile a program for each projection type.
         */
        const vert = new shader_1.Shader(this._context, gl.VERTEX_SHADER, 'env-projections.vert');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        vert.initialize(require(`./shaders/env-projections.vert`));
        // Cube map program
        const cubemapFrag = new shader_1.Shader(this._context, gl.FRAGMENT_SHADER, 'env-projections.frag');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        cubemapFrag.initialize(require(`./shaders/env-projections.frag`), false);
        cubemapFrag.replace('PROJECTION_TYPE', 'CUBE_MAP');
        cubemapFrag.compile();
        this._cubeMapProgram.initialize([vert, cubemapFrag], false);
        this._cubeMapProgram.attribute('a_vertex', this._ndcTriangle.vertexLocation);
        this._cubeMapProgram.link();
        this._cubeMapProgram.bind();
        gl.uniform1i(this._cubeMapProgram.uniform('u_cubemap'), 0);
        this._uSkipLod = this._cubeMapProgram.uniform('u_skipLod');
        this._cubeMapProgram.unbind();
        // Equi map program
        const equimapFrag = new shader_1.Shader(this._context, gl.FRAGMENT_SHADER, 'env-projections.frag');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        equimapFrag.initialize(require(`./shaders/env-projections.frag`), false);
        equimapFrag.replace('PROJECTION_TYPE', 'EQUI_MAP');
        equimapFrag.compile();
        this._equiMapProgram.initialize([vert, equimapFrag], false);
        this._equiMapProgram.attribute('a_vertex', this._ndcTriangle.vertexLocation);
        this._equiMapProgram.link();
        this._equiMapProgram.bind();
        gl.uniform1i(this._equiMapProgram.uniform('u_equirectmap'), 0);
        this._equiMapProgram.unbind();
        // Sphere map program
        const spheremapFrag = new shader_1.Shader(this._context, gl.FRAGMENT_SHADER, 'env-projections.frag');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        spheremapFrag.initialize(require(`./shaders/env-projections.frag`), false);
        spheremapFrag.replace('PROJECTION_TYPE', 'SPHERE_MAP');
        spheremapFrag.compile();
        this._sphereMapProgram.initialize([vert, spheremapFrag], false);
        this._sphereMapProgram.attribute('a_vertex', this._ndcTriangle.vertexLocation);
        this._sphereMapProgram.link();
        this._sphereMapProgram.bind();
        gl.uniform1i(this._sphereMapProgram.uniform('u_spheremap'), 0);
        this._sphereMapProgram.unbind();
        // Polar map program
        const polarmapFrag = new shader_1.Shader(this._context, gl.FRAGMENT_SHADER, 'env-projections.frag');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        polarmapFrag.initialize(require(`./shaders/env-projections.frag`), false);
        polarmapFrag.replace('PROJECTION_TYPE', 'POLAR_MAP');
        polarmapFrag.compile();
        this._polarMapProgram.initialize([vert, polarmapFrag], false);
        this._polarMapProgram.attribute('a_vertex', this._ndcTriangle.vertexLocation);
        this._polarMapProgram.link();
        this._polarMapProgram.bind();
        gl.uniform1iv(this._polarMapProgram.uniform('u_polarmap'), [0, 1]);
        this._polarMapProgram.unbind();
        return true;
    }
    @initializable_1.Initializable.uninitialize()
    uninitialize() {
        this._cubeMapProgram.uninitialize();
        this._equiMapProgram.uninitialize();
        this._sphereMapProgram.uninitialize();
        this._polarMapProgram.uninitialize();
    }
    update() {
        if (this._altered === false) {
            return;
        }
        const gl = this._context.gl;
        this._cubeMapProgram.bind();
        gl.uniform1i(this._uSkipLod, this._skipCubeLod);
        this._altered = false;
    }
    frame() {
        const gl = this._context.gl;
        (0, auxiliaries_1.assert)(this._camera !== undefined, `Camera is undefined in environment rendering pass.`);
        (0, auxiliaries_1.assert)(this._environmentTexture !== undefined, `Environment texture is undefined in environment rendering pass.`);
        let program = this._cubeMapProgram;
        if (this._envTextureType === EnvironmentTextureType.EquirectangularMap) {
            (0, auxiliaries_1.assert)(this._environmentTexture instanceof texture2d_1.Texture2D, `Input texture expected to be Texture2D for equirectangular mapping.`);
            this._environmentTexture.bind(gl.TEXTURE0);
            program = this._equiMapProgram;
        }
        else if (this._envTextureType === EnvironmentTextureType.SphereMap) {
            (0, auxiliaries_1.assert)(this._environmentTexture instanceof texture2d_1.Texture2D, `Input texture expected to be Texture2D for sphere mapping.`);
            this._environmentTexture.bind(gl.TEXTURE0);
            program = this._sphereMapProgram;
        }
        else if (this._envTextureType === EnvironmentTextureType.CubeMap) {
            (0, auxiliaries_1.assert)(this._environmentTexture instanceof texturecube_1.TextureCube, `Input texture expected to be a TextureCube for cube mapping.`);
            this._environmentTexture.bind(gl.TEXTURE0);
            program = this._cubeMapProgram;
        }
        else if (this._envTextureType === EnvironmentTextureType.PolarMap) {
            (0, auxiliaries_1.assert)(this._environmentTexture2 !== undefined, `Two input textures expected for polar mapping.`);
            (0, auxiliaries_1.assert)(this._environmentTexture instanceof texture2d_1.Texture2D, `Input texture expected to be a Texture2D for polar mapping.`);
            (0, auxiliaries_1.assert)(this._environmentTexture2 instanceof texture2d_1.Texture2D, `Input texture expected to be a Texture2D for polar mapping.`);
            this._environmentTexture.bind(gl.TEXTURE0);
            this._environmentTexture2.bind(gl.TEXTURE1);
            program = this._polarMapProgram;
        }
        program.bind();
        gl.uniformMatrix4fv(program.uniform('u_viewProjectionInverse'), false, this._camera.viewProjectionInverse);
        this._ndcTriangle.bind();
        this._ndcTriangle.draw();
        program.unbind();
    }
    set environmentTextureType(type) {
        this._envTextureType = type;
    }
    set environmentTexture(texture) {
        this._environmentTexture = texture;
    }
    set environmentTexture2(texture) {
        this._environmentTexture2 = texture;
    }
    set camera(camera) {
        this._camera = camera;
    }
    set skipCubeLod(skip) {
        if (this._skipCubeLod === skip) {
            return;
        }
        this._skipCubeLod = skip;
        this._altered = true;
    }
}
exports.EnvironmentRenderingPass = EnvironmentRenderingPass;
var EnvironmentTextureType;
(function (EnvironmentTextureType) {
    EnvironmentTextureType[EnvironmentTextureType["CubeMap"] = 0] = "CubeMap";
    EnvironmentTextureType[EnvironmentTextureType["EquirectangularMap"] = 1] = "EquirectangularMap";
    EnvironmentTextureType[EnvironmentTextureType["SphereMap"] = 2] = "SphereMap";
    EnvironmentTextureType[EnvironmentTextureType["PolarMap"] = 3] = "PolarMap";
})(EnvironmentTextureType || (exports.EnvironmentTextureType = EnvironmentTextureType = {}));
//# sourceMappingURL=environmentrenderingpass.js.map