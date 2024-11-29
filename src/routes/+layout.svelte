<script lang="ts">
	import '../app.css';
	import { Castle, Cog } from 'lucide-svelte';

	let { children } = $props();
	import MenuItem from '$lib/components/MenuItem.svelte';
</script>

<head>
	<title>kingdom</title>
</head>

<div class="flex h-screen flex-row bg-tile text-white">
	<div
		class="m-4 flex w-48 flex-col rounded-md border border-zinc-500/75 bg-gradient-to-tl from-zinc-700/25 to-zinc-800/25 px-3 py-4 backdrop-blur-sm"
	>
		<div class="flex flex-row items-baseline justify-between">
			<a href="/" class="font-serif text-2xl transition-all hover:text-orange-300 active:translate-y-0.5">kingdom</a>
			<p class="rounded-lg border border-zinc-600 px-2 text-xs" title={__COMMIT__}>
				v{__VERSION__}
			</p>
		</div>

		<hr class="my-4 border-t-zinc-500" />

		<MenuItem route="/" label="Kingdom">
			<Castle class="transition-all group-hover:scale-110" />
		</MenuItem>

		<div class="mt-auto">
			<MenuItem route="/options" label="Options">
				<Cog class="transition-all group-hover:rotate-45" />
			</MenuItem>
		</div>
	</div>
	<div class="h-full flex-grow overflow-auto px-6 py-8">
		{@render children()}
	</div>
</div>