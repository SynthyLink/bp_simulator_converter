import { AliasName } from "../Library/AliasName";
import { Desktop } from "../Library/Desktop";
import { IAliasName } from "../Library/Interfaces/IAliasName";
import { IDesktop } from "../Library/Interfaces/IDesktop";
import { IPostSetArrow } from "../Library/Interfaces/IPostSetArrow";
import { AliasNameMeasurement } from "../Library/Measurements/AliasNameMeasurement";
import { DataConsumer } from "../Library/Measurements/DataConsumer";
import { DataLink } from "../Library/Measurements/DataLink";
import { IMeasurement } from "../Library/Measurements/Interfaces/IMeasurement";
import { Measurement } from "../Library/Measurements/Measurement";
import { RandomGenerator } from "../Library/Measurements/RandomGenerator";
import { Recursive } from "../Library/Measurements/Recursive";
import { VectorFormulaConsumer } from "../Library/Measurements/VectorFormulaConsumer";

class Random_CategoryObject_0 extends RandomGenerator
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Random_CategoryObject_1 extends RandomGenerator
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}



class Random_CategoryObject_2_Measurement_11 extends Measurement {
	obj !: Random_CategoryObject_2;
	constructor(o:  Random_CategoryObject_2, name: string, type: any) {
		super(name, type);
		this.obj = o;
	}

	getMeasurementValue() {
		return this.obj.get_11();
	}
}



class Random_CategoryObject_2 extends VectorFormulaConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		let map = new Map<string, any>(
		[
			["f", 0.0040000000000000001 ]
		]);
		this.performer.setAliasMap(map, this);
		let feed = new Map<number, string>(
		[
		]);
		this.performer.copyMap(feed, this.feedback);
		this.arguments.push("x = Y.Random");
		this.arguments.push("y = X.Random");
		let ops = new Map<number, string>(
		[
		]);
	}

		calculateTree() : void
		{
			this.success = true;
			this.variable = this.measurement0.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_0 = this.convert<number>(this.variable);
			this.variable = Math.pow(this.var_0, this.var_1);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_2 = this.convert<number>(this.variable);
			this.variable = this.measurement3.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_3 = this.convert<number>(this.variable);
			this.variable = Math.pow(this.var_3, this.var_4);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_5 = this.convert<number>(this.variable);
			this.variable = (this.var_2) + (this.var_5);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_6 = this.convert<number>(this.variable);
			this.variable = (this.var_6) > (this.var_7);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_8 = this.convert<boolean>(this.variable);
			this.variable = this.aliasName10.getAliasNameValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_10 = this.convert<number>(this.variable);
			this.variable = (this.var_8) ? (this.var_9) : (this.var_10);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_11 = this.convert<number>(this.variable);
		}
	
	init() : void
	{
		this.addMeasurement(new Random_CategoryObject_2_Measurement_11(this, "Formula_1" ,0));
		this.measurement0 = this.dataConsumer.getAllMeasurements()[0].getMeasurement(0);
		this.measurement3 = this.dataConsumer.getAllMeasurements()[1].getMeasurement(0);
		this.aliasName10 = new AliasName(this.alias, "f");
	}
	measurement0 !: IMeasurement;
	measurement3 !: IMeasurement;
	aliasName10 !: IAliasName;
	var_0 : number  = 0;
	var_1 : number  = 2;
	var_2 : number  = 0;
	var_3 : number  = 0;
	var_4 : number  = 2;
	var_5 : number  = 0;
	var_6 : number  = 0;
	var_7 : number  = 1;
	var_8 : boolean  = false;
	var_9 : number  = 0;
	var_10 : number  = 0;
	var_11 : number  = 0;
	
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
	
	get_3() : any
	{
		return this.success ? this.var_3 : undefined;
	}
	
	get_4() : any
	{
		return this.success ? this.var_4 : undefined;
	}
	
	get_5() : any
	{
		return this.success ? this.var_5 : undefined;
	}
	
	get_6() : any
	{
		return this.success ? this.var_6 : undefined;
	}
	
	get_7() : any
	{
		return this.success ? this.var_7 : undefined;
	}
	
	get_8() : any
	{
		return this.success ? this.var_8 : undefined;
	}
	
	get_9() : any
	{
		return this.success ? this.var_9 : undefined;
	}
	
	get_10() : any
	{
		return this.success ? this.var_10 : undefined;
	}
	
	get_11() : any
	{
		return this.success ? this.var_11 : undefined;
	}
	
}

