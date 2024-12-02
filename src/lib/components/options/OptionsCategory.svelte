<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		title: string;
	}

	let { children, title }: Props = $props();
</script>

<div class="my-8 border-l border-zinc-500/25 pl-4">
	<p class="pb-2 text-xl font-medium">{title}</p>
	{@render children?.()}
</div>
