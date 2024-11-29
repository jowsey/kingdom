<script lang="ts">
	import { game } from '$lib/game/Game.svelte';
	import PeopleBox from '$lib/components/people/PeopleBox.svelte';
	import { Coins, Hammer, Wheat } from 'lucide-svelte';
</script>

<p class="font-serif text-2xl">The people of {game.KingdomState.name} are content.</p>
<p class="text-xl">Total population: {game.KingdomState.people.population}</p>

<div class="mt-4 grid grid-cols-3 gap-4">
	<PeopleBox
		icon={Wheat}
		name="Peasants"
		population={game.KingdomState.people.peasants}
		description="Hard-working manual labourers; the backbone of your kingdom."
	/>
	<PeopleBox
		icon={Hammer}
		name="Artisans"
		population={game.KingdomState.people.artisans}
		description="Skilled craftsmen; producers of fine goods."
	/>
	<PeopleBox
		icon={Coins}
		name="Merchants"
		population={game.KingdomState.people.merchants}
		description="Traders and businessmen; generators of wealth."
	/>
</div>
