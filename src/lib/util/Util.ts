export function GenerateDemonym(name: string): string {
	name = name.trim();

	if (name.length === 0) return '???';

	if (name.split(' ').length > 1) {
		name = name.split(' ').pop()!;
	}

	name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

	if (name.endsWith('land')) return name.slice(0, -3) + 'ish';
	if (name.endsWith('ee')) return name.slice(0, -1) + 'an';
	if (name.endsWith('na')) return name.slice(0, -1) + 'ese';
	if (name.endsWith('an')) return name + 'ese';
	if (name.endsWith('ce')) return name + 'n';

	if (name.endsWith('n')) return name + 'ese';
	if (name.endsWith('r')) return name + 'ic';
	if (name.endsWith('a')) return name + 'n';
	if (name.endsWith('o') || name.endsWith('e')) return name + 'an';
	if (name.endsWith('d') || name.endsWith('n') || name.endsWith('l')) return name + 'ian';
	if (name.endsWith('y') || name.endsWith('u')) return name.slice(0, -1) + 'ian';
	return name + 'an';
}

export const CityClass = {
	Hamlet: 'hamlet',
	QuietVillage: 'quiet village',
	GrowingVillage: 'growing village',
	BuddingTown: 'budding town',
	BustlingTown: 'bustling town',
	ThrivingTown: 'thriving town',
	NascentCity: 'nascent city',
	ProminentCity: 'prominent city',
	RenownedCity: 'renowned city',
	Metropolis: 'metropolis',
	GrandMetropolis: 'grand metropolis',
	Capital: 'capital'
};

// Keys are lower bounds/minimums
const populationThresholds = new Map([
	[0, CityClass.Hamlet],
	[50, CityClass.QuietVillage],
	[200, CityClass.GrowingVillage],
	[500, CityClass.BuddingTown],
	[1000, CityClass.BustlingTown],
	[2500, CityClass.ThrivingTown],
	[5000, CityClass.NascentCity],
	[10000, CityClass.ProminentCity],
	[20000, CityClass.RenownedCity],
	[40000, CityClass.Metropolis],
	[60000, CityClass.GrandMetropolis],
	[100000, CityClass.Capital]
]);

// Current class of city based on population
export function GetCityClass(population: number): string {
	let index = 0;
	for (const [threshold] of populationThresholds) {
		if (population >= threshold) index = threshold;
	}
	return populationThresholds.get(index)!;
}

// Population required to reach the next threshold
// -1 if the population is already at the highest threshold
export function GetNextThreshold(population: number): number {
	for (const [threshold] of populationThresholds) {
		if (population < threshold) {
			return threshold;
		}
	}

	return -1;
}

export function toTitleCase(str: string): string {
	return str.replace(/\w\S*/g, function (s) {
		return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
	});
}
