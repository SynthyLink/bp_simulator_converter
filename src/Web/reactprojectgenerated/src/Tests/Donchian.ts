import { TradingDataQuery } from "../ExternalObjects/Components/Trading/TradingDataQuery";
import { TradingOrder } from "../ExternalObjects/Components/Trading/TradingOrder";
import { AliasName } from "../Library/AliasName";
import { Desktop } from "../Library/Desktop";
import { IAliasName } from "../Library/Interfaces/IAliasName";
import { IDesktop } from "../Library/Interfaces/IDesktop";
import { IPostSetArrow } from "../Library/Interfaces/IPostSetArrow";
import { IValue } from "../Library/Interfaces/IValue";
import { DataLink } from "../Library/Measurements/Arrows/DataLink";
import { IteratorConsumerLink } from "../Library/Measurements/Arrows/IteratorConsumerLink";
import { DataConsumer } from "../Library/Measurements/DataConsumer";
import { IMeasurement } from "../Library/Measurements/Interfaces/IMeasurement";
import { RecursiveFormula } from "../Library/Measurements/RecursiveFormula";
import { SequenceFilterWrapper } from "../Library/Measurements/SequenserFilterWrapper";
import { VectorFormulaConsumer } from "../Library/Measurements/VectorFormulaConsumer";
import { SequenceFilterType } from "../Library/Utilities/Filters/Interfaces/SequenceFilterType";

class Donchian_CategoryObject_0 extends TradingDataQuery
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryObject_1 extends SequenceFilterWrapper
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.count = 1
		this.type = SequenceFilterType.Avarage
	}
}

class Donchian_CategoryObject_2 extends SequenceFilterWrapper
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.count = 1
		this.type = SequenceFilterType.Avarage
	}
}

class Donchian_CategoryObject_3 extends SequenceFilterWrapper
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.count = 1
		this.type = SequenceFilterType.Donchian
		this.mimax = true
	}
}

class Donchian_CategoryObject_4 extends SequenceFilterWrapper
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.count = 1
		this.type = SequenceFilterType.Donchian
		this.mimax = false
	}
}

class Donchian_CategoryObject_5 extends RecursiveFormula
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		let map = new Map<string, any>(
		[
			["t", 0 ],
			["x", 0 ],
			["y", 0 ],
		]);
		this.performer.setAliasMap(map, this);
		this.addVariableValue("x", 0, 0);
		this.addVariableValue("y", 0, 0);
	}

		calculateTree() : void
		{
			this.success = true;
			this.variable = this.value0.getIValue();
			if (this.check(this.variable)) { this.success = false; return; }
			this.var_0 = this.convert<number>(this.variable);
			this.variable = this.aliasName1.getAliasNameValue()
			if (this.check(this.variable)) { this.success = false; return; }
			this.var_1 = this.convert<number>(this.variable);
		}
	
	init() : void
	{
		var all = this.getAllMeasurements();
		this.value0 = this.output[1];
		this.aliasName1 = new AliasName(this.alias, "t");
	}
	
	value0 ! : IValue;
	aliasName1 ! : IAliasName;
	var_0 : number  = 0;
	var_1 : number  = 0;
	
	get_0() : any
	{
		return this.success ? this.var_0 : undefined;
	}
	
	get_1() : any
	{
		return this.success ? this.var_1 : undefined;
	}
	save() : void {
		var v = this.variables;
		var x0 = v.get("x");
		x0?.setIValue(this.get_0());
		var x1 = v.get("y");
		x1?.setIValue(this.get_1());
	}
	
}

