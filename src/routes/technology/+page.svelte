<script lang="ts">
	import cytoscape from 'cytoscape';
	import dagre from 'cytoscape-dagre';
	import { onMount } from 'svelte';

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

	interface UpgradeNode {
		id: string;
		unlocked?: boolean;
		requirements: string[];
		imageUrl?: string;
		isCategory?: boolean;
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
			imageUrl: 'https://placehold.co/800'
		},
		{
			id: Upgrades.Steel,
			requirements: [Upgrades.Smithing],
			imageUrl: 'https://placehold.co/900'
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

	function prepareCytoscapeData(upgrades: UpgradeNode[]) {
		const nodes = upgrades.map((upgrade) => ({
			data: upgrade
		}));

		const edges = upgrades.flatMap((upgrade) =>
			upgrade.requirements.map((reqId) => ({
				data: {
					id: `${reqId}-${upgrade.id}`, // Unique ID for each edge
					source: reqId,
					target: upgrade.id
				}
			}))
		);

		return { nodes, edges };
	}

	const { nodes, edges } = prepareCytoscapeData(upgradeNodes);
	const elements = [...nodes, ...edges];

	let cyContainer: HTMLElement;

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
						height: (ele: cytoscape.NodeSingular) => (ele.data('isCategory') ? 128 : 64)
					}
				},
				{
					selector: 'labels',
					style: {
						'font-size': (ele: cytoscape.EdgeSingular) => (ele.data('isCategory') ? 20 : 16),
						'text-margin-y': 8,
						'text-valign': 'bottom',
						'font-family': 'Cabin'
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
			wheelSensitivity: 0.1,
			zoom: 2
		});

		cy.on('tap', 'node', (event) => {
			const node = event.target;
			const data: UpgradeNode = node.data();

			if (data.unlocked) {
				console.log(`Upgrading ${data.id}`);
			} else {
				console.log(`Unlocking ${data.id}`);
				data.unlocked = true;
			}
		});

		return () => {
			cy.destroy();
		};
	});
</script>

<p class="font-serif text-2xl">The court scholars are eager to study.</p>

<div bind:this={cyContainer} class="w-xl h-full"></div>
