import dayjs from 'dayjs';

class Game {
	public DaysPerSecond: number = 1.2;
	public DateState = $state(dayjs().year(1).month(1).date(1));
	public KingdomState = $state({
		name: 'Unnamedia',
		people: {
			peasants: 0,
			artisans: 0,
			merchants: 0,
			get population() {
				return this.peasants + this.artisans + this.merchants;
			}
		},
		resources: {}
	});

	private _loopInterval?: NodeJS.Timer;

	constructor() {}

	public RunLoop() {
		this._loopInterval = setInterval(() => {
			this.DateState = this.DateState.add(1, 'day');
		}, 1000 / this.DaysPerSecond);
	}

	public StopLoop() {
		clearInterval(this._loopInterval);
	}
}

export const game = new Game();
