import { BelongsToCollection } from "../Library/Arrows/BelognsToCollection";
import { Desktop } from "../Library/Desktop";
import { EventLink } from "../Library/Event/Objects/EventLink";
import { TimerObject } from "../Library/Event/Objects/TimerObject";
import { IDesktop } from "../Library/Interfaces/IDesktop";
import { DataLink } from "../Library/Measurements/Arrows/DataLink";
import { DataConsumer } from "../Library/Measurements/DataConsumer";
import { VectorFormulaConsumer } from "../Library/Measurements/VectorFormulaConsumer";
import { ReferenceFrameArrow } from "../Library/Motion6D/Arrows/ReferenceFrameArrow";
import { RigidReferenceFrame } from "../Library/Motion6D/Objects/RigidReferenceFrame";
import { SerializablePosition } from "../Library/Motion6D/Objects/SerializablePosition";
import { Basic3DShape } from "../Library/Motion6D/Objects/Shapes/Basic3DShape";
import { BasicCamera } from "../Library/Motion6D/Visible/BasicCamera";
import { VisibleConsumerLink } from "../Library/Motion6D/Visible/VisibleConsumerLink";
import { TimeSpan } from "../Library/Utilities/DateTime/TimeSpan";

class Cessna_CategoryObject_0_Visible0 extends Basic3DShape
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

class Cessna_CategoryObject_0 extends SerializablePosition
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.addChildT(new Cessna_CategoryObject_0_Visible0(desktop, name))
	}
}

class Cessna_CategoryObject_1 extends BasicCamera
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Cessna_CategoryObject_2 extends TimerObject
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.span = TimeSpan.fromMilliseconds(100)
	}
}

class Cessna_CategoryObject_3 extends RigidReferenceFrame
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

class Cessna_CategoryObject_4 extends VectorFormulaConsumer
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

class Cessna_CategoryObject_5 extends DataConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Cessna_CategoryArrow_0 extends ReferenceFrameArrow
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Cessna_CategoryArrow_1 extends VisibleConsumerLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Cessna_CategoryArrow_2 extends BelongsToCollection
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Cessna_CategoryArrow_3 extends BelongsToCollection
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Cessna_CategoryArrow_4 extends BelongsToCollection
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Cessna_CategoryArrow_5 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Cessna_CategoryArrow_6 extends EventLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}



export class Cessna extends Desktop {
	constructor() {
		super();

		this.name = "Cessna";

		this.mapObjects.set("Cessna_CategoryObject_0", new Cessna_CategoryObject_0(this, "pLANE"))
		this.mapObjects.set("Cessna_CategoryObject_1", new Cessna_CategoryObject_1(this, "Camera"))
		this.mapObjects.set("Cessna_CategoryObject_2", new Cessna_CategoryObject_2(this, "Timer"))
		this.mapObjects.set("Cessna_CategoryObject_3", new Cessna_CategoryObject_3(this, ""))
		this.mapObjects.set("Cessna_CategoryObject_4", new Cessna_CategoryObject_4(this, "Time"))
		this.mapObjects.set("Cessna_CategoryObject_5", new Cessna_CategoryObject_5(this, "Chart"))
		new Cessna_CategoryArrow_0(this, "");
		new Cessna_CategoryArrow_1(this, "");
		new Cessna_CategoryArrow_2(this, "");
		new Cessna_CategoryArrow_3(this, "");
	}
}