<script lang="ts">
	interface Props {
		placeholder?: string;
		label?: string;
		id?: string;
		type?: 'text' | 'number';
		value: string | number;
		maxLength?: number;
		onfocusout?: () => void;
	}

	let { placeholder, label, id, value = $bindable(), maxLength: maxlength = 24, onfocusout, type = 'text' }: Props = $props();
</script>

<label for={id} class="w-fit">
	{label}
</label>

<input
	{placeholder}
	{type}
	{maxlength}
	{id}
	{onfocusout}
	bind:value
	class="min-w-32 border-b border-zinc-500/75 bg-transparent p-2 font-serif outline-none"
	autocomplete="off"
	spellcheck="false"
/>
