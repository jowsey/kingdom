export const kingdomState = $state({
	name: 'your kingdom',
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
