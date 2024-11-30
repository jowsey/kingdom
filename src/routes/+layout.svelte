<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { game } from '$lib/game/Game.svelte';
	import { GenerateDemonym } from '$lib/util/Demonym.js';
	import MenuItem from '$lib/components/MenuItem.svelte';
	import { ExternalLink, Brain, Castle, Cog, Handshake, PersonStanding } from 'lucide-svelte';
	import { TopBarTexts } from '$lib/TopBarTexts';

	let { children } = $props();

	let topText = $state('"funny" text here');

	onMount(() => {
		game.RunLoop();

		let lastIndex = -1;
		let topBarInterval = setInterval(() => {
			let index = 0;
			do {
				index = Math.floor(Math.random() * TopBarTexts.length);
			} while (index === lastIndex);

			topText = TopBarTexts[index];
			lastIndex = index;
		}, 30_000);

		return () => {
			game.StopLoop();
			clearInterval(topBarInterval);
		};
	});
</script>

<svelte:head>
	<title>kingdom: {game.KingdomState.name}</title>
</svelte:head>

<div class="flex h-screen select-none flex-col bg-tile text-white">
	<div
		id="topbar"
		class="flex h-6 w-full items-center justify-between gap-x-8 border-b border-zinc-800 bg-black/25 px-8 font-mono text-sm"
	>
		<div class="gap-x-8">
			<a target="_blank" href="https://tom.cafe">
				https://tom.cafe
				<ExternalLink class="h-4" />
			</a>
		</div>
		<p class="opacity-50" title={`#${TopBarTexts.indexOf(topText) + 1}`}>{topText}</p>
	</div>

	<div class="flex flex-grow">
		<div
			class="m-4 flex w-48 flex-col rounded-md border border-zinc-500/75 bg-gradient-to-tl from-zinc-700/25 to-zinc-800/25 px-3 py-4 backdrop-blur-sm"
		>
			<div class="flex items-baseline justify-between gap-x-2 px-1">
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
				<p class="text-center">
					{game.DateState.format('YYYY')} - {game.DateState.month()} - {game.DateState.date()}<br />
					<span class="text-sm">{GenerateDemonym(game.KingdomState.name)} Era</span>
				</p>

				<hr class="mx-auto my-4 w-1/2 border-t-zinc-500" />

				<MenuItem route="/options" label="Options" icon={Cog} />
			</div>
		</div>
		<div class="container h-full flex-grow overflow-auto px-6 py-8">
			{@render children()}
		</div>
	</div>
</div>

<style lang="postcss">
	#topbar * {
		@apply flex items-center;
	}

	#topbar a {
		@apply text-blue-300;
	}
</style>
