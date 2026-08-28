
import type { IAliasName } from "../../../Library/Interfaces/IAliasName";
import type { IDesktop } from "../../../Library/Interfaces/IDesktop";
import type { IFactory } from "../../../Library/Interfaces/IFactory";
import type { IPostSetArrow } from "../../../Library/Interfaces/IPostSetArrow";
import type { IValue } from "../../../Library/Interfaces/IValue";
import type { IMeasurement } from "../../../Library/Measurements/Interfaces/IMeasurement";
import { AliasName } from "../../../Library/AliasName";
import { Desktop } from "../../../Library/Desktop";
import { DataLink } from "../../../Library/Measurements/Arrows/DataLink";
import { IteratorConsumerLink } from "../../../Library/Measurements/Arrows/IteratorConsumerLink";
import { DataConsumer } from "../../../Library/Measurements/DataConsumer";
import { RecursiveFormula } from "../../../Library/Measurements/RecursiveFormula";
import { SequenceFilterWrapper } from "../../../Library/Measurements/SequenserFilterWrapper";
import { VectorFormulaConsumer } from "../../../Library/Measurements/VectorFormulaConsumer";
import { SequenceFilterType } from "../../../Library/Utilities/Filters/Interfaces/SequenceFilterType";
import { TradingOrder } from "../Components/TradingOrder";
import { TradingDataQuery } from "../Components/TradingDataQuery";
import { FeedbackAliasCollection } from "../../../Library/Measurements/FeedBack/FeedbackAliasCollection";

class DonchianDesktop_CategoryObject_0 extends TradingDataQuery
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.begin = 44929
		this.end = 45260
		this.period = "1 day"
		this.symbol = "AAPL"
	}
}

class DonchianDesktop_CategoryObject_1 extends SequenceFilterWrapper
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.count = 10
		this.input = "Trading.Close"
		this.type = SequenceFilterType.Avarage
	}
}

class DonchianDesktop_CategoryObject_2 extends SequenceFilterWrapper
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.count = 40
		this.input = "Trading.Close"
		this.type = SequenceFilterType.Avarage
	}
}

class DonchianDesktop_CategoryObject_3 extends SequenceFilterWrapper
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.count = 10
		this.input = "Trading.High"
		this.type = SequenceFilterType.Donchian
		this.mimax = true
	}
}

class DonchianDesktop_CategoryObject_4 extends SequenceFilterWrapper
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.count = 10
		this.input = "Trading.Low"
		this.type = SequenceFilterType.Donchian
		this.mimax = false
	}
}

class DonchianDesktop_CategoryObject_5 extends RecursiveFormula
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
		var all = this.getAllMeasurements()
		this.fic = all
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

class DonchianDesktop_CategoryObject_6 extends VectorFormulaConsumer
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
		var all = this.getAllMeasurements()
		this.fic = all
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

class DonchianDesktop_CategoryObject_7 extends VectorFormulaConsumer
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
		var all = this.getAllMeasurements()
		this.fic = all
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
	
	setFeedback(): void {
		let map = new Map<string, string>(
		[
			["Formula_3", "Current Position.t" ]
		]);
		this.feedback = new FeedbackAliasCollection(map, this, this);
	}
}

class DonchianDesktop_CategoryObject_8 extends VectorFormulaConsumer
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
		var all = this.getAllMeasurements()
		this.fic = all
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

class DonchianDesktop_CategoryObject_9 extends VectorFormulaConsumer
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
		}
	
	init() : void
	{
		var all = this.getAllMeasurements()
		this.fic = all
		this.measurement0 = all[0].getMeasurement(2);
	}
	
	measurement0 ! : IMeasurement;
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
	
	setFeedback(): void {
		let map = new Map<string, string>(
		[
			["Formula_1", "Current Position.t" ]
		]);
		this.feedback = new FeedbackAliasCollection(map, this, this);
	}
}

