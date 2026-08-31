
import { DataRuntimeConsumer } from "../Library/Runtime/DataRuntimeConsumer";

export class DataConsumerRuntimeTest extends DataRuntimeConsumer {
	static k: number = - 1

	static begin: number = 8
	static end: number = 13
	static first: boolean = true;

	private static get(s: string): boolean {
		DataConsumerRuntimeTest.k++
		let l = DataConsumerRuntimeTest.k
		if (l == DataConsumerRuntimeTest.begin) DataConsumerRuntimeTest.first = true
		if (l >= DataConsumerRuntimeTest.begin && l <= DataConsumerRuntimeTest.end) {
			console.log("get " + s + " ", l)
			return true
		}
		return false
	}

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

}