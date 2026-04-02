export interface IEventStart {

    isEventEnabled(): boolean

    setEnabled(enabled: boolean): Promise<void>

}