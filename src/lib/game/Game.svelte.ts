import dayjs from 'dayjs';

class Game {
	public static readonly Defaults = {
		PlayerCity: {
			name: 'Unnamedia',
			people: {
				peasants: 0,
				artisans: 0,
				merchants: 0,
				get population() {
					return this.peasants + this.artisans + this.merchants;
				}
			},
		}
	};

	public DaysPerSecond: number = 1.1;
	public DateState = $state(dayjs().year(1).month(1).date(1));
	public PlayerCity = $state(Game.Defaults.PlayerCity);

	private _loopInterval?: ReturnType<typeof setInterval>;

	public RunLoop() {
		this._loopInterval = setInterval(() => {
			this.DateState = this.DateState.add(1, 'day');
		}, 1000 / this.DaysPerSecond);
	}

	public StopLoop() {
		if (this._loopInterval) clearInterval(this._loopInterval);
	}
}

const game = new Game();
export { Game, game };
