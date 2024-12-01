import dayjs from 'dayjs';

export class Game {
	public static readonly Defaults = {
		PlayerCity: {
			name: 'Unnamedia',
			people: {
				peasants: 12,
				artisans: 0,
				merchants: 0,
				get population() {
					return this.peasants + this.artisans + this.merchants;
				}
			}
		}
	};

	public readonly DaysPerSecond: number = 1.1;

	public Date = $state(dayjs().year(1).month(0).date(1));
	public PlayerCity = $state(Game.Defaults.PlayerCity);

	private _populationBuffer: number = 0;
	private _animFrameReqId?: ReturnType<typeof requestAnimationFrame>;

	public RunLoop() {
		const tickMs = 1000 / this.DaysPerSecond;

		let lastTickTime = performance.now();
		let lastYearPop = this.PlayerCity.people.population;
		const loop = () => {
			const now = performance.now();
			const elapsed = now - lastTickTime;

			let ticksQueued = Math.floor(elapsed / tickMs);

			if (elapsed > 1000) {
				console.debug(`Long delta time: ${Math.floor(elapsed)}ms (tab was probably inactive)`);
			}

			while (ticksQueued > 0) {
				const priorYear = this.Date.year();
				this.Date = this.Date.add(1, 'day');
				const newYear = this.Date.year();

				if (priorYear !== newYear) {
					const pop = this.PlayerCity.people.population;
					console.debug(`Year ${newYear}: ${pop.toLocaleString()} (+${(((pop - lastYearPop) / lastYearPop) * 100).toFixed(2)}%)`);
					lastYearPop = pop;
				}

				this.Tick();
				lastTickTime = now;
				ticksQueued--;
			}

			// todo move to worker (otherwise might be paused when tab is inactive?)
			// actually might be fine because we keep catch up when resuming(???)
			this._animFrameReqId = requestAnimationFrame(loop);
		};

		loop();
	}

	private Tick() {
		// with no other modifiers, this leaves us at ~60k peasants after ~300 years (roughly modeled after London's growth)
		// this should trend low so that upgrades and whatnot can build on it later (after upgrades we should be hitting 100-120k ish)
		const dailyGrowth = 0.4 + this.PlayerCity.people.population * 0.000006;
		this._populationBuffer += dailyGrowth;

		if (this._populationBuffer >= 1) {
			this.PlayerCity.people.peasants += Math.floor(this._populationBuffer);
			this._populationBuffer -= Math.floor(this._populationBuffer);
		}
	}

	public StopLoop() {
		if (this._animFrameReqId) cancelAnimationFrame(this._animFrameReqId);
	}
}

export const game = new Game();