class Donchian_CategoryObject_6 extends VectorFormulaConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		let map = new Map<string, any>(
		[
		]);
		this.performer.setAliasMap(map, this);
		this.addVariableValue("Formula_1", false, false);
		this.addVariableValue("Formula_2", false, false);
		this.addVariableValue("Formula_3", false, false);
		this.addVariableValue("Formula_4", 0, 0);
		this.addVariableValue("Formula_5", false, false);
		this.addVariableValue("Formula_6", false, false);
		this.addVariableValue("Formula_7", false, false);
	}

		calculateTree() : void
		{
			this.success = true;
			this.variable = this.measurement0.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_0 = this.convert<number>(this.variable);
			this.variable = this.measurement1.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_1 = this.convert<number>(this.variable);
			this.variable = (this.var_0) < (this.var_1);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_2 = this.convert<boolean>(this.variable);
			this.variable = this.measurement3.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_3 = this.convert<number>(this.variable);
			this.variable = this.measurement4.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_4 = this.convert<number>(this.variable);
			this.variable = (this.var_3) < (this.var_4);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_5 = this.convert<boolean>(this.variable);
			this.variable = this.measurement6.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_6 = this.convert<number>(this.variable);
			this.variable = this.measurement7.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_7 = this.convert<number>(this.variable);
			this.variable = (this.var_6) > (this.var_7);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_8 = this.convert<boolean>(this.variable);
			this.variable = this.measurement9.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_9 = this.convert<number>(this.variable);
			this.variable = (this.var_9) === (this.var_10);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_11 = this.convert<boolean>(this.variable);
			this.variable = (this.var_9) === (this.var_12);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_13 = this.convert<boolean>(this.variable);
			this.variable = (this.var_9) === (this.var_14);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_15 = this.convert<boolean>(this.variable);
		}
	
	init() : void
	{
		var all = this.getAllMeasurements();
		this.measurement0 = all[5].getMeasurement(0);
		this.measurement1 = all[4].getMeasurement(0);
		this.measurement3 = all[0].getMeasurement(1);
		this.measurement4 = all[2].getMeasurement(0);
		this.measurement6 = all[0].getMeasurement(2);
		this.measurement7 = all[3].getMeasurement(0);
		this.measurement9 = all[1].getMeasurement(1);
	}
	
	measurement0 ! : IMeasurement;
	measurement1 ! : IMeasurement;
	measurement3 ! : IMeasurement;
	measurement4 ! : IMeasurement;
	measurement6 ! : IMeasurement;
	measurement7 ! : IMeasurement;
	measurement9 ! : IMeasurement;
	var_0 : number  = 0;
	var_1 : number  = 0;
	var_2 : boolean  = false;
	var_3 : number  = 0;
	var_4 : number  = 0;
	var_5 : boolean  = false;
	var_6 : number  = 0;
	var_7 : number  = 0;
	var_8 : boolean  = false;
	var_9 : number  = 0;
	var_10 : number  = 0;
	var_11 : boolean  = false;
	var_12 : number  = 1;
	var_13 : boolean  = false;
	var_14 : number  = 2;
	var_15 : boolean  = false;
	
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
	
	get_12() : any
	{
		return this.success ? this.var_12 : undefined;
	}
	
	get_13() : any
	{
		return this.success ? this.var_13 : undefined;
	}
	
	get_14() : any
	{
		return this.success ? this.var_14 : undefined;
	}
	
	get_15() : any
	{
		return this.success ? this.var_15 : undefined;
	}
	save() : void {
		var v = this.variables;
		var x0 = v.get("Formula_1");
		x0?.setIValue(this.get_2());
		var x1 = v.get("Formula_2");
		x1?.setIValue(this.get_5());
		var x2 = v.get("Formula_3");
		x2?.setIValue(this.get_8());
		var x3 = v.get("Formula_4");
		x3?.setIValue(this.get_9());
		var x4 = v.get("Formula_5");
		x4?.setIValue(this.get_11());
		var x5 = v.get("Formula_6");
		x5?.setIValue(this.get_13());
		var x6 = v.get("Formula_7");
		x6?.setIValue(this.get_15());
	}
	
}

