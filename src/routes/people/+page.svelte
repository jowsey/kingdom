<script lang="ts">
	import { game } from '$lib/game/Game.svelte';
	import PeopleBox from '$lib/components/people/PeopleBox.svelte';
	import { Coins, Hammer, Wheat } from 'lucide-svelte';
</script>

<p class="font-serif text-2xl">The people of {game.City.name} are content.</p>
<p class="text-xl">Total population: {game.TotalPopulation.toLocaleString()}</p>

<div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
	<PeopleBox
		icon={Wheat}
		name="Peasants"
		population={game.City.people.peasants}
		description="Hard-working labourers; the backbone of your kingdom."
	/>
	<PeopleBox
		icon={Hammer}
		name="Artisans"
		population={game.City.people.artisans}
		description="Skilled craftsmen; producers of fine goods and essentials."
	/>
	<PeopleBox
		icon={Coins}
		name="Merchants"
		population={game.City.people.merchants}
		description="Traders and businessmen; they drive wealth to your kingdom."
	/>
</div>
