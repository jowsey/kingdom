<script lang="ts">
	import { game } from '$lib/game/Game.svelte';
	import { GetCityClass } from '$lib/util/Util';
</script>

<p class="font-serif text-2xl">A new settlement called {game.City.name} is formed.</p>
<p>{game.City.name} is a {GetCityClass(game.TotalPopulation)} with {game.TotalPopulation.toLocaleString()} inhabitants.</p>
