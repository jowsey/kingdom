<script lang="ts">
	import '../app.css';
	import { Brain, Castle, Cog, Handshake, PersonStanding } from 'lucide-svelte';

	let { children } = $props();
	import MenuItem from '$lib/components/MenuItem.svelte';
	import { kingdomState } from '$lib/state.svelte';
</script>

<svelte:head>
	<title>kingdom: {kingdomState.name}</title>
</svelte:head>

<div class="flex h-screen select-none flex-row bg-tile text-white">
	<div
		class="m-4 flex w-48 flex-col rounded-md border border-zinc-500/75 bg-gradient-to-tl from-zinc-700/25 to-zinc-800/25 px-3 py-4 backdrop-blur-sm"
	>
		<div class="flex flex-row items-baseline justify-between px-1">
			<a href="/" class="font-serif text-2xl transition-all hover:text-orange-300 active:translate-y-0.5">kingdom</a>
			<p class="rounded-lg border border-zinc-600 px-2 text-xs" title={__COMMIT__}>
				v{__VERSION__}
			</p>
		</div>

		<hr class="mx-auto my-4 w-1/2 border-t-zinc-500" />

		<MenuItem route="/" label="Kingdom" icon={Castle} />
		<MenuItem route="/people" label="People" icon={PersonStanding} />
		<MenuItem route="/council" label="Council" icon={Handshake} />
		<MenuItem route="/technology" label="Technology" icon={Brain} />

		<div class="mt-auto">
			<MenuItem route="/options" label="Options" icon={Cog} />
		</div>
	</div>
	<div class="h-full flex-grow overflow-auto px-6 py-8">
		{@render children()}
	</div>
</div>
