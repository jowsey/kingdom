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

	if (name.endsWith('a') || name.endsWith('e')) return name + 'n';
	if (name.endsWith('n')) return name + 'ese';
	if (name.endsWith('o')) return name + 'an';
	if (name.endsWith('r')) return name + 'ic';
	if (name.endsWith('d') || name.endsWith('n') || name.endsWith('l')) return name + 'ian';
	if (name.endsWith('y') || name.endsWith('u')) return name.slice(0, -1) + 'ian';
	return name + 'an';
}

const populationThresholds = [0, 50, 200, 500, 1000, 2500, 5000, 10000, 20000, 40000, 60000, 100000];
const cityClasses = [
	'hamlet', // 0+
	'quiet village', // 50+
	'growing village', // 200+
	'budding town', // 500+
	'bustling town', // 1000+
	'thriving town', // 2500+
	'nascent city', // 5000+
	'prominent city', // 10000+
	'renowned city', // 20000+
	'metropolis', // 40000+
	'grand metropolis', // 60000+
	'capital' // 100000+
];

export function GetCityClass(population: number): string {
	let index = populationThresholds.findIndex((threshold) => threshold > population);
	if (index === -1) index = populationThresholds.length;
	return cityClasses[index - 1];
}

export function GetNextThreshold(population: number): number {
	return populationThresholds.find((threshold) => threshold > population) || 0;
}

export function toTitleCase(str: string): string {
	return str.replace(/\w\S*/g, function (s) {
		return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
	});
}
