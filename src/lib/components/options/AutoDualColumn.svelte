<script lang="ts">
	let { children } = $props();
</script>

<div class="grid grid-cols-1 items-baseline gap-x-4 sm:grid-cols-[max-content_1fr]">
	{@render children?.()}
</div>
