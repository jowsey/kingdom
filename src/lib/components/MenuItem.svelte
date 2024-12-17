<script lang="ts">
	import { page } from '$app/state';
	import { type Icon } from 'lucide-svelte';

	interface Props {
		route: string;
		label: string;
		icon?: typeof Icon;
	}

	let { route, label, icon }: Props = $props();
	let active = $derived(page.url.pathname === route);
</script>

<a
	href={route}
	class="group mb-2 flex w-full gap-x-3 rounded-xl border border-zinc-500 border-opacity-0 bg-black bg-opacity-0 px-2.5 py-2 transition-all hover:bg-opacity-25 active:translate-y-0.5"
	class:text-black={active}
	class:!bg-white={active}
>
	{#if icon}
		{@const Icon = icon}
		<Icon class="transition-transform group-hover:-rotate-6" />
	{/if}
	<p>{label}</p>
</a>
