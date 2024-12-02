import dayjs from 'dayjs';
import { GenerateDemonym } from '$lib/util/Util';
export class Game {
	public static readonly Defaults = {
		PlayerCity: {
			name: 'Unnamedia',
			get automaticDemonym() {
				return GenerateDemonym(this.name.split(' ')[game.Settings.autoDemonymIndex]);
			},
			get demonym() {
				return game.Settings.autoGenerateDemonym || game.Settings.customDemonym.trim().length === 0
					? this.automaticDemonym
					: game.Settings.customDemonym;
			},
			people: {
				peasants: 12,
				artisans: 0,
				merchants: 0,
				get population() {
					return this.peasants + this.artisans + this.merchants;
				}
			}
		},
		Settings: {
			autoGenerateDemonym: true,
			autoDemonymIndex: 0,
			customDemonym: '',
			daysPerSecond: 0.12, // 300 years in (300 * 365) / 0.12 / (60*60) = ~253.4 hours (roughly a month of full working days, so longer in practice),
			debugMode: false,
			enableScrollingText: true
		}
	};

	public Date = $state(dayjs().year(1).month(0).date(1));
	public PlayerCity = $state(Game.Defaults.PlayerCity);
	public Settings = $state(Game.Defaults.Settings);

	private _populationBuffer: number = 0;
	private _animFrameReqId?: ReturnType<typeof requestAnimationFrame>;

	public RunLoop() {
		let lastTickTime = performance.now();
		let lastYearPop = this.PlayerCity.people.population;
		const loop = () => {
			const now = performance.now();
			const elapsed = now - lastTickTime;

			const tickMs = 1000 / this.Settings.daysPerSecond;
			let ticksQueued = Math.floor(elapsed / tickMs);

			while (ticksQueued > 0) {
				const priorYear = this.Date.year();
				this.Date = this.Date.add(1, 'day');
				const newYear = this.Date.year();

				if (priorYear !== newYear) {
					const pop = this.PlayerCity.people.population;
					console.debug(`Year ${newYear}: ${pop.toLocaleString()} pop. (+${(((pop - lastYearPop) / lastYearPop) * 100).toFixed(2)}%)`);
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