class Donchian_CategoryObject_7 extends VectorFormulaConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		let map = new Map<string, any>(
		[
		]);
		this.performer.setAliasMap(map, this);
		this.addVariableValue("Formula_1", false, false);
		this.addVariableValue("Formula_2", false, false);
		this.addVariableValue("Formula_3", 0, 0);
		this.addVariableValue("Formula_4", 0, 0);
		this.addVariableValue("Formula_5", 0, 0);
		this.addVariableValue("Formula_6", 0, 0);
		this.addVariableValue("Formula_7", 0, 0);
	}

		calculateTree() : void
		{
			this.success = true;
			this.variable = this.measurement0.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_0 = this.convert<boolean>(this.variable);
			this.variable = this.measurement1.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_1 = this.convert<number>(this.variable);
			this.variable = (this.var_1) === (this.var_2);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_3 = this.convert<boolean>(this.variable);
			this.variable = (this.var_0) && (this.var_3);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_4 = this.convert<boolean>(this.variable);
			this.variable = this.measurement5.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_5 = this.convert<boolean>(this.variable);
			this.variable = (this.var_4) && (this.var_5);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_6 = this.convert<boolean>(this.variable);
			this.variable = !this.var_0;
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_7 = this.convert<boolean>(this.variable);
			this.variable = (this.var_1) === (this.var_8);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_9 = this.convert<boolean>(this.variable);
			this.variable = (this.var_7) && (this.var_9);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_10 = this.convert<boolean>(this.variable);
			this.variable = (this.var_10) && (this.var_5);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_11 = this.convert<boolean>(this.variable);
			this.variable = (this.var_6) || (this.var_11);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_12 = this.convert<boolean>(this.variable);
			this.variable = (this.var_1) === (this.var_13);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_14 = this.convert<boolean>(this.variable);
			this.variable = this.measurement15.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_15 = this.convert<boolean>(this.variable);
			this.variable = (this.var_14) && (this.var_15);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_16 = this.convert<boolean>(this.variable);
			this.variable = (this.var_1) === (this.var_17);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_18 = this.convert<boolean>(this.variable);
			this.variable = (this.var_18) && (this.var_15);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_19 = this.convert<boolean>(this.variable);
			this.variable = (this.var_0) ? (this.var_16) : (this.var_19);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_20 = this.convert<boolean>(this.variable);
			this.variable = this.measurement21.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_21 = this.convert<boolean>(this.variable);
			this.variable = (this.var_21) && (this.var_5);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_22 = this.convert<boolean>(this.variable);
			this.variable = this.measurement24.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_24 = this.convert<boolean>(this.variable);
			this.variable = (this.var_24) && (this.var_15);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_25 = this.convert<boolean>(this.variable);
			this.variable = (this.var_25) ? (this.var_26) : (this.var_1);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_27 = this.convert<number>(this.variable);
			this.variable = (this.var_22) ? (this.var_23) : (this.var_27);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_28 = this.convert<number>(this.variable);
			this.variable = (this.var_21) && (this.var_15);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_29 = this.convert<boolean>(this.variable);
			this.variable = this.measurement31.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_31 = this.convert<boolean>(this.variable);
			this.variable = (this.var_31) && (this.var_5);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_32 = this.convert<boolean>(this.variable);
			this.variable = (this.var_32) ? (this.var_33) : (this.var_1);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_34 = this.convert<number>(this.variable);
			this.variable = (this.var_29) ? (this.var_30) : (this.var_34);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_35 = this.convert<number>(this.variable);
			this.variable = (this.var_0) ? (this.var_28) : (this.var_35);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_36 = this.convert<number>(this.variable);
			this.variable = (this.var_0) ? (this.var_37) : (this.var_38);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_39 = this.convert<number>(this.variable);
			this.variable = (this.var_5) ? (this.var_40) : (this.var_41);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_42 = this.convert<number>(this.variable);
			this.variable = (this.var_15) ? (this.var_43) : (this.var_44);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_45 = this.convert<number>(this.variable);
			this.variable = this.measurement46.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_46 = this.convert<number>(this.variable);
		}
	
	init() : void
	{
		var all = this.getAllMeasurements();
		this.measurement0 = all[0].getMeasurement(0);
		this.measurement1 = all[1].getMeasurement(1);
		this.measurement5 = all[0].getMeasurement(1);
		this.measurement15 = all[0].getMeasurement(2);
		this.measurement21 = all[0].getMeasurement(4);
		this.measurement24 = all[0].getMeasurement(5);
		this.measurement31 = all[0].getMeasurement(6);
		this.measurement46 = all[0].getMeasurement(3);
	}
	
	measurement0 ! : IMeasurement;
	measurement1 ! : IMeasurement;
	measurement5 ! : IMeasurement;
	measurement15 ! : IMeasurement;
	measurement21 ! : IMeasurement;
	measurement24 ! : IMeasurement;
	measurement31 ! : IMeasurement;
	measurement46 ! : IMeasurement;
	var_0 : boolean  = false;
	var_1 : number  = 0;
	var_2 : number  = 0;
	var_3 : boolean  = false;
	var_4 : boolean  = false;
	var_5 : boolean  = false;
	var_6 : boolean  = false;
	var_7 : boolean  = false;
	var_8 : number  = 2;
	var_9 : boolean  = false;
	var_10 : boolean  = false;
	var_11 : boolean  = false;
	var_12 : boolean  = false;
	var_13 : number  = 1;
	var_14 : boolean  = false;
	var_15 : boolean  = false;
	var_16 : boolean  = false;
	var_17 : number  = 0;
	var_18 : boolean  = false;
	var_19 : boolean  = false;
	var_20 : boolean  = false;
	var_21 : boolean  = false;
	var_22 : boolean  = false;
	var_23 : number  = 1;
	var_24 : boolean  = false;
	var_25 : boolean  = false;
	var_26 : number  = 0;
	var_27 : number  = 0;
	var_28 : number  = 0;
	var_29 : boolean  = false;
	var_30 : number  = 2;
	var_31 : boolean  = false;
	var_32 : boolean  = false;
	var_33 : number  = 0;
	var_34 : number  = 0;
	var_35 : number  = 0;
	var_36 : number  = 0;
	var_37 : number  = 1;
	var_38 : number  = 0;
	var_39 : number  = 0;
	var_40 : number  = 1;
	var_41 : number  = 0;
	var_42 : number  = 0;
	var_43 : number  = 1;
	var_44 : number  = 0;
	var_45 : number  = 0;
	var_46 : number  = 0;
	
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
	
	get_12() : any
	{
		return this.success ? this.var_12 : undefined;
	}
	
	get_13() : any
	{
		return this.success ? this.var_13 : undefined;
	}
	
	get_14() : any
	{
		return this.success ? this.var_14 : undefined;
	}
	
	get_15() : any
	{
		return this.success ? this.var_15 : undefined;
	}
	
	get_16() : any
	{
		return this.success ? this.var_16 : undefined;
	}
	
	get_17() : any
	{
		return this.success ? this.var_17 : undefined;
	}
	
	get_18() : any
	{
		return this.success ? this.var_18 : undefined;
	}
	
	get_19() : any
	{
		return this.success ? this.var_19 : undefined;
	}
	
	get_20() : any
	{
		return this.success ? this.var_20 : undefined;
	}
	
	get_21() : any
	{
		return this.success ? this.var_21 : undefined;
	}
	
	get_22() : any
	{
		return this.success ? this.var_22 : undefined;
	}
	
	get_23() : any
	{
		return this.success ? this.var_23 : undefined;
	}
	
	get_24() : any
	{
		return this.success ? this.var_24 : undefined;
	}
	
	get_25() : any
	{
		return this.success ? this.var_25 : undefined;
	}
	
	get_26() : any
	{
		return this.success ? this.var_26 : undefined;
	}
	
	get_27() : any
	{
		return this.success ? this.var_27 : undefined;
	}
	
	get_28() : any
	{
		return this.success ? this.var_28 : undefined;
	}
	
	get_29() : any
	{
		return this.success ? this.var_29 : undefined;
	}
	
	get_30() : any
	{
		return this.success ? this.var_30 : undefined;
	}
	
	get_31() : any
	{
		return this.success ? this.var_31 : undefined;
	}
	
	get_32() : any
	{
		return this.success ? this.var_32 : undefined;
	}
	
	get_33() : any
	{
		return this.success ? this.var_33 : undefined;
	}
	
	get_34() : any
	{
		return this.success ? this.var_34 : undefined;
	}
	
	get_35() : any
	{
		return this.success ? this.var_35 : undefined;
	}
	
	get_36() : any
	{
		return this.success ? this.var_36 : undefined;
	}
	
	get_37() : any
	{
		return this.success ? this.var_37 : undefined;
	}
	
	get_38() : any
	{
		return this.success ? this.var_38 : undefined;
	}
	
	get_39() : any
	{
		return this.success ? this.var_39 : undefined;
	}
	
	get_40() : any
	{
		return this.success ? this.var_40 : undefined;
	}
	
	get_41() : any
	{
		return this.success ? this.var_41 : undefined;
	}
	
	get_42() : any
	{
		return this.success ? this.var_42 : undefined;
	}
	
	get_43() : any
	{
		return this.success ? this.var_43 : undefined;
	}
	
	get_44() : any
	{
		return this.success ? this.var_44 : undefined;
	}
	
	get_45() : any
	{
		return this.success ? this.var_45 : undefined;
	}
	
	get_46() : any
	{
		return this.success ? this.var_46 : undefined;
	}
	save() : void {
		var v = this.variables;
		var x0 = v.get("Formula_1");
		x0?.setIValue(this.get_12());
		var x1 = v.get("Formula_2");
		x1?.setIValue(this.get_20());
		var x2 = v.get("Formula_3");
		x2?.setIValue(this.get_36());
		var x3 = v.get("Formula_4");
		x3?.setIValue(this.get_39());
		var x4 = v.get("Formula_5");
		x4?.setIValue(this.get_42());
		var x5 = v.get("Formula_6");
		x5?.setIValue(this.get_45());
		var x6 = v.get("Formula_7");
		x6?.setIValue(this.get_46());
	}
	
}

