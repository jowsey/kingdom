<script lang="ts">
	import { type Icon } from 'lucide-svelte';

	interface Props {
		icon?: typeof Icon;
		name: string;
		population: number;
		description: string;
	}

	let { icon, name, population, description }: Props = $props();
</script>

<div class="rounded-lg border border-zinc-500/25 bg-zinc-800/25 p-4 backdrop-blur-sm">
	<div class="mb-2 flex items-baseline justify-between">
		<div class="flex items-center gap-x-2">
			{#if icon}
				{@const Icon = icon}
				<Icon class="h-4 w-4" />
			{/if}
			<p class="font-serif text-lg">{name}</p>
		</div>
		<p class="text-sm">{population.toLocaleString()} pop.</p>
	</div>

	<p class="text-zinc-500">{description}</p>
</div>
