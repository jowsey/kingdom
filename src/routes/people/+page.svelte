<script lang="ts">
	import { game } from '$lib/game/Game.svelte';
</script>

<p class="font-serif text-2xl">The people of {game.KingdomState.name} are content.</p>
<p class="text-xl">Population: {game.KingdomState.people.population}</p>
