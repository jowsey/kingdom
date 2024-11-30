<script lang="ts">
	import Option from '$lib/components/options/Option.svelte';
	import { Game, game } from '$lib/game/Game.svelte';
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		if (game.KingdomState.name === '') {
			game.KingdomState.name = Game.DefaultKingdomState.name;
		}
	});
</script>

<p class="mb-8 font-serif text-4xl">Options</p>

<Option label="Rename your kingdom:">
	The Kingdom of
	<input
		maxlength="32"
		class="w-full max-w-96 border-b border-zinc-500/75 bg-transparent p-2 font-serif text-xl outline-none"
		placeholder="your kingdom"
		spellcheck="false"
		bind:value={game.KingdomState.name}
	/>
</Option>
