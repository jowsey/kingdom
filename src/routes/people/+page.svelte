<script lang="ts">
	import { kingdomState } from '$lib/state.svelte';
</script>

<p class="font-serif text-2xl">The people of {kingdomState.name} are content.</p>
<p class="text-xl">Population: {kingdomState.people.population}</p>
