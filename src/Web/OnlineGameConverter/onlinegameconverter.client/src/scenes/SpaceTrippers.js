"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shader_program_1 = __importDefault(require("../common/shader-program"));
const MeshUtils = __importStar(require("../common/mesh-utils"));
const TextureUtils = __importStar(require("../common/texture-utils"));
const camera_1 = __importDefault(require("../common/camera"));
const fly_camera_controller_1 = __importDefault(require("../common/camera-controllers/fly-camera-controller"));
const gl_matrix_1 = require("gl-matrix");
const dom_utils_1 = require("../common/dom-utils");
const BasicScene_1 = require("../common/BasicScene");
;
;
;
// In this scene we will draw a scene to multiple targets then use the targets to do a motion blur post processing
class SpaceTrippersScene extends BasicScene_1.BasicScene {
    constructor() {
        super(...arguments);
        this.Space_Displacement = -70;
        this.movementX = 0;
        this.nubmerOfStones = 5;
        this.Shuttle_X = 0;
        this.Shuttle_Y = 8;
        this.Shuttle_Z = -5;
        // We will store the lights here
        this.lights = [
            { type: "ambient", enabled: true, skyColor: gl_matrix_1.vec3.fromValues(1, 1, 1), groundColor: gl_matrix_1.vec3.fromValues(0, 0, 0), skyDirection: gl_matrix_1.vec3.fromValues(0, 1, 0) },
            { type: 'directional', enabled: true, color: gl_matrix_1.vec3.fromValues(1, 1, 1), direction: gl_matrix_1.vec3.fromValues(-1, -1, -1) },
            { type: 'spot', enabled: true, color: gl_matrix_1.vec3.fromValues(5, 5, 0), position: gl_matrix_1.vec3.fromValues(-80, 30, 0), direction: gl_matrix_1.vec3.fromValues(+1, 0, +1), attenuation_quadratic: 1, attenuation_linear: 0, attenuation_constant: 0, inner_cone: 0.25 * Math.PI, outer_cone: 10000 },
        ];
        // And we will store the objects here
        this.objects = {};
        this.running = true;
    }
    load() {
        // All the lights will use the same vertex shader combined with different fragment shaders
        this.game.loader.load({
            ["light.vert"]: { url: 'shaders/phong/textured-materials/light.vert', type: 'text' },
            ["ambient.frag"]: { url: 'shaders/phong/textured-materials/ambient.frag', type: 'text' },
            ["directional.frag"]: { url: 'shaders/phong/textured-materials/directional.frag', type: 'text' },
            ["point.frag"]: { url: 'shaders/phong/textured-materials/point.frag', type: 'text' },
            ["spot.frag"]: { url: 'shaders/phong/textured-materials/spot.frag', type: 'text' },
            ["SpaceShuttle"]: { url: 'models/SpaceShuttle/SpaceShuttle.obj', type: 'text' },
            ["SpaceShuttle.tx"]: { url: 'models/SpaceShuttle/SpaceShuttle_BaseColor.png', type: 'image' },
            ["ground.tx"]: { url: 'models/Floor/bluegrid1.jpg', type: 'image' },
            ["stone-model"]: { url: 'models/Stone/PUSHILIN_boulder.obj', type: 'text' },
            ["stone-texture"]: { url: 'models/Stone/PUSHILIN_boulder.png', type: 'image' },
            ["moon"]: { url: 'images/moon.jpg', type: 'image' },
            ["moonData"]: { url: 'moon.json', type: 'json' },
            ["SpaceShuttleData"]: { url: 'SpaceShuttle.json', type: 'json' },
            ["StoneData"]: { url: 'Stone.json', type: 'json' }
        });
    }
    start() {
        //Stones
        this.SpaceShuttleData = this.game.loader.resources["SpaceShuttleData"];
        this.moonData = this.game.loader.resources["moonData"];
        this.StonesData = this.game.loader.resources["StoneData"];
        this.Stones_pos = new Array();
        for (let i = 0; i < this.nubmerOfStones; i++) {
            let row = new Array();
            for (let j = 0; j < 3; j++) {
                row.push(0);
            }
            this.Stones_pos.push(row);
        }
        // For each light type, compile and link a shader
        for (let type of ['ambient', 'directional', 'spot']) {
            this.programs[type] = new shader_program_1.default(this.gl);
            this.programs[type].attach(this.game.loader.resources['light.vert'], this.gl.VERTEX_SHADER);
            this.programs[type].attach(this.game.loader.resources[`${type}.frag`], this.gl.FRAGMENT_SHADER);
            this.programs[type].link();
        }
        // Load the models
        this.meshes['ground'] = MeshUtils.Plane(this.gl, { min: [0, 0], max: [50, 50] });
        this.meshes['SpaceShuttle'] = MeshUtils.LoadOBJMesh(this.gl, this.game.loader.resources["SpaceShuttle"]);
        //stone meshes
        this.meshes['stone'] = MeshUtils.LoadOBJMesh(this.gl, this.game.loader.resources["stone-model"]);
        this.meshes['moon'] = MeshUtils.Sphere(this.gl);
        this.textures['SpaceShuttle.tx'] = TextureUtils.LoadImage(this.gl, this.game.loader.resources['SpaceShuttle.tx']);
        this.textures['ground.tx'] = TextureUtils.LoadImage(this.gl, this.game.loader.resources['ground.tx']);
        this.textures['white'] = TextureUtils.SingleColor(this.gl, [255, 255, 255, 255]);
        this.textures['black'] = TextureUtils.SingleColor(this.gl, [0, 0, 0, 255]);
        //stone textures
        this.textures['stone'] = TextureUtils.LoadImage(this.gl, this.game.loader.resources['stone-texture']);
        //moon
        this.textures['moon'] = TextureUtils.LoadImage(this.gl, this.game.loader.resources['moon']);
        // Create the 3D ojbects
        this.objects['moon'] = {
            mesh: this.meshes['moon'],
            material: {
                albedo: this.textures['moon'],
                albedo_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                specular: this.textures['moon'],
                specular_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                roughness: this.textures['moon'],
                roughness_scale: 1,
                emissive: this.textures['black'],
                emissive_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                ambient_occlusion: this.textures['white']
            },
            modelMatrix: gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), this.moonData.RotationX, this.moonData.RotationY, this.moonData.RotationZ), gl_matrix_1.vec3.fromValues(this.moonData.TranslationX, this.moonData.TranslationY, this.moonData.TranslationZ), gl_matrix_1.vec3.fromValues(this.moonData.ScaleX, this.moonData.ScaleY, this.moonData.ScaleZ))
        };
        this.objects['ground'] = {
            mesh: this.meshes['ground'],
            material: {
                albedo: this.textures['ground.tx'],
                albedo_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                specular: this.textures['ground.tx'],
                specular_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                roughness: this.textures['ground.tx'],
                roughness_scale: 1,
                emissive: this.textures['black'],
                emissive_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                ambient_occlusion: this.textures['white']
            },
            modelMatrix: gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), 0, 45, 0), gl_matrix_1.vec3.fromValues(0, 0, 0), gl_matrix_1.vec3.fromValues(100, 1, 100))
        };
        this.objects['groundTwo'] = {
            mesh: this.meshes['ground'],
            material: {
                albedo: this.textures['ground.tx'],
                albedo_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                specular: this.textures['ground.tx'],
                specular_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                roughness: this.textures['ground.tx'],
                roughness_scale: 1,
                emissive: this.textures['black'],
                emissive_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                ambient_occlusion: this.textures['white']
            },
            modelMatrix: gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), 0, 45, 0), gl_matrix_1.vec3.fromValues(0, 0, 0), gl_matrix_1.vec3.fromValues(100, 1, 100))
        };
        for (let i = 0; i < this.nubmerOfStones; i++) {
            this.Stones_pos[i][0] = Math.random() * 100 - 80 - 40 * i;
            this.Stones_pos[i][1] = 15;
            this.Stones_pos[i][2] = Math.random() * 100 - 80 - 40 * i;
            this.objects[i] = {
                mesh: this.meshes['stone'],
                material: {
                    albedo: this.textures['stone'],
                    albedo_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                    specular: this.textures['stone'],
                    specular_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                    roughness: this.textures['stone'],
                    roughness_scale: 1,
                    emissive: this.textures['black'],
                    emissive_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                    ambient_occlusion: this.textures['white']
                },
                modelMatrix: gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), gl_matrix_1.quat.create(), gl_matrix_1.vec3.fromValues(this.Stones_pos[i][0], this.Stones_pos[i][1], this.Stones_pos[i][2]), gl_matrix_1.vec3.fromValues(this.StonesData.ScaleX, this.StonesData.ScaleY, this.StonesData.ScaleZ))
            };
        }
        this.objects['SpaceShuttle'] = {
            mesh: this.meshes['SpaceShuttle'],
            material: {
                albedo: this.textures['SpaceShuttle.tx'],
                albedo_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                specular: this.textures['SpaceShuttle.tx'],
                specular_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                roughness: this.textures['SpaceShuttle.tx'],
                roughness_scale: 1,
                emissive: this.textures['black'],
                emissive_tint: gl_matrix_1.vec3.fromValues(1, 1, 1),
                ambient_occlusion: this.textures['SpaceShuttle.tx']
            },
            //quat.fromEuler(quat.create(), -90, 45, 0)
            modelMatrix: gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), this.SpaceShuttleData.RotationX, this.SpaceShuttleData.RotationY, this.SpaceShuttleData.RotationZ), gl_matrix_1.vec3.fromValues(this.SpaceShuttleData.TranslationX, this.SpaceShuttleData.TranslationY, this.SpaceShuttleData.TranslationZ), gl_matrix_1.vec3.fromValues(this.SpaceShuttleData.ScaleX, this.SpaceShuttleData.ScaleY, this.SpaceShuttleData.ScaleZ))
        };
        // Create a regular sampler for textures rendered on the scene objects
        this.samplers['regular'] = this.gl.createSampler();
        this.gl.samplerParameteri(this.samplers['regular'], this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
        this.gl.samplerParameteri(this.samplers['regular'], this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        this.gl.samplerParameteri(this.samplers['regular'], this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.samplerParameteri(this.samplers['regular'], this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
        // Create a camera and a controller
        this.camera = new camera_1.default();
        this.camera.type = 'perspective';
        this.camera.position = gl_matrix_1.vec3.fromValues(30, 30, 30);
        this.camera.direction = gl_matrix_1.vec3.fromValues(-1, -1, -1);
        this.camera.aspectRatio = this.gl.drawingBufferWidth / this.gl.drawingBufferHeight;
        this.controller = new fly_camera_controller_1.default(this.camera, this.game.input);
        this.controller.movementSensitivity = 0.01;
        // As usual, we enable face culling and depth testing
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.cullFace(this.gl.BACK);
        this.gl.frontFace(this.gl.CCW);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        // Use a dark grey clear color
        this.gl.clearColor(0.1, 0.1, 0.1, 1);
        this.setupControls();
        this.setupStartStop();
    }
    draw(deltaTime) {
        if (this.lifes > 0) {
            this.Score++;
            this.controller.update(deltaTime); // Update camera
            this.time += deltaTime;
            if (this.game.input.isButtonDown(0)) {
                if (this.game.input.isKeyDown("l"))
                    this.movementX += 1;
                if (this.game.input.isKeyDown("j"))
                    this.movementX -= 1;
                this.movementX = Math.max(-40, this.movementX);
                this.movementX = Math.min(40, this.movementX);
            }
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT); // Clear color and depth
            let first_light = true;
            // for each light, draw the whole scene
            for (const light of this.lights) {
                if (!light.enabled)
                    continue; // If the light is not enabled, continue
                if (first_light) { // If tihs is the first light, there is no need for blending
                    this.gl.disable(this.gl.BLEND);
                    first_light = false;
                }
                else { // If this in not the first light, we need to blend it additively with all the lights drawn before
                    this.gl.enable(this.gl.BLEND);
                    this.gl.blendEquation(this.gl.FUNC_ADD);
                    this.gl.blendFunc(this.gl.ONE, this.gl.ONE); // This config will make the output = src_color + dest_color
                }
                let program = this.programs[light.type]; // Get the shader to use with this light type
                program.use(); // Use it
                // Send the VP and camera position
                program.setUniformMatrix4fv("VP", false, this.camera.ViewProjectionMatrix);
                program.setUniform3f("cam_position", this.camera.position);
                // Send the light properties depending on its type (remember to normalize the light direction)
                if (light.type == 'ambient') {
                    program.setUniform3f(`light.skyColor`, light.skyColor);
                    program.setUniform3f(`light.groundColor`, light.groundColor);
                    program.setUniform3f(`light.skyDirection`, light.skyDirection);
                }
                else {
                    program.setUniform3f(`light.color`, light.color);
                    if (light.type == 'directional' || light.type == 'spot') {
                        program.setUniform3f(`light.direction`, gl_matrix_1.vec3.normalize(gl_matrix_1.vec3.create(), light.direction));
                    }
                    if (light.type == 'spot') {
                        program.setUniform3f(`light.position`, light.position);
                        program.setUniform1f(`light.attenuation_quadratic`, light.attenuation_quadratic);
                        program.setUniform1f(`light.attenuation_linear`, light.attenuation_linear);
                        program.setUniform1f(`light.attenuation_constant`, light.attenuation_constant);
                    }
                    if (light.type == 'spot') {
                        program.setUniform1f(`light.inner_cone`, light.inner_cone);
                        program.setUniform1f(`light.outer_cone`, light.outer_cone);
                    }
                }
                // Loop over objects and draw them
                for (let name in this.objects) {
                    let obj = this.objects[name];
                    // Create model matrix for the object
                    program.setUniformMatrix4fv("M", false, obj.modelMatrix);
                    program.setUniformMatrix4fv("M_it", true, gl_matrix_1.mat4.invert(gl_matrix_1.mat4.create(), obj.modelMatrix));
                    // Send material properties and bind the textures
                    program.setUniform3f("material.albedo_tint", obj.material.albedo_tint);
                    program.setUniform3f("material.specular_tint", obj.material.specular_tint);
                    program.setUniform3f("material.emissive_tint", obj.material.emissive_tint);
                    program.setUniform1f("material.roughness_scale", obj.material.roughness_scale);
                    this.gl.activeTexture(this.gl.TEXTURE0);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, obj.material.albedo);
                    this.gl.bindSampler(0, this.samplers['regular']);
                    program.setUniform1i("material.albedo", 0);
                    this.gl.activeTexture(this.gl.TEXTURE1);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, obj.material.specular);
                    this.gl.bindSampler(1, this.samplers['regular']);
                    program.setUniform1i("material.specular", 1);
                    this.gl.activeTexture(this.gl.TEXTURE2);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, obj.material.roughness);
                    this.gl.bindSampler(2, this.samplers['regular']);
                    program.setUniform1i("material.roughness", 2);
                    this.gl.activeTexture(this.gl.TEXTURE3);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, obj.material.emissive);
                    this.gl.bindSampler(3, this.samplers['regular']);
                    program.setUniform1i("material.emissive", 3);
                    this.gl.activeTexture(this.gl.TEXTURE4);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, obj.material.ambient_occlusion);
                    this.gl.bindSampler(4, this.samplers['regular']);
                    program.setUniform1i("material.ambient_occlusion", 4);
                    obj.mesh.draw(this.gl.TRIANGLES);
                }
                this.Space_Displacement += 4;
                if (this.Space_Displacement >= 204)
                    this.Space_Displacement = -50;
                for (let i = 0; i < this.nubmerOfStones; ++i) {
                    if (this.Stones_pos[i][0] > 70 || this.Stones_pos[i][2] > 70) {
                        this.Stones_pos[i][0] = Math.random() * 100 - 140 - 40 * i;
                        this.Stones_pos[i][1] = 10;
                        this.Stones_pos[i][2] = Math.random() * 100 - 140 - 40 * i;
                    }
                    this.Stones_pos[i][0] += 1, this.Stones_pos[i][2] += 1;
                    this.objects[i].modelMatrix = gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), gl_matrix_1.quat.create(), gl_matrix_1.vec3.fromValues(this.Stones_pos[i][0], this.Stones_pos[i][1], this.Stones_pos[i][2]), gl_matrix_1.vec3.fromValues(6, 6, 6));
                }
                const moonData = this.game.loader.resources["moonData"];
                this.objects['moon'].modelMatrix = gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), moonData.RotationX, moonData.RotationAngle * this.time / 1000, moonData.RotationZ), gl_matrix_1.vec3.fromValues(moonData.TranslationX, moonData.TranslationY, moonData.TranslationZ), gl_matrix_1.vec3.fromValues(moonData.ScaleX, moonData.ScaleY, moonData.ScaleZ));
                this.objects['ground'].modelMatrix = gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), 0, 45, 0), gl_matrix_1.vec3.fromValues(this.Space_Displacement, 0, this.Space_Displacement), gl_matrix_1.vec3.fromValues(100, 1, 600));
                this.objects['groundTwo'].modelMatrix = gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), 0, 45, 0), gl_matrix_1.vec3.fromValues(-200 + this.Space_Displacement, 0, -200 + this.Space_Displacement), gl_matrix_1.vec3.fromValues(100, 1, 600));
                this.objects['SpaceShuttle'].modelMatrix = gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), this.SpaceShuttleData.RotationX, this.SpaceShuttleData.RotationY, this.SpaceShuttleData.RotationZ), gl_matrix_1.vec3.fromValues(this.movementX, 10, -this.movementX), gl_matrix_1.vec3.fromValues(this.SpaceShuttleData.ScaleX, this.SpaceShuttleData.ScaleY, this.SpaceShuttleData.ScaleZ));
                this.DetectCollision();
                this.controlHealthScore();
            }
        }
    }
    DetectCollision() {
        ////// Collision //////
        for (let i = 0; i < this.nubmerOfStones; i++) {
            if (Math.abs(this.Stones_pos[i][0] - this.Shuttle_X) < 12) {
                if (Math.abs(this.Stones_pos[i][2] - this.Shuttle_Z) < 12) {
                    this.Stones_pos[i][0] = Math.random() * 100 - 140 - 40 * i;
                    this.Stones_pos[i][1] = 10;
                    this.Stones_pos[i][2] = Math.random() * 100 - 140 - 40 * i;
                    this.lifes--;
                }
            }
        }
    }
    end() {
        for (let key in this.programs)
            this.programs[key].dispose();
        this.programs = {};
        for (let key in this.meshes)
            this.meshes[key].dispose();
        this.meshes = {};
        this.clearControls();
    }
    setStart(v) {
        if (this.engine != undefined) {
            this.engine.setEngineEnabled(v);
        }
        return v;
    }
    setupStartStop() {
        const controls = document.querySelector('#controls');
        controls.appendChild(<div>
                <div className="control-row">
                    <label className="control-label">Stop</label>
                  <dom_utils_1.CheckBox value={this.running} onchange={(v) => { this.setStart(v); }}/>
              </div>
            </div>);
    }
    setupControls() {
        const controls = document.querySelector('#controls');
        controls.appendChild(<div>
                <div className="control-row">
                    <label className="control-label">Lights</label>
                    {this.lights.map((light) => {
                return <dom_utils_1.CheckBox value={light.enabled} onchange={(v) => { light.enabled = v; }}/>;
            })}
                </div>
            </div>);
    }
    clearControls() {
        const controls = document.querySelector('#controls');
        controls.innerHTML = "";
    }
    controlHealthScore() {
        if (this.lifes <= 0) {
            document.querySelector("#health").innerHTML = "";
            document.querySelector("#over").innerHTML = "GAME OVER";
        }
        else {
            document.querySelector("#score").innerHTML = (this.Score / 60).toFixed(0).toString();
            document.querySelector("#health").innerHTML = this.lifes.toString();
        }
    }
}
exports.default = SpaceTrippersScene;
//# sourceMappingURL=SpaceTrippers.js.map