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

// Keys are lower bounds/minimums
const populationThresholds = new Map([
	[0, 'hamlet'],
	[50, 'quiet village'],
	[200, 'growing village'],
	[500, 'budding town'],
	[1000, 'bustling town'],
	[2500, 'thriving town'],
	[5000, 'nascent city'],
	[10000, 'prominent city'],
	[20000, 'renowned city'],
	[40000, 'metropolis'],
	[60000, 'grand metropolis'],
	[100000, 'capital']
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
