<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';

	interface Props {
		children: Snippet;
		route: string;
		label: string;
	}

	let { children, route, label }: Props = $props();
	let active = $derived($page.url.pathname === route);
</script>

<a
	href={route}
	class={`group flex w-full gap-x-3 rounded-xl border border-zinc-500 border-opacity-0 bg-black bg-opacity-0 px-2.5 py-2 transition-all duration-75 hover:bg-opacity-25 active:translate-y-0.5 ${active ? '!bg-white text-black' : ''}`}
>
	{@render children?.()}
	<p>{label}</p>
</a>
