<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
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
		if (game.HasSettled) {
			game.RunLoop();
		}

		const saveFunc = () => game.SaveState(); // named to retain reference for removal
		window.addEventListener('beforeunload', saveFunc);

		return () => {
			game.StopLoop();
			window.removeEventListener('beforeunload', saveFunc);
		};
	});
</script>

<svelte:head>
	{#if game.HasSettled}
		<title>kingdom: {game.City.name}</title>
	{/if}
</svelte:head>

<div class="flex h-screen select-none flex-col text-white">
	<TopBar />

	<!-- Page -->
	<div class="flex flex-grow overflow-hidden">
		<!-- Sidebar -->
		{#if game.HasSettled}
			<div
				transition:blur
				class="m-4 flex w-48 min-w-48 flex-col rounded-md border border-zinc-500/75 bg-gradient-to-tl from-zinc-700/25 to-zinc-800/25 px-3 py-4 backdrop-blur-sm"
			>
				<div class="flex items-baseline justify-between gap-x-2 px-1">
					<p class="font-serif text-2xl">kingdom</p>
					<p class="rounded-lg border border-zinc-600 px-2 text-xs" title={__COMMIT__}>
						v{__VERSION__}
					</p>
				</div>

				<div class="my-2 text-center">
					<p class="text-sm">{toTitleCase(GetCityClass(game.TotalPopulation))}</p>
					{#if GetNextThreshold(game.TotalPopulation) !== -1}
						<p class="text-xs opacity-50">
							<span class="font-mono">{game.TotalPopulation.toLocaleString()}</span> /
							<span class="font-mono">{GetNextThreshold(game.TotalPopulation).toLocaleString()}</span>
						</p>
					{/if}
				</div>

				<hr class="mx-auto mb-2 w-1/2 border-t-zinc-500" />

				<MenuItem route="/" label="City" icon={Castle} />
				<MenuItem route="/people" label="People" icon={PersonStanding} />
				<MenuItem route="/council" label="Council" icon={Handshake} />
				<MenuItem route="/technology" label="Technology" icon={Brain} />

				<div class="mt-auto">
					<div class="text-center">
						<p class="font-mono">{game.Time.date.format('YYYY')} - {game.Time.date.format('MM')} - {game.Time.date.format('DD')}</p>
						<div class="mx-auto my-2 mt-1 h-1 w-5/6 overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 via-sky-300 to-gray-900">
							<div
								class="h-full bg-transparent"
								style:width="{game.Time.dayProgress * 100}%"
								style:box-shadow="0 0 0 9999px rgb(0,0,0,{Math.min(game.Time.dayProgress * 2, 1) * 0.5})"
							></div>
						</div>

						<div class="py-2">
							<p class="pb-1 font-serif text-xs capitalize opacity-75">{season}</p>
							<!-- german seems to be the most aggressively hyphenated. works well for demonyms, might cause issues later, we'll see -->
							<p lang="de" class="hyphens-auto break-words font-serif text-sm">{game.CityDemonym} Era</p>
						</div>
					</div>

					<hr class="mx-auto my-4 w-1/2 border-t-zinc-500" />

					<MenuItem route="/options" label="Options" icon={Cog} />
				</div>
			</div>
		{/if}

		<!-- Page content -->
		<div class="h-full flex-grow overflow-y-auto px-6 py-8">
			<div class="h-full max-w-7xl">
				{@render children()}
			</div>
		</div>
	</div>
</div>
