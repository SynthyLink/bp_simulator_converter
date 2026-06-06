export class ThreeTimer {

	_previousTime: number = 0;
	_currentTime: number = 0;
	_startTime: number = performance.now();

	_delta: number = 0;
	_elapsed: number = 0;

	_timescale: number = 1;

	_pageVisibilityHandler: any

	_document: Document | undefined = undefined


	/**
	 * Constructs a new timer.
	 */
	constructor() {

		this._previousTime = 0;
		this._currentTime = 0;
		this._startTime = performance.now();

		this._delta = 0;
		this._elapsed = 0;

		this._timescale = 1;

		this._pageVisibilityHandler = null;

	}

	/**
	 * Connect the timer to the given document.Calling this method is not mandatory to
	 * use the timer but enables the usage of the Page Visibility API to avoid large time
	 * delta values.
	 *
	 * @param {Document} document - The document.
	 */
	connect(document: Document): void {

		this._document = document;

		// use Page Visibility API to avoid large time delta values

		if (document.hidden !== undefined) {

			this._pageVisibilityHandler = this.handleVisibilityChange.bind(this);

			document.addEventListener('visibilitychange', this._pageVisibilityHandler, false);

		}

	}

	/**
	 * Disconnects the timer from the DOM and also disables the usage of the Page Visibility API.
	 */
	disconnect(): void {

		if (this._pageVisibilityHandler !== null) {
			if (this._document != undefined) {
				this._document.removeEventListener('visibilitychange', this._pageVisibilityHandler);
				this._pageVisibilityHandler = null;
			}

		}

		this._document = undefined;

	}

	/**
	 * Returns the time delta in seconds.
	 *
	 * @return {number} The time delta in second.
	 */
	getDelta(): number {

		return this._delta / 1000;

	}

	/**
	 * Returns the elapsed time in seconds.
	 *
	 * @return {number} The elapsed time in second.
	 */
	getElapsed(): number {

		return this._elapsed / 1000;

	}

	/**
	 * Returns the timescale.
	 *
	 * @return {number} The timescale.
	 */
	getTimescale(): number {

		return this._timescale;

	}

	/**
	 * Sets the given timescale which scale the time delta computation
	 * in `update()`.
	 *
	 * @param {number} timescale - The timescale to set.
	 * @return {Timer} A reference to this timer.
	 */
	setTimescale(timescale: number): ThreeTimer {

		this._timescale = timescale;

		return this;

	}

	/**
	 * Resets the time computation for the current simulation step.
	 *
	 * @return {Timer} A reference to this timer.
	 */
	reset(): ThreeTimer {

		this._currentTime = performance.now() - this._startTime;

		return this;

	}

	/**
	 * Can be used to free all internal resources. Usually called when
	 * the timer instance isn't required anymore.
	 */
	dispose(): void {

		this.disconnect();

	}

	/**
	 * Updates the internal state of the timer. This method should be called
	 * once per simulation step and before you perform queries against the timer
	 * (e.g. via `getDelta()`).
	 *
	 * @param {number} timestamp - The current time in milliseconds. Can be obtained
	 * from the `requestAnimationFrame` callback argument. If not provided, the current
	 * time will be determined with `performance.now`.
	 * @return {Timer} A reference to this timer.
	 */
	update(timestamp: number) {
		if (this._document === undefined) return
		if (this._pageVisibilityHandler !== null && this._document.hidden === true) {

			this._delta = 0;

		} else {

			this._previousTime = this._currentTime;
			this._currentTime = (timestamp !== undefined ? timestamp : performance.now()) - this._startTime;

			this._delta = (this._currentTime - this._previousTime) * this._timescale;
			this._elapsed += this._delta; // _elapsed is the accumulation of all previous deltas

		}

		return this;

	}




	handleVisibilityChange(): void {
		if (this._document === undefined) return

		if (this._document.hidden === false) this.reset();

	}
}
