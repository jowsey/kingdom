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
		let month = game.Time.date.format('MM');
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

	<!-- Page -->
	<div class="flex flex-grow overflow-hidden">
		<!-- Sidebar -->
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
					<p class="font-mono">{game.Time.date.format('YYYY')} - {game.Time.date.format('MM')} - {game.Time.date.format('DD')}</p>
					<div
						class="mx-auto my-2 mt-1 h-1 w-5/6 overflow-hidden rounded-lg bg-gradient-to-r from-gray-950 from-[-15%] via-sky-300 to-gray-950 to-[115%]"
					>
						<div class="h-full bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.75)]" style="width: {game.Time.dayProgress * 100}%;"></div>
					</div>

					<div class="py-2">
						<p class="pb-1 font-serif text-xs capitalize opacity-75">{season}</p>
						<!-- german seems to be the most aggressively hyphenated. works well for demonyms, might cause issues later, we'll see -->
						<p lang="de" class="hyphens-auto break-words font-serif text-sm">{game.PlayerCity.demonym} Era</p>
					</div>
				</div>

				<hr class="mx-auto my-4 w-1/2 border-t-zinc-500" />

				<MenuItem route="/options" label="Options" icon={Cog} />
			</div>
		</div>

		<!-- Page content -->
		<div class="h-full flex-grow overflow-y-auto px-6 py-8">
			<div class="max-w-7xl">
				{@render children()}
			</div>
		</div>
	</div>
</div>
