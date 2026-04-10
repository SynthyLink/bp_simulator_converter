import { BelongsToCollection } from "./Library/Arrows/BelognsToCollection";
import { Desktop } from "./Library/Desktop";
import { EventLink } from "./Library/Event/Objects/EventLink";
import { TimerObject } from "./Library/Event/Objects/TimerObject";
import { IDesktop } from "./Library/Interfaces/IDesktop";
import { IPostSetArrow } from "./Library/Interfaces/IPostSetArrow";
import { DataLink } from "./Library/Measurements/Arrows/DataLink";
import { DataConsumer } from "./Library/Measurements/DataConsumer";
import { VectorFormulaConsumer } from "./Library/Measurements/VectorFormulaConsumer";
import { ReferenceFrameArrow } from "./Library/Motion6D/Arrows/ReferenceFrameArrow";
import { RigidReferenceFrame } from "./Library/Motion6D/Objects/RigidReferenceFrame";
import { SerializablePosition } from "./Library/Motion6D/Objects/SerializablePosition";
import { Basic3DShape } from "./Library/Motion6D/Objects/Shapes/Basic3DShape";
import { BasicCamera } from "./Library/Motion6D/Visible/BasicCamera";
import { VisibleConsumerLink } from "./Library/Motion6D/Visible/VisibleConsumerLink";
import { TimeSpan } from "./Library/Utilities/DateTime/TimeSpan";

class Airplane_CategoryObject_0_Visible0 extends Basic3DShape
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		let map = this.getSaveGrahicalData()
		map.set("Cessna_208_Caravan.obj", "Cessna_208_Caravan.obj")
		map.set("master.mtl", "master.mtl")
		map.set("mat0_c.jpg", "mat0_c.jpg")
	}
}

class Airplane_CategoryObject_0 extends SerializablePosition
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.addChildT(new Airplane_CategoryObject_0_Visible0(desktop, name))
	}
}

class Airplane_CategoryObject_3 extends BasicCamera
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Airplane_CategoryObject_4 extends TimerObject
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.span = new TimeSpan(100)
	}
}

class Airplane_CategoryObject_5 extends RigidReferenceFrame
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.relativePosition = []
		this.relativeQuaternion = []
		this.relativePosition = [];
		this.relativePosition.push(40);
		this.relativePosition.push(40);
		this.relativePosition.push(40);
	
		this.relativePosition = [];
		this.relativePosition.push(0.88047623921714935);
		this.relativePosition.push(-0.27984814233312139);
		this.relativePosition.push(0.36470519963100095);
		this.relativePosition.push(0.11591689595929504);
	
	}
}

class Airplane_CategoryObject_6 extends VectorFormulaConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		let map = new Map<string, any>(
		[
		]);
		this.performer.setAliasMap(map, this);
		this.addVariableValue("Formula_1", 0, 0);
	}

		calculateTree() : void
		{
			this.success = true;
			this.var_0 = this.getInternalTime();
		}
	
	init() : void
	{
		var all = this.getAllMeasurements();
	}
	
	var_0 : number  = 0;
	
	get_0() : any
	{
		return this.success ? this.var_0 : undefined;
	}
	save() : void {
		var v = this.variables;
		var x0 = v.get("Formula_1");
		x0?.setIValue(this.get_0());
	}
	
}

class Airplane_CategoryObject_7 extends DataConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Airplane_CategoryArrow_0 extends ReferenceFrameArrow
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Airplane_CategoryArrow_1 extends VisibleConsumerLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Airplane_CategoryArrow_2 extends BelongsToCollection
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Airplane_CategoryArrow_3 extends BelongsToCollection
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Airplane_CategoryArrow_4 extends BelongsToCollection
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Airplane_CategoryArrow_5 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Airplane_CategoryArrow_6 extends EventLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}



