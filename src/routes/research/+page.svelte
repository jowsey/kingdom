<script lang="ts">
	import cytoscape, { type NodeDataDefinition } from 'cytoscape';
	import dagre from 'cytoscape-dagre';
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	import { XIcon } from 'lucide-svelte';
	import { CityClass, GetCityClass } from '$lib/util/Util';
	import { game } from '$lib/game/Game.svelte';

	cytoscape.use(dagre);

	const Upgrades = {
		Categories: {
			Agriculture: 'Agriculture',
			Industry: 'Industry'
		},

		Plowing: 'Plowing',
		HeavyPlows: 'Heavy Plows',
		WheeledPlows: 'Wheeled Plows',
		CropRotation: 'Crop Rotation',
		ThreeFieldSystem: 'Three-Field System',
		RefinedCropRotation: 'Refined Crop Rotation',
		ExoticCrops: 'Exotic Crops',

		Smithing: 'Smithing',
		Steel: 'Steel',
		PlateArmour: 'Plate Armour',
		DurableTools: 'Durable Tools'
	};

	interface UpgradeNode extends NodeDataDefinition {
		id: string;
		unlocked?: boolean;
		requirements: string[];
		imageUrl?: string;
		isCategory?: boolean;
		description?: string;
	}

	const upgradeNodes: UpgradeNode[] = [
		{
			id: Upgrades.Categories.Agriculture,
			isCategory: true,
			unlocked: true,
			requirements: [],
			imageUrl: 'https://images.unsplash.com/photo-1529511582893-2d7e684dd128?w=512'
		},
		{
			id: Upgrades.Plowing,
			requirements: [Upgrades.Categories.Agriculture],
			imageUrl: 'https://placehold.co/100'
		},
		{
			id: Upgrades.HeavyPlows,
			requirements: [Upgrades.Plowing],
			imageUrl: 'https://placehold.co/200'
		},
		{
			id: Upgrades.WheeledPlows,
			requirements: [Upgrades.HeavyPlows],
			imageUrl: 'https://placehold.co/300'
		},
		{
			id: Upgrades.CropRotation,
			requirements: [Upgrades.Categories.Agriculture],
			imageUrl: 'https://placehold.co/400'
		},
		{
			id: Upgrades.RefinedCropRotation,
			requirements: [Upgrades.CropRotation],
			imageUrl: 'https://placehold.co/500'
		},
		{
			id: Upgrades.ThreeFieldSystem,
			requirements: [Upgrades.RefinedCropRotation],
			imageUrl: 'https://placehold.co/600'
		},
		{
			id: Upgrades.ExoticCrops,
			requirements: [Upgrades.WheeledPlows, Upgrades.ThreeFieldSystem],
			imageUrl: 'https://placehold.co/700'
		},
		{
			id: Upgrades.Categories.Industry,
			isCategory: true,
			requirements: [],
			imageUrl: 'https://images.unsplash.com/photo-1618232527909-bd5e6f62030e?&w=512'
		},
		{
			id: Upgrades.Smithing,
			requirements: [Upgrades.Categories.Industry],
			imageUrl: 'https://placehold.co/800',
			description: "Creating useful tools from metals and ores."
		},
		{
			id: Upgrades.Steel,
			requirements: [Upgrades.Smithing],
			imageUrl: 'https://placehold.co/900',
		},
		{
			id: Upgrades.PlateArmour,
			requirements: [Upgrades.Steel],
			imageUrl: 'https://placehold.co/1000'
		},
		{
			id: Upgrades.DurableTools,
			requirements: [Upgrades.Smithing],
			imageUrl: 'https://placehold.co/1100'
		}
	];

	const nodes: cytoscape.NodeDefinition[] = upgradeNodes.map((upgrade) => ({
		data: upgrade,
	}));

	const edges: cytoscape.EdgeDefinition[] = upgradeNodes.flatMap((upgrade) =>
		upgrade.requirements.map((req) => ({
			data: {
				id: `${req}-${upgrade.id}`,
				source: req,
				target: upgrade.id
			}
		}))
	);

	const elements = [...nodes, ...edges];

	let cyContainer: HTMLElement;

	let selectedNode: cytoscape.NodeSingular | null = $state(null);
	let popupPosition = $state({ x: 0, y: 0 });

	onMount(() => {
		const cy = cytoscape({
			container: cyContainer,
			elements: elements,

			style: [
				{
					selector: 'node',
					style: {
						'background-image': 'data(imageUrl)',
						'background-fit': 'cover',
						label: 'data(id)',
						color: '#fff',
						width: (ele: cytoscape.NodeSingular) => (ele.data('isCategory') ? 128 : 64),
						height: (ele: cytoscape.NodeSingular) => (ele.data('isCategory') ? 128 : 64),

						'font-size': (ele: cytoscape.NodeSingular) => (ele.data('isCategory') ? 20 : 16),
						'text-margin-y': 12,
						'text-valign': 'bottom',
						'font-family': (ele: cytoscape.NodeSingular) => (ele.data('isCategory') ? 'Playfair Display' : 'Cabin'),
						'font-weight': (ele: cytoscape.NodeSingular) => (ele.data('isCategory') ? 400 : 500)
					}
				},
				{
					selector: 'node:active, edge:active',
					style: {
						// prevents black box on click https://js.cytoscape.org/#style/overlay
						'overlay-opacity': 0
					}
				},
				{
					selector: 'edge',
					style: {
						width: 3,
						//@ts-expect-error types dont include this for some reason but it works
						'curve-style': 'round-taxi',
						'target-arrow-shape': 'triangle',
						'line-color': '#ccc',
						'target-arrow-color': '#ccc'
					}
				}
			],

			layout: {
				name: 'dagre',
				//@ts-expect-error added by dagre but it's not type safe
				rankDir: 'LR',
				padding: 64,
				spacingFactor: 1.5
			},
			autoungrabify: true,
			zoom: 2
		});

		// hack for cursor: pointer
		cy.on('mouseover', 'node', (event) => {
			event.cy.container()!.style.cursor = 'pointer';
		});

		cy.on('mouseout', 'node', (event) => {
			event.cy.container()!.style.cursor = 'default';
		});

		// keep tooltip aligned with moving node
		cy.on('pan', () => {
			if (selectedNode !== null) {
				popupPosition = {
					x: selectedNode.renderedPosition().x,
					y: selectedNode.renderedPosition().y
				};
			}
		});

		cy.on('tap', 'node', (event) => {
			const node: cytoscape.NodeSingular = event.target;
			const data: UpgradeNode = node.data();

			if (data.isCategory) return;

			selectedNode = node;
			popupPosition = {
				x: node.renderedPosition().x,
				y: node.renderedPosition().y
			};
		});

		cy.on('tap', (event) => {
			if (event.target === cy) {
				selectedNode = null;
			}
		});

		return () => {
			cy.destroy();
		};
	});

	let flavorText = $derived.by(() => {
		const cityClass = GetCityClass(game.TotalPopulation);

		// todo maybe make these based on something other than population (num. upgrades unlocked?)
		switch (cityClass) {
			case CityClass.Hamlet:
				return 'There must be a better way...';
			case CityClass.QuietVillage:
				return 'New techniques may help us survive.';
			case CityClass.GrowingVillage:
				return 'New ideas begin to emerge.';
			case CityClass.BuddingTown:
				return 'We must find new ways to provide for all.';
			case CityClass.BustlingTown:
				return 'The path to progress is clear.';
			case CityClass.ThrivingTown:
				return 'We have come far, but there is still much to do.';
			case CityClass.NascentCity:
				return 'Simple ideas can lead to great discoveries.';
			case CityClass.ProminentCity:
				return 'The future is bright.';
			case CityClass.RenownedCity:
				return 'Vast foundations have been laid.';
			case CityClass.Metropolis:
				return 'Through knowledge, we prosper.';
			case CityClass.GrandMetropolis:
				return 'We stand on the shoulders of giants.';
			case CityClass.Capital:
				return 'The future is ours.';
		}
	});
</script>

<p class="font-serif text-2xl">{flavorText}</p>

<div bind:this={cyContainer} class="w-xl h-full"></div>

{#if selectedNode}
	<div
		transition:blur={{ duration: 100 }}
		class="absolute w-96 origin-top-left rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-2 shadow-md"
		style="top: {popupPosition.y}px; left: {popupPosition.x}px"
	>
		<div class="flex justify-between align-baseline">
			<p class="text-lg font-bold">{selectedNode.data().id}</p>
			<button onclick={() => (selectedNode = null)} class="self-end hover:text-red-500 transition-colors">
				<XIcon />
			</button>
		</div>
		<hr class="my-2 border-zinc-600" />

		<p>{selectedNode.data().description}</p>
	</div>
{/if}
