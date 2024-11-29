<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		label: string;
	}

	let { children, label }: Props = $props();
</script>

<div class="my-4 border-l border-zinc-500/25 pl-4">
	<p class="text-xl font-medium">{label}</p>
	{@render children?.()}
</div>