class Donchian_CategoryObject_8 extends VectorFormulaConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		let map = new Map<string, any>(
		[
		]);
		this.performer.setAliasMap(map, this);
		this.addVariableValue("Formula_1", 0, 0);
		this.addVariableValue("Formula_2", 0, 0);
		this.addVariableValue("Formula_3", 0, 0);
		this.addVariableValue("Formula_4", 0, 0);
		this.addVariableValue("Formula_5", 0, 0);
	}

		calculateTree() : void
		{
			this.success = true;
			this.variable = this.measurement0.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_0 = this.convert<boolean>(this.variable);
			this.variable = (this.var_0) ? (this.var_1) : (this.var_2);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_3 = this.convert<number>(this.variable);
			this.variable = this.measurement4.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_4 = this.convert<boolean>(this.variable);
			this.variable = (this.var_4) ? (this.var_5) : (this.var_6);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_7 = this.convert<number>(this.variable);
			this.variable = this.measurement8.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_8 = this.convert<boolean>(this.variable);
			this.variable = (this.var_8) ? (this.var_9) : (this.var_10);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_11 = this.convert<number>(this.variable);
			this.variable = this.measurement12.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_12 = this.convert<boolean>(this.variable);
			this.variable = (this.var_12) ? (this.var_13) : (this.var_14);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_15 = this.convert<number>(this.variable);
			this.variable = this.measurement16.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_16 = this.convert<boolean>(this.variable);
			this.variable = (this.var_16) ? (this.var_17) : (this.var_18);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_19 = this.convert<number>(this.variable);
		}
	
	init() : void
	{
		var all = this.getAllMeasurements();
		this.measurement0 = all[0].getMeasurement(0);
		this.measurement4 = all[0].getMeasurement(1);
		this.measurement8 = all[1].getMeasurement(4);
		this.measurement12 = all[1].getMeasurement(5);
		this.measurement16 = all[1].getMeasurement(6);
	}
	
	measurement0 ! : IMeasurement;
	measurement4 ! : IMeasurement;
	measurement8 ! : IMeasurement;
	measurement12 ! : IMeasurement;
	measurement16 ! : IMeasurement;
	var_0 : boolean  = false;
	var_1 : number  = 1;
	var_2 : number  = 0;
	var_3 : number  = 0;
	var_4 : boolean  = false;
	var_5 : number  = 1;
	var_6 : number  = 0;
	var_7 : number  = 0;
	var_8 : boolean  = false;
	var_9 : number  = 1;
	var_10 : number  = 0;
	var_11 : number  = 0;
	var_12 : boolean  = false;
	var_13 : number  = 1;
	var_14 : number  = 0;
	var_15 : number  = 0;
	var_16 : boolean  = false;
	var_17 : number  = 1;
	var_18 : number  = 0;
	var_19 : number  = 0;
	
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
	
	get_12() : any
	{
		return this.success ? this.var_12 : undefined;
	}
	
	get_13() : any
	{
		return this.success ? this.var_13 : undefined;
	}
	
	get_14() : any
	{
		return this.success ? this.var_14 : undefined;
	}
	
	get_15() : any
	{
		return this.success ? this.var_15 : undefined;
	}
	
	get_16() : any
	{
		return this.success ? this.var_16 : undefined;
	}
	
	get_17() : any
	{
		return this.success ? this.var_17 : undefined;
	}
	
	get_18() : any
	{
		return this.success ? this.var_18 : undefined;
	}
	
	get_19() : any
	{
		return this.success ? this.var_19 : undefined;
	}
	save() : void {
		var v = this.variables;
		var x0 = v.get("Formula_1");
		x0?.setIValue(this.get_3());
		var x1 = v.get("Formula_2");
		x1?.setIValue(this.get_7());
		var x2 = v.get("Formula_3");
		x2?.setIValue(this.get_11());
		var x3 = v.get("Formula_4");
		x3?.setIValue(this.get_15());
		var x4 = v.get("Formula_5");
		x4?.setIValue(this.get_19());
	}
	
}