class Random_CategoryObject_3 extends Recursive
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		let map = new Map<string, any>(
		[
			["d", 0 ],
			["c", 0 ],
			["a", 0 ]
		]);
		this.performer.setAliasMap(map, this);
	}

		calculateTree() : void
		{
			this.success = true;
			this.variable = this.aliasName0.getAliasNameValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_0 = this.convert<number>(this.variable);
			this.variable = this.measurement1.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_1 = this.convert<number>(this.variable);
			this.variable = (this.var_0) + (this.var_1);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_2 = this.convert<number>(this.variable);
			this.variable = this.aliasName3.getAliasNameValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_3 = this.convert<number>(this.variable);
			this.variable = (this.var_2) + (this.var_3);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_4 = this.convert<number>(this.variable);
			this.variable = this.aliasName5.getAliasNameValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_5 = this.convert<number>(this.variable);
			this.variable = (this.var_4) + (this.var_5);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_6 = this.convert<number>(this.variable);
		}
	
	init() : void
	{
		this.addMeasurement(new AliasNameMeasurement(this, "a"));
		this.measurement1 = this.dataConsumer.getAllMeasurements()[0].getMeasurement(0);
		this.aliasName0 = new AliasName(this.alias, "a");
		this.aliasName3 = new AliasName(this.alias, "c");
		this.aliasName5 = new AliasName(this.alias, "d");
	}
	measurement1 !: IMeasurement;
	aliasName0 !: IAliasName;
	aliasName3 !: IAliasName;
	aliasName5 !: IAliasName;
	var_0 : number  = 0;
	var_1 : number  = 0;
	var_2 : number  = 0;
	var_3 : number  = 0;
	var_4 : number  = 0;
	var_5 : number  = 0;
	var_6 : number  = 0;
	
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
	
	get_3() : any
	{
		return this.success ? this.var_3 : undefined;
	}
	
	get_4() : any
	{
		return this.success ? this.var_4 : undefined;
	}
	
	get_5() : any
	{
		return this.success ? this.var_5 : undefined;
	}
	
	get_6() : any
	{
		return this.success ? this.var_6 : undefined;
	}
	save() : void {
		this.setAliasValue("a", this.get_0());
	}
	
}

class Random_CategoryObject_4 extends DataConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Random_CategoryArrow_0 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Random_CategoryArrow_1 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Random_CategoryArrow_2 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Random_CategoryArrow_3 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}



export class Random extends Desktop
{
	constructor()
	{
		super();

		this.name = "Random";

		new Random_CategoryObject_0(this, "X");
		new Random_CategoryObject_1(this, "Y");
		new Random_CategoryObject_2(this, "Data");
		new Random_CategoryObject_3(this, "Recursive");
		new Random_CategoryObject_4(this, "Chart");
		new Random_CategoryArrow_0(this, "2");
		new Random_CategoryArrow_1(this, "1");
		new Random_CategoryArrow_2(this, "3");
		new Random_CategoryArrow_3(this, "4");

		let objects = this.getCategoryObjects();
		let arrows = this.getCategoryArrows();

		arrows[0].setSource(objects[2]);
		arrows[0].setTarget(objects[1]);
		arrows[1].setSource(objects[2]);
		arrows[1].setTarget(objects[0]);
		arrows[2].setSource(objects[3]);
		arrows[2].setTarget(objects[2]);
		arrows[3].setSource(objects[4]);
		arrows[3].setTarget(objects[3]);
		(objects[2] as unknown as IPostSetArrow).postSetArrow();
		(objects[3] as unknown as IPostSetArrow).postSetArrow();
	}
}
