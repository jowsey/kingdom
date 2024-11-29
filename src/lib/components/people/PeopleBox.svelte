<script lang="ts">
	interface Props {
		name: string;
		population: number;
		description: string;
	}

	let { name, population, description }: Props = $props();
</script>

<div class="flex flex-col">
	<div class="rounded-lg border border-zinc-500/25 bg-zinc-800/25 p-4 backdrop-blur-sm">
		<div class="mb-2 flex items-baseline justify-between">
			<p class="font-serif text-lg">{name}</p>
			<p class="text-sm">{population} pop.</p>
		</div>

		<p class="text-zinc-500">{description}</p>
	</div>
</div>
