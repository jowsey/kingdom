<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { game } from '$lib/game/Game.svelte';
	import { GetCityClass, GetNextThreshold, toTitleCase } from '$lib/util/Util';
	import { Brain, Castle, Cog, Handshake, PersonStanding } from 'lucide-svelte';
	import MenuItem from '$lib/components/MenuItem.svelte';
	import TopBar from '$lib/components/TopBar.svelte';

	let { children } = $props();

	let season = $derived.by(() => {
		let month = game.Date.format('MM');
		if (month === '12' || month === '01' || month === '02') return 'Winter';
		if (month === '03' || month === '04' || month === '05') return 'Spring';
		if (month === '06' || month === '07' || month === '08') return 'Summer';
		if (month === '09' || month === '10' || month === '11') return 'Autumn';
	});

	onMount(() => {
		game.RunLoop();

		return () => {
			game.StopLoop();
		};
	});
</script>

<svelte:head>
	<title>kingdom: {game.PlayerCity.name}</title>
</svelte:head>

<div class="flex h-screen select-none flex-col bg-tile text-white">
	<TopBar />

	<div class="flex flex-grow">
		<div
			class="m-4 flex w-48 min-w-48 flex-col rounded-md border border-zinc-500/75 bg-gradient-to-tl from-zinc-700/25 to-zinc-800/25 px-3 py-4 backdrop-blur-sm"
		>
			<div class="flex items-baseline justify-between gap-x-2 px-1">
				<a href="/" class="font-serif text-2xl transition-all hover:text-orange-300 active:translate-y-0.5">kingdom</a>
				<p class="rounded-lg border border-zinc-600 px-2 text-xs" title={__COMMIT__}>
					v{__VERSION__}
				</p>
			</div>

			<div class="my-2 text-center">
				<p class="text-sm">{toTitleCase(GetCityClass(game.PlayerCity.people.population))}</p>
				{#if GetNextThreshold(game.PlayerCity.people.population) > 0}
					<p class="text-xs opacity-50">
						<span class="font-mono">{game.PlayerCity.people.population.toLocaleString()}</span> /
						<span class="font-mono">{GetNextThreshold(game.PlayerCity.people.population).toLocaleString()}</span>
					</p>
				{/if}
			</div>

			<hr class="mx-auto mb-2 w-1/2 border-t-zinc-500" />

			<MenuItem route="/" label="Overview" icon={Castle} />
			<MenuItem route="/people" label="People" icon={PersonStanding} />
			<MenuItem route="/council" label="Council" icon={Handshake} />
			<MenuItem route="/technology" label="Technology" icon={Brain} />

			<div class="mt-auto">
				<div class="text-center">
					<p class="font-mono">{game.Date.format('YYYY')} - {game.Date.format('MM')} - {game.Date.format('DD')}</p>
					<!-- german seems to be the most aggressively hyphenated. works well for demonyms, might cause issues later, we'll see -->
					<p lang="de" class="hyphens-auto break-words font-serif text-sm">{game.PlayerCity.demonym} Era</p>

					<p class="pt-2 font-serif text-xs capitalize opacity-75">{season}</p>
				</div>

				<hr class="mx-auto my-4 w-1/2 border-t-zinc-500" />

				<MenuItem route="/options" label="Options" icon={Cog} />
			</div>
		</div>

		<!-- Page content -->
		<div class="container h-full flex-grow overflow-auto px-6 py-8">
			{@render children()}
		</div>
	</div>
</div>
