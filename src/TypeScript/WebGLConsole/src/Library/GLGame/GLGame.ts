import type { IFactory } from "../Interfaces/IFactory";
import type { IPlayEngine } from "../Interfaces/IPlayEngine";
import type { IMesh } from "../Abstract3DConverters/Interfaces/IMesh";
import type { GameOptions } from "./interfaces/IGameOptions";
import type { IGameActionConverter } from "../Game/Interfaces/IGameActionConverter";
import { EngineGameCameraAction } from "../Abstract3DGame/Games/EngineGameCameraAction";
import { DrawMeshAction } from "../Abstract3DGame/Factory/DrawMeshAction";
import { ReferenceFrame } from "../Motion6D/ReferenceFrame";
import { BasicCamera } from "../Motion6D/Visible/BasicCamera";
import { DrawMeshGameCameraAcionConverter } from "../Abstract3DGame/Objects/DrawMeshGameCameraAcionConverter";
import { DrawMesh } from "../Abstract3DGame/Factory/DrawMesh";

export class GLGame extends EngineGameCameraAction  {

    constructor(name: string, factory: IFactory, engine: IPlayEngine, useLoader: boolean,
        canvas: HTMLCanvasElement, options: GameOptions) {
        super(name, factory, engine, useLoader)
        this.types.push("IGLContext")
        this.types.push("GLGame")
        this.typeName = "GLGame"
        this.canvas = canvas
        var gl = this.canvas.getContext("webgl2", {
            preserveDrawingBuffer: true, // This will prevent the Browser from automatically clearing the frame buffer every frame
            alpha: true, // this will tell the browser that we want an alpha component in our frame buffer
            antialias: true, // this will tell the browser that we want antialiasing
            depth: true, // this will tell the browser that we want a depth buffer
            powerPreference: "high-performance",
            premultipliedAlpha: false, // This can be used if the canvas are going to be blended with the rest of the webpage (transparency)
            stencil: true // this will tell the browser that we want a stencil buffer
        }); // This command loads the WebGL2 context which we will use to draw
        if (gl != undefined) {
            this.gl = gl
        }
        this.options = options
    }

 
    protected getGameActionConverterCamera(camera: BasicCamera): IGameActionConverter {
        return new GLDrawMeshGameCameraAcionConverter(camera, this.gl)
    }


 
    canvas !: HTMLCanvasElement

    gl !: WebGL2RenderingContext

    nextSceneReady: boolean = false; // Whether the files requested by the next scene has been loaded or not 
    lastTick: number = 0; // The time of the last frame in milliseconds (used to calculate delta time)
    options !: GameOptions;

}

class GLDrawMesh extends DrawMesh {
    gl !: WebGL2RenderingContext
    constructor(camera: BasicCamera, gl: WebGL2RenderingContext) {
        super(camera)
        this.gl = gl
    }

    protected createAction(camera: BasicCamera, mesh: IMesh, frame: ReferenceFrame): DrawMeshAction {
        return new GLDrawMeshAction(camera, mesh, frame, this.gl)
    }

}


class GLDrawMeshAction extends DrawMeshAction {
    gl !: WebGL2RenderingContext
    constructor(camera: BasicCamera, mesh: IMesh, frame: ReferenceFrame,
        gl: WebGL2RenderingContext) {
        super(camera, mesh, frame)
        this.gl = gl;
    }
    action(): void {
        let v = this.mesh.getVertices()
        this.performer.setInvertedCoorfinates2(this.vertices, v, this.frame)
        console.log("DRAW GL")
    }

}


class GLDrawMeshGameCameraAcionConverter extends DrawMeshGameCameraAcionConverter {

    gl !: WebGL2RenderingContext
    constructor(camera: BasicCamera, gl : WebGL2RenderingContext) {
        super(camera)
        this.gl = gl
    }

    protected createDraw(camera: BasicCamera): DrawMesh {
        return new GLDrawMesh(camera, this.gl)
    } 


}