export class Airplane extends Desktop
{
	constructor()
	{
		super();

		this.name = "Airplane";

		this.mapObjects.set("Airplane_CategoryObject_0", new Airplane_CategoryObject_0(this, "pLANE"))
		this.mapObjects.set("Airplane_CategoryObject_0_Visible0", new Airplane_CategoryObject_0_Visible0(this, "pLANE"))
		this.mapObjects.set("Airplane_CategoryObject_0_Visible0", new Airplane_CategoryObject_0_Visible0(this, "pLANE"))
		this.mapObjects.set("Airplane_CategoryObject_3", new Airplane_CategoryObject_3(this, "Camera"))
		this.mapObjects.set("Airplane_CategoryObject_4", new Airplane_CategoryObject_4(this, "Timer"))
		this.mapObjects.set("Airplane_CategoryObject_5", new Airplane_CategoryObject_5(this, ""))
		this.mapObjects.set("Airplane_CategoryObject_6", new Airplane_CategoryObject_6(this, "Time"))
		this.mapObjects.set("Airplane_CategoryObject_7", new Airplane_CategoryObject_7(this, "Chart"))
		new Airplane_CategoryArrow_0(this, "");
		new Airplane_CategoryArrow_1(this, "");
		new Airplane_CategoryArrow_2(this, "");
		new Airplane_CategoryArrow_3(this, "");
		new Airplane_CategoryArrow_4(this, "");
		new Airplane_CategoryArrow_5(this, "");
		new Airplane_CategoryArrow_6(this, "");
	this.finish()
}

finish() : void
{
		let objects = this.getCategoryObjects();
		let arrows = this.getCategoryArrows();

		let s0 = this.mapObjects.get("Airplane_CategoryObject_3")
		if(s0 != undefined)    arrows[0].setSource(s0);
		let t0 = this.mapObjects.get("Airplane_CategoryObject_5")
		if(t0 != undefined)    arrows[0].setTarget(t0);
		let s1 = this.mapObjects.get("Airplane_CategoryObject_3")
		if(s1 != undefined)    arrows[1].setSource(s1);
		let t1 = this.mapObjects.get("Airplane_CategoryObject_0_Visible0")
		if(t1 != undefined)    arrows[1].setTarget(t1);
		let s2 = this.mapObjects.get("Airplane_CategoryObject_7")
		if(s2 != undefined)    arrows[2].setSource(s2);
		let t2 = this.mapObjects.get("Airplane_CategoryObject_3")
		if(t2 != undefined)    arrows[2].setTarget(t2);
		let s3 = this.mapObjects.get("Airplane_CategoryObject_7")
		if(s3 != undefined)    arrows[3].setSource(s3);
		let t3 = this.mapObjects.get("Airplane_CategoryObject_5")
		if(t3 != undefined)    arrows[3].setTarget(t3);
		let s4 = this.mapObjects.get("Airplane_CategoryObject_7")
		if(s4 != undefined)    arrows[4].setSource(s4);
		let t4 = this.mapObjects.get("Airplane_CategoryObject_0")
		if(t4 != undefined)    arrows[4].setTarget(t4);
		let s5 = this.mapObjects.get("Airplane_CategoryObject_7")
		if(s5 != undefined)    arrows[5].setSource(s5);
		let t5 = this.mapObjects.get("Airplane_CategoryObject_6")
		if(t5 != undefined)    arrows[5].setTarget(t5);
		let s6 = this.mapObjects.get("Airplane_CategoryObject_7")
		if(s6 != undefined)    arrows[6].setSource(s6);
		let t6 = this.mapObjects.get("Airplane_CategoryObject_4")
		if(t6 != undefined)    arrows[6].setTarget(t6);
		(objects[0] as unknown as IPostSetArrow).postSetArrow();
		(objects[5] as unknown as IPostSetArrow).postSetArrow();
		(objects[6] as unknown as IPostSetArrow).postSetArrow();
		(objects[7] as unknown as IPostSetArrow).postSetArrow();
	}
}
