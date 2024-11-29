export function GenerateDemonym(name: string): string {
	if (name.split(' ').length > 1) {
		name = name.split(' ').pop()!;
	}

	name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

	if (name.endsWith('a') || name.endsWith('e') || name.endsWith('o') || name.endsWith('u')) return name + 'n';
	if (name.endsWith('y')) return name.slice(0, -1) + 'ian';
	if (name.endsWith('d') || name.endsWith('n')) return name + 'ian';
	if (name.endsWith('land')) return name.slice(0, -3) + 'ish';
	if (name.endsWith('stan')) return name + 'i';
	return name + 'an';
}
