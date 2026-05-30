import type { IAction } from "../Interfaces/IAction";
import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IFactory } from "../Interfaces/IFactory";
import { ActionWatch } from "../Utilities/Watch/AcrionWatch";
import { ScadaDesktopEngine } from "./ScadaDesktopEngine";

export class ScadaActionInterval extends ScadaDesktopEngine implements IActionAddRemove {
	constructor(componentCollection: IComponentCollection, action: IActionAddRemove, interval: number, factory: IFactory, chart: string) {
		super(componentCollection, new ActionWatch(interval, action), factory, chart)
		this.actionr = action;
	}
	addAction(action: IAction | undefined): void {
		this.actionr.addAction(action);
    }
	removeAction(action: IAction | undefined): void {
		this.actionr.removeAction(action);
    }
	clearActions(): void {
		this.actionr.clearActions()
    }
	action(): void {
		this.actionr.action();
    }
	isEmptyAction(): boolean {
		return this.actionr.isEmptyAction()
    }

	actionr: IActionAddRemove


	
}