class DonchianDesktop_CategoryObject_10 extends TradingOrder
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
		this.position = "Position.Formula_1"
		this.buyPrice = "Trading.Close"
		this.sellPrice = "Trading.Close"
		this.date = "Trading.FullTime"
	}
}

class DonchianDesktop_CategoryObject_11 extends DataConsumer
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_0 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_1 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_2 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_3 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_4 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_5 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_6 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_7 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_8 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_9 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_10 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_11 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_12 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_13 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_14 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_15 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_16 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_17 extends IteratorConsumerLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_18 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_19 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_20 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_21 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_22 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_23 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_24 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_25 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_26 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_27 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_28 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_29 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_30 extends IteratorConsumerLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_31 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}

class DonchianDesktop_CategoryArrow_32 extends DataLink
{
	constructor(desktop: IDesktop, name: string)
	{
		super(desktop, name);
	}
}



export class DonchianDesktop extends Desktop
{

	public static async getDesktopAsync(controller : AbortController, factory?: IFactory): Promise<IDesktop> {
		let d = new DonchianDesktop(factory)
		await d.loadAsync(controller)
		return d
	}

	constructor(factory? : IFactory)
	{
		super(factory);

		this.name = "DonchianDesktop";

		this.mapObjects.set("DonchianDesktop_CategoryObject_0", new DonchianDesktop_CategoryObject_0(this, "Trading"))
		this.mapObjects.set("DonchianDesktop_CategoryObject_1", new DonchianDesktop_CategoryObject_1(this, "Average Short"))
		this.mapObjects.set("DonchianDesktop_CategoryObject_2", new DonchianDesktop_CategoryObject_2(this, "Average Long"))
		this.mapObjects.set("DonchianDesktop_CategoryObject_3", new DonchianDesktop_CategoryObject_3(this, "Donchian maximum"))
		this.mapObjects.set("DonchianDesktop_CategoryObject_4", new DonchianDesktop_CategoryObject_4(this, "Donchian minimum"))
		this.mapObjects.set("DonchianDesktop_CategoryObject_5", new DonchianDesktop_CategoryObject_5(this, "Current Position"))
		this.mapObjects.set("DonchianDesktop_CategoryObject_6", new DonchianDesktop_CategoryObject_6(this, "Conditions"))
		this.mapObjects.set("DonchianDesktop_CategoryObject_7", new DonchianDesktop_CategoryObject_7(this, "Sell Buy"))
		this.mapObjects.set("DonchianDesktop_CategoryObject_8", new DonchianDesktop_CategoryObject_8(this, "Additional"))
		this.mapObjects.set("DonchianDesktop_CategoryObject_9", new DonchianDesktop_CategoryObject_9(this, "Position"))
		this.mapObjects.set("DonchianDesktop_CategoryObject_10", new DonchianDesktop_CategoryObject_10(this, "Order"))
		this.mapObjects.set("DonchianDesktop_CategoryObject_11", new DonchianDesktop_CategoryObject_11(this, "Chart"))
		new DonchianDesktop_CategoryArrow_0(this, "");
		new DonchianDesktop_CategoryArrow_1(this, "");
		new DonchianDesktop_CategoryArrow_2(this, "");
		new DonchianDesktop_CategoryArrow_3(this, "");
		new DonchianDesktop_CategoryArrow_4(this, "");
		new DonchianDesktop_CategoryArrow_5(this, "");
		new DonchianDesktop_CategoryArrow_6(this, "");
		new DonchianDesktop_CategoryArrow_7(this, "");
		new DonchianDesktop_CategoryArrow_8(this, "");
		new DonchianDesktop_CategoryArrow_9(this, "");
		new DonchianDesktop_CategoryArrow_10(this, "");
		new DonchianDesktop_CategoryArrow_11(this, "");
		new DonchianDesktop_CategoryArrow_12(this, "");
		new DonchianDesktop_CategoryArrow_13(this, "");
		new DonchianDesktop_CategoryArrow_14(this, "");
		new DonchianDesktop_CategoryArrow_15(this, "");
		new DonchianDesktop_CategoryArrow_16(this, "");
		new DonchianDesktop_CategoryArrow_17(this, "");
		new DonchianDesktop_CategoryArrow_18(this, "");
		new DonchianDesktop_CategoryArrow_19(this, "");
		new DonchianDesktop_CategoryArrow_20(this, "");
		new DonchianDesktop_CategoryArrow_21(this, "");
		new DonchianDesktop_CategoryArrow_22(this, "");
		new DonchianDesktop_CategoryArrow_23(this, "");
		new DonchianDesktop_CategoryArrow_24(this, "");
		new DonchianDesktop_CategoryArrow_25(this, "");
		new DonchianDesktop_CategoryArrow_26(this, "");
		new DonchianDesktop_CategoryArrow_27(this, "");
		new DonchianDesktop_CategoryArrow_28(this, "");
		new DonchianDesktop_CategoryArrow_29(this, "");
		new DonchianDesktop_CategoryArrow_30(this, "");
		new DonchianDesktop_CategoryArrow_31(this, "");
		new DonchianDesktop_CategoryArrow_32(this, "");
}

finish() : void
{
		let objects = this.getCategoryObjects();
		let arrows = this.getCategoryArrows();

		let s0 = this.mapObjects.get("DonchianDesktop_CategoryObject_6")
		if(s0 != undefined)    arrows[0].setSource(s0);
		let t0 = this.mapObjects.get("DonchianDesktop_CategoryObject_0")
		if(t0 != undefined)    arrows[0].setTarget(t0);
		let s1 = this.mapObjects.get("DonchianDesktop_CategoryObject_7")
		if(s1 != undefined)    arrows[1].setSource(s1);
		let t1 = this.mapObjects.get("DonchianDesktop_CategoryObject_6")
		if(t1 != undefined)    arrows[1].setTarget(t1);
		let s2 = this.mapObjects.get("DonchianDesktop_CategoryObject_8")
		if(s2 != undefined)    arrows[2].setSource(s2);
		let t2 = this.mapObjects.get("DonchianDesktop_CategoryObject_7")
		if(t2 != undefined)    arrows[2].setTarget(t2);
		let s3 = this.mapObjects.get("DonchianDesktop_CategoryObject_8")
		if(s3 != undefined)    arrows[3].setSource(s3);
		let t3 = this.mapObjects.get("DonchianDesktop_CategoryObject_6")
		if(t3 != undefined)    arrows[3].setTarget(t3);
		let s4 = this.mapObjects.get("DonchianDesktop_CategoryObject_7")
		if(s4 != undefined)    arrows[4].setSource(s4);
		let t4 = this.mapObjects.get("DonchianDesktop_CategoryObject_5")
		if(t4 != undefined)    arrows[4].setTarget(t4);
		let s5 = this.mapObjects.get("DonchianDesktop_CategoryObject_6")
		if(s5 != undefined)    arrows[5].setSource(s5);
		let t5 = this.mapObjects.get("DonchianDesktop_CategoryObject_5")
		if(t5 != undefined)    arrows[5].setTarget(t5);
		let s6 = this.mapObjects.get("DonchianDesktop_CategoryObject_3")
		if(s6 != undefined)    arrows[6].setSource(s6);
		let t6 = this.mapObjects.get("DonchianDesktop_CategoryObject_0")
		if(t6 != undefined)    arrows[6].setTarget(t6);
		let s7 = this.mapObjects.get("DonchianDesktop_CategoryObject_4")
		if(s7 != undefined)    arrows[7].setSource(s7);
		let t7 = this.mapObjects.get("DonchianDesktop_CategoryObject_0")
		if(t7 != undefined)    arrows[7].setTarget(t7);
		let s8 = this.mapObjects.get("DonchianDesktop_CategoryObject_1")
		if(s8 != undefined)    arrows[8].setSource(s8);
		let t8 = this.mapObjects.get("DonchianDesktop_CategoryObject_0")
		if(t8 != undefined)    arrows[8].setTarget(t8);
		let s9 = this.mapObjects.get("DonchianDesktop_CategoryObject_6")
		if(s9 != undefined)    arrows[9].setSource(s9);
		let t9 = this.mapObjects.get("DonchianDesktop_CategoryObject_3")
		if(t9 != undefined)    arrows[9].setTarget(t9);
		let s10 = this.mapObjects.get("DonchianDesktop_CategoryObject_6")
		if(s10 != undefined)    arrows[10].setSource(s10);
		let t10 = this.mapObjects.get("DonchianDesktop_CategoryObject_4")
		if(t10 != undefined)    arrows[10].setTarget(t10);
		let s11 = this.mapObjects.get("DonchianDesktop_CategoryObject_2")
		if(s11 != undefined)    arrows[11].setSource(s11);
		let t11 = this.mapObjects.get("DonchianDesktop_CategoryObject_0")
		if(t11 != undefined)    arrows[11].setTarget(t11);
		let s12 = this.mapObjects.get("DonchianDesktop_CategoryObject_8")
		if(s12 != undefined)    arrows[12].setSource(s12);
		let t12 = this.mapObjects.get("DonchianDesktop_CategoryObject_2")
		if(t12 != undefined)    arrows[12].setTarget(t12);
		let s13 = this.mapObjects.get("DonchianDesktop_CategoryObject_8")
		if(s13 != undefined)    arrows[13].setSource(s13);
		let t13 = this.mapObjects.get("DonchianDesktop_CategoryObject_1")
		if(t13 != undefined)    arrows[13].setTarget(t13);
		let s14 = this.mapObjects.get("DonchianDesktop_CategoryObject_6")
		if(s14 != undefined)    arrows[14].setSource(s14);
		let t14 = this.mapObjects.get("DonchianDesktop_CategoryObject_2")
		if(t14 != undefined)    arrows[14].setTarget(t14);
		let s15 = this.mapObjects.get("DonchianDesktop_CategoryObject_6")
		if(s15 != undefined)    arrows[15].setSource(s15);
		let t15 = this.mapObjects.get("DonchianDesktop_CategoryObject_1")
		if(t15 != undefined)    arrows[15].setTarget(t15);
		let s16 = this.mapObjects.get("DonchianDesktop_CategoryObject_11")
		if(s16 != undefined)    arrows[16].setSource(s16);
		let t16 = this.mapObjects.get("DonchianDesktop_CategoryObject_7")
		if(t16 != undefined)    arrows[16].setTarget(t16);
		let s17 = this.mapObjects.get("DonchianDesktop_CategoryObject_11")
		if(s17 != undefined)    arrows[17].setSource(s17);
		let t17 = this.mapObjects.get("DonchianDesktop_CategoryObject_0")
		if(t17 != undefined)    arrows[17].setTarget(t17);
		let s18 = this.mapObjects.get("DonchianDesktop_CategoryObject_11")
		if(s18 != undefined)    arrows[18].setSource(s18);
		let t18 = this.mapObjects.get("DonchianDesktop_CategoryObject_0")
		if(t18 != undefined)    arrows[18].setTarget(t18);
		let s19 = this.mapObjects.get("DonchianDesktop_CategoryObject_10")
		if(s19 != undefined)    arrows[19].setSource(s19);
		let t19 = this.mapObjects.get("DonchianDesktop_CategoryObject_0")
		if(t19 != undefined)    arrows[19].setTarget(t19);
		let s20 = this.mapObjects.get("DonchianDesktop_CategoryObject_10")
		if(s20 != undefined)    arrows[20].setSource(s20);
		let t20 = this.mapObjects.get("DonchianDesktop_CategoryObject_7")
		if(t20 != undefined)    arrows[20].setTarget(t20);
		let s21 = this.mapObjects.get("DonchianDesktop_CategoryObject_11")
		if(s21 != undefined)    arrows[21].setSource(s21);
		let t21 = this.mapObjects.get("DonchianDesktop_CategoryObject_5")
		if(t21 != undefined)    arrows[21].setTarget(t21);
		let s22 = this.mapObjects.get("DonchianDesktop_CategoryObject_10")
		if(s22 != undefined)    arrows[22].setSource(s22);
		let t22 = this.mapObjects.get("DonchianDesktop_CategoryObject_5")
		if(t22 != undefined)    arrows[22].setTarget(t22);
		let s23 = this.mapObjects.get("DonchianDesktop_CategoryObject_11")
		if(s23 != undefined)    arrows[23].setSource(s23);
		let t23 = this.mapObjects.get("DonchianDesktop_CategoryObject_3")
		if(t23 != undefined)    arrows[23].setTarget(t23);
		let s24 = this.mapObjects.get("DonchianDesktop_CategoryObject_11")
		if(s24 != undefined)    arrows[24].setSource(s24);
		let t24 = this.mapObjects.get("DonchianDesktop_CategoryObject_4")
		if(t24 != undefined)    arrows[24].setTarget(t24);
		let s25 = this.mapObjects.get("DonchianDesktop_CategoryObject_11")
		if(s25 != undefined)    arrows[25].setSource(s25);
		let t25 = this.mapObjects.get("DonchianDesktop_CategoryObject_2")
		if(t25 != undefined)    arrows[25].setTarget(t25);
		let s26 = this.mapObjects.get("DonchianDesktop_CategoryObject_11")
		if(s26 != undefined)    arrows[26].setSource(s26);
		let t26 = this.mapObjects.get("DonchianDesktop_CategoryObject_1")
		if(t26 != undefined)    arrows[26].setTarget(t26);
		let s27 = this.mapObjects.get("DonchianDesktop_CategoryObject_11")
		if(s27 != undefined)    arrows[27].setSource(s27);
		let t27 = this.mapObjects.get("DonchianDesktop_CategoryObject_10")
		if(t27 != undefined)    arrows[27].setTarget(t27);
		let s28 = this.mapObjects.get("DonchianDesktop_CategoryObject_9")
		if(s28 != undefined)    arrows[28].setSource(s28);
		let t28 = this.mapObjects.get("DonchianDesktop_CategoryObject_7")
		if(t28 != undefined)    arrows[28].setTarget(t28);
		let s29 = this.mapObjects.get("DonchianDesktop_CategoryObject_10")
		if(s29 != undefined)    arrows[29].setSource(s29);
		let t29 = this.mapObjects.get("DonchianDesktop_CategoryObject_9")
		if(t29 != undefined)    arrows[29].setTarget(t29);
		let s30 = this.mapObjects.get("DonchianDesktop_CategoryObject_10")
		if(s30 != undefined)    arrows[30].setSource(s30);
		let t30 = this.mapObjects.get("DonchianDesktop_CategoryObject_0")
		if(t30 != undefined)    arrows[30].setTarget(t30);
		let s31 = this.mapObjects.get("DonchianDesktop_CategoryObject_11")
		if(s31 != undefined)    arrows[31].setSource(s31);
		let t31 = this.mapObjects.get("DonchianDesktop_CategoryObject_9")
		if(t31 != undefined)    arrows[31].setTarget(t31);
		let s32 = this.mapObjects.get("DonchianDesktop_CategoryObject_9")
		if(s32 != undefined)    arrows[32].setSource(s32);
		let t32 = this.mapObjects.get("DonchianDesktop_CategoryObject_5")
		if(t32 != undefined)    arrows[32].setTarget(t32);
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
		(objects[11] as unknown as IPostSetArrow).postSetArrow();
	}
}
