<script lang="ts">
	let { ...props }: Record<string, unknown> = $props();
</script>

<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" {...props}>
	<circle cx="12" cy="12" r="11" />
	<path d="M12 7l3 3a4.25 4.25 0 1 1-6 0z" />
</svg>
