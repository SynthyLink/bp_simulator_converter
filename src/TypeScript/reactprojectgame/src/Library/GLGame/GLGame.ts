import { EngineGame } from "../Game/Abstract/EngineGame";
import type { IFactory } from "../Interfaces/IFactory";
import type { IPlayEngine } from "../Interfaces/IPlayEngine";
import Loader from "../RemoteResuorces/Loader";
import type { ResourceInformation } from "../RemoteResuorces/Loader";
import type { IResourceFuncFactory } from "../Resources/Infrefaces/IResourceFuncFactory";
import { GLGamePerformer } from "./GLGamePerformer";
import type { GameOptions } from "./interfaces/IGameOptions";
import type { IGLContext } from "./interfaces/IGLContext";

export class GLGame extends EngineGame implements IGLContext {

    constructor(name: string, factory: IFactory, engine: IPlayEngine,
        canvas: HTMLCanvasElement, options: GameOptions) {
        super(name, factory, engine)
        this.types.push("IGLContext")
        this.types.push("GLGame")
        this.typeName = "GLGame"
        this.canvas = canvas
        factory.addFactory<IGLContext>(this, "IGLContext")
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
        let loadFact = this.glGamePerformer.createFactory(this.loader, factory)
        factory.addFactory<IResourceFuncFactory>(loadFact, "IResourceFuncFactory")
    }
    getGlContext(): WebGL2RenderingContext {
        return this.gl;
        
    }

    loadItself(load: boolean): boolean {
        this.fl = load
        return true;
    }

    nextScene(): void {
        super.loadItself(true)
        super.startItself(true)

    }

    fl: boolean = false

    startItself(start: boolean): boolean {
        if (this.isStarted == start) return false
        this.loadProtected()
        return true
    }

    loadProtected(): void {
        this.nextSceneReady = false
        this.resourcesI.clear()
        this.performer.collectResources(this, this)
        this.glGamePerformer.convertResourceInfo(this.resources, this.resourcesI)
        this.loader.loadMap(this.resourcesI)
        this.loader.wait().then(this.nextScene)
        //this.loader.load()
    }

    run(): void {
        this.loop(0)
    }



    protected loop(time: DOMHighResTimeStamp) {
        if (!this.isStarted) return
        requestAnimationFrame((time) => this.loop(time)); // Tell the browser to call this function again when the next frame needs to be drawn
        if (this.options.maxfps) {
            if (time - this.lastTick < (1000 / this.options.maxfps)) return;
        }
        if (!this.nextSceneReady) {
            return
        }
        this.cycle(time)
        this.lastTick = time
    }



    protected loader: Loader = new Loader()

    canvas !: HTMLCanvasElement

    gl !: WebGL2RenderingContext

    nextSceneReady: boolean = false; // Whether the files requested by the next scene has been loaded or not 
    lastTick: number = 0; // The time of the last frame in milliseconds (used to calculate delta time)
    options !: GameOptions;

    resourcesI: Map<string, ResourceInformation> = new Map()

    glGamePerformer: GLGamePerformer = new GLGamePerformer()


}