class Donchian_CategoryObject_9 extends VectorFormulaConsumer
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
			this.variable = this.measurement0.getMeasurementValue();
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_0 = this.convert<number>(this.variable);
			this.variable = (this.var_0) === (this.var_1);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_2 = this.convert<boolean>(this.variable);
			this.variable = (this.var_4) - (this.var_0);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_5 = this.convert<number>(this.variable);
			this.variable = (this.var_2) ? (this.var_3) : (this.var_5);
			if (this.check(this.variable)) { this.success = false; return; } 
			this.var_6 = this.convert<number>(this.variable);
		}
	
	init() : void
	{
		var all = this.getAllMeasurements();
		this.measurement0 = all[0].getMeasurement(2);
	}
	
	measurement0 ! : IMeasurement;
	var_0 : number  = 0;
	var_1 : number  = 0;
	var_2 : boolean  = false;
	var_3 : number  = 0;
	var_4 : number  = 3;
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
		var v = this.variables;
		var x0 = v.get("Formula_1");
		x0?.setIValue(this.get_6());
	}
	
}

class Donchian_CategoryObject_10 extends TradingOrder
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryObject_11 extends DataConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_0 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_1 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_2 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_3 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_4 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_5 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_6 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_7 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_8 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_9 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_10 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_11 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_12 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_13 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_14 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_15 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_16 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_17 extends IteratorConsumerLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_18 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_19 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_20 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_21 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_22 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_23 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_24 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_25 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_26 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_27 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_28 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class Donchian_CategoryArrow_29 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}



export class Donchian extends Desktop
{
	constructor()
	{
		super();

		this.name = "Donchian";

		new Donchian_CategoryObject_0(this, "Trading");
		new Donchian_CategoryObject_1(this, "Average Short");
		new Donchian_CategoryObject_2(this, "Average Long");
		new Donchian_CategoryObject_3(this, "Donchian maximum");
		new Donchian_CategoryObject_4(this, "Donchian minimum");
		new Donchian_CategoryObject_5(this, "Current Position");
		new Donchian_CategoryObject_6(this, "Conditions");
		new Donchian_CategoryObject_7(this, "Sell Buy");
		new Donchian_CategoryObject_8(this, "Additional");
		new Donchian_CategoryObject_9(this, "Position");
		new Donchian_CategoryObject_10(this, "Order");
		new Donchian_CategoryObject_11(this, "Chart");
		new Donchian_CategoryArrow_0(this, "");
		new Donchian_CategoryArrow_1(this, "");
		new Donchian_CategoryArrow_2(this, "");
		new Donchian_CategoryArrow_3(this, "");
		new Donchian_CategoryArrow_4(this, "");
		new Donchian_CategoryArrow_5(this, "");
		new Donchian_CategoryArrow_6(this, "");
		new Donchian_CategoryArrow_7(this, "");
		new Donchian_CategoryArrow_8(this, "");
		new Donchian_CategoryArrow_9(this, "");
		new Donchian_CategoryArrow_10(this, "");
		new Donchian_CategoryArrow_11(this, "");
		new Donchian_CategoryArrow_12(this, "");
		new Donchian_CategoryArrow_13(this, "");
		new Donchian_CategoryArrow_14(this, "");
		new Donchian_CategoryArrow_15(this, "");
		new Donchian_CategoryArrow_16(this, "");
		new Donchian_CategoryArrow_17(this, "");
		new Donchian_CategoryArrow_18(this, "");
		new Donchian_CategoryArrow_19(this, "");
		new Donchian_CategoryArrow_20(this, "");
		new Donchian_CategoryArrow_21(this, "");
		new Donchian_CategoryArrow_22(this, "");
		new Donchian_CategoryArrow_23(this, "");
		new Donchian_CategoryArrow_24(this, "");
		new Donchian_CategoryArrow_25(this, "");
		new Donchian_CategoryArrow_26(this, "");
		new Donchian_CategoryArrow_27(this, "");
		new Donchian_CategoryArrow_28(this, "");
		new Donchian_CategoryArrow_29(this, "");
}

finish() : void
{
		let objects = this.getCategoryObjects();
		let arrows = this.getCategoryArrows();

		arrows[0].setSource(objects[6]);
		arrows[0].setTarget(objects[0]);
		arrows[1].setSource(objects[7]);
		arrows[1].setTarget(objects[6]);
		arrows[2].setSource(objects[8]);
		arrows[2].setTarget(objects[7]);
		arrows[3].setSource(objects[8]);
		arrows[3].setTarget(objects[6]);
		arrows[4].setSource(objects[7]);
		arrows[4].setTarget(objects[5]);
		arrows[5].setSource(objects[6]);
		arrows[5].setTarget(objects[5]);
		arrows[6].setSource(objects[3]);
		arrows[6].setTarget(objects[0]);
		arrows[7].setSource(objects[4]);
		arrows[7].setTarget(objects[0]);
		arrows[8].setSource(objects[1]);
		arrows[8].setTarget(objects[0]);
		arrows[9].setSource(objects[6]);
		arrows[9].setTarget(objects[3]);
		arrows[10].setSource(objects[6]);
		arrows[10].setTarget(objects[4]);
		arrows[11].setSource(objects[2]);
		arrows[11].setTarget(objects[0]);
		arrows[12].setSource(objects[8]);
		arrows[12].setTarget(objects[2]);
		arrows[13].setSource(objects[8]);
		arrows[13].setTarget(objects[1]);
		arrows[14].setSource(objects[6]);
		arrows[14].setTarget(objects[2]);
		arrows[15].setSource(objects[6]);
		arrows[15].setTarget(objects[1]);
		arrows[16].setSource(objects[11]);
		arrows[16].setTarget(objects[7]);
		arrows[17].setSource(objects[11]);
		arrows[17].setTarget(objects[0]);
		arrows[18].setSource(objects[11]);
		arrows[18].setTarget(objects[0]);
		arrows[19].setSource(objects[10]);
		arrows[19].setTarget(objects[0]);
		arrows[20].setSource(objects[10]);
		arrows[20].setTarget(objects[7]);
		arrows[21].setSource(objects[11]);
		arrows[21].setTarget(objects[5]);
		arrows[22].setSource(objects[10]);
		arrows[22].setTarget(objects[5]);
		arrows[23].setSource(objects[11]);
		arrows[23].setTarget(objects[3]);
		arrows[24].setSource(objects[11]);
		arrows[24].setTarget(objects[4]);
		arrows[25].setSource(objects[11]);
		arrows[25].setTarget(objects[2]);
		arrows[26].setSource(objects[11]);
		arrows[26].setTarget(objects[1]);
		arrows[27].setSource(objects[11]);
		arrows[27].setTarget(objects[10]);
		arrows[28].setSource(objects[9]);
		arrows[28].setTarget(objects[7]);
		arrows[29].setSource(objects[10]);
		arrows[29].setTarget(objects[9]);
		(objects[1] as unknown as IPostSetArrow).postSetArrow();
		(objects[2] as unknown as IPostSetArrow).postSetArrow();
		(objects[3] as unknown as IPostSetArrow).postSetArrow();
		(objects[4] as unknown as IPostSetArrow).postSetArrow();
		(objects[5] as unknown as IPostSetArrow).postSetArrow();
		(objects[6] as unknown as IPostSetArrow).postSetArrow();
		(objects[7] as unknown as IPostSetArrow).postSetArrow();
		(objects[8] as unknown as IPostSetArrow).postSetArrow();
		(objects[9] as unknown as IPostSetArrow).postSetArrow();
		(objects[10] as unknown as IPostSetArrow).postSetArrow();
	}
}
