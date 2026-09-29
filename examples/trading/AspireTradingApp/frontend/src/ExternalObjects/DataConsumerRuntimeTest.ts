
import type { IAction } from "../Library/Interfaces/IAction";
import type { IDataConsumer } from "../Library/Measurements/Interfaces/IDataConsumer";
import { DataRuntimeConsumer } from "../Library/Runtime/DataRuntimeConsumer";

export class DataConsumerRuntimeTest extends DataRuntimeConsumer implements IAction {
    action(): void {
		DataConsumerRuntimeTest.k = 0
    }
	isEmptyAction(): boolean {
		return false;
    }
	static k: number = 0

	static begin: number = 8
	static end: number = 13
	static first: boolean = true;
	static any : any

	public static getm(): boolean {
		let l = DataConsumerRuntimeTest.k
		if (l >= DataConsumerRuntimeTest.begin && l <= DataConsumerRuntimeTest.end) {
			return true
		}
		return false
	}
	public static getk(): number {
		return DataConsumerRuntimeTest.k
	}
	updateRuntime() {
		super.updateRuntime()
		++DataConsumerRuntimeTest.k

	}

	protected prepare(dataConsumer: IDataConsumer): void {
		DataConsumerRuntimeTest.k = 0
		super.prepare(dataConsumer)
    }


	declare any : any
}
