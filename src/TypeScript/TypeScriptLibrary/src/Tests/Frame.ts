import { Desktop } from "../Library/Desktop";
import { IDesktop } from "../Library/Interfaces/IDesktop";
import { IPostSetArrow } from "../Library/Interfaces/IPostSetArrow";
import { DataLink } from "../Library/Measurements/Arrows/DataLink";
import { DataConsumer } from "../Library/Measurements/DataConsumer";
import { VectorFormulaConsumer } from "../Library/Measurements/VectorFormulaConsumer";
import { ReferenceFrameArrow } from "../Library/Motion6D/Arrows/ReferenceFrameArrow";
import { ReferenceFrameData } from "../Library/Motion6D/Objects/ReferenceFrameData";
import { RigidReferenceFrame } from "../Library/Motion6D/Objects/RigidReferenceFrame";

class Frame_CategoryObject_0 extends VectorFormulaConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		let map = new Map<string, any>(
		[
		]);
		this.performer.setAliasMap(map, this);
		this.addVariableValue("Formula_1", 0, 1);
		this.addVariableValue("Formula_2", 0, 0);
		this.addVariableValue("Formula_3", 0, 1);
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
	var_1 : number  = 0;
	var_2 : number  = 1;
	
	get_0() : any
	{
		return this.success ? this.var_0 : undefined;
	}
	
	get_1() : any
	{
		return this.success ? this.var_1 : undefined;
	}
	
	get_2() : any
	{
		return this.success ? this.var_2 : undefined;
	}
	save() : void {
		var v = this.variables;
		var x0 = v.get("Formula_1");
		x0?.setIValue(this.get_0());
		var x1 = v.get("Formula_2");
		x1?.setIValue(this.get_1());
		var x2 = v.get("Formula_3");
		x2?.setIValue(this.get_2());
	}
	
}

class Frame_CategoryObject_1 extends RigidReferenceFrame
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.relativePosition = []
		this.relativeQuaternion = []
		this.relativePosition = [];
		this.relativePosition.push(0);
		this.relativePosition.push(0);
		this.relativePosition.push(0);
	
		this.relativePosition = [];
		this.relativePosition.push(1);
		this.relativePosition.push(0);
		this.relativePosition.push(0);
		this.relativePosition.push(0);
	
	}
}

class Frame_CategoryObject_2 extends ReferenceFrameData
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
this.parametersList.push("Formula.Formula_1");
this.parametersList.push("Formula.Formula_2");
this.parametersList.push("Formula.Formula_3");
this.parametersList.push("Formula.Formula_3");
this.parametersList.push("Formula.Formula_2");
this.parametersList.push("Formula.Formula_2");
this.parametersList.push("Formula.Formula_2");
	}
}

class Frame_CategoryObject_3 extends DataConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Frame_CategoryArrow_0 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Frame_CategoryArrow_1 extends ReferenceFrameArrow
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Frame_CategoryArrow_2 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}



export class Frame extends Desktop
{
	constructor()
	{
		super();

		this.name = "Frame";

		new Frame_CategoryObject_0(this, "Formula");
		new Frame_CategoryObject_1(this, "Base");
		new Frame_CategoryObject_2(this, "Motion");
		new Frame_CategoryObject_3(this, "Chart");
		new Frame_CategoryArrow_0(this, "");
		new Frame_CategoryArrow_1(this, "");
		new Frame_CategoryArrow_2(this, "");
this.finish()
}

finish() : void
{
		let objects = this.getCategoryObjects();
		let arrows = this.getCategoryArrows();

		arrows[0].setSource(objects[2]);
		arrows[0].setTarget(objects[0]);
		arrows[1].setSource(objects[2]);
		arrows[1].setTarget(objects[1]);
		arrows[2].setSource(objects[3]);
		arrows[2].setTarget(objects[2]);
		(objects[0] as unknown as IPostSetArrow).postSetArrow();
		(objects[1] as unknown as IPostSetArrow).postSetArrow();
		(objects[2] as unknown as IPostSetArrow).postSetArrow();
	}
}
