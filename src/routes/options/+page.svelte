<script lang="ts">
	import Option from '$lib/components/options/Option.svelte';
	import { Game, game } from '$lib/game/Game.svelte';
	import { onDestroy } from 'svelte';
	import { GetCityClass, toTitleCase } from '$lib/util/Util';

	onDestroy(() => {
		if (game.PlayerCity.name === '') {
			game.PlayerCity.name = Game.Defaults.PlayerCity.name;
		}
	});
</script>

<p class="mb-8 font-serif text-4xl">Options</p>

<Option label="Rename your land:">
	The {toTitleCase(GetCityClass(game.PlayerCity.people.population))} of
	<input
		type="text"
		name="kingdom-name"
		maxlength="32"
		class="w-full max-w-96 border-b border-zinc-500/75 bg-transparent p-2 font-serif text-xl outline-none"
		placeholder={Game.Defaults.PlayerCity.name}
		spellcheck="false"
		bind:value={game.PlayerCity.name}
	/>
</Option>
