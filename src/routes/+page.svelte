<script lang="ts">
	import { game } from '$lib/game/Game.svelte';
	import AutoDualColumn from '$lib/components/options/AutoDualColumn.svelte';
	import StyledInput from '$lib/components/options/StyledInput.svelte';
	import dayjs from 'dayjs';

	const areas = [
		{
			name: 'Plains',
			image: '/Plains.png',
			description: 'Wide, open fields; the perfect spot for a new settlement.',
			inText: 'in the Plains'
		},
		{
			name: 'River',
			image: '/River.png',
			description: 'Flows rich with opportunity for farming and trade.',
			inText: 'on the River'
		},
		{
			name: 'Desert',
			image: '/Desert.png',
			description: 'Arid climate with few natural resources.',
			inText: 'in the Desert'
		},
		{
			name: 'Coastal',
			image: '/Coastal.png',
			description: 'An idyllic beach with direct connections to the sea.',
			inText: 'on the Coast'
		}
	];

	let cityName = $state('');
	let selectedArea = $state(-1);
	let readyToBegin = $derived(cityName.length > 0 && selectedArea >= 0);
</script>

{#if !game.HasSettled}
	<p class="font-serif text-2xl">Steward, it's time to settle a new land.</p>

	<div class="my-4 max-w-lg">
		<AutoDualColumn>
			<StyledInput
				id="cityName"
				label="Choose a name for your settlement"
				type="text"
				placeholder="Unnamed City"
				bind:value={cityName}
				onfocusout={() => (cityName = cityName.trim())}
			/>
		</AutoDualColumn>
	</div>

	<p>Choose an area to settle</p>
	<div class="my-4 flex w-full flex-wrap gap-8">
		{#each areas as area, i}
			<button
				class:saturate-50={selectedArea !== i}
				class:shadow-xl={selectedArea === i}
				class:scale-105={selectedArea === i}
				onclick={() => (selectedArea = i)}
				style="background-image: url('{area.image}')"
				title={`${area.name}\n${area.description}`}
				class="flex aspect-square h-56 rounded-lg border-2 border-white bg-contain text-left text-sm transition-all hover:scale-110 lg:h-64"
			>
				<span class="flex h-full flex-col justify-between p-2 drop-shadow-md">
					<span class="font-serif text-2xl font-bold">{area.name}</span>
					<br />
					<span class="drop-shadow-md">{area.description}</span>
				</span>
			</button>
		{/each}
	</div>

	<button
		disabled={!readyToBegin}
		class:opacity-50={!readyToBegin}
		class="mt-8 rounded-md border p-2 font-serif transition-all hover:-translate-y-0.5 hover:shadow-lg"
		onclick={() => {
			game.City.name = cityName;
			game.City.area = selectedArea;
			game.Time.date = dayjs().year(1).month(0).date(1);
			game.RunLoop();
		}}
	>
		{#if readyToBegin}
			Form the settlement of {cityName} {areas[selectedArea].inText}
		{:else}
			Choose a name and place to settle above
		{/if}
	</button>
{:else}
	<p class="font-serif text-2xl">A new settlement called {game.City.name} is formed.</p>
{/if}
