<script lang="ts">
	import { kingdomState } from '$lib/state.svelte';
	import Option from '$lib/components/options/Option.svelte';
</script>

<p class="mb-8 font-serif text-4xl">Options</p>

<Option label="Rename your kingdom:">
	<input
		maxlength="32"
		class="w-96 border-b border-zinc-500/75 bg-transparent p-2 font-serif text-xl outline-none"
		placeholder="your kingdom"
		spellcheck="false"
		bind:value={kingdomState.name}
	/>
</Option>
