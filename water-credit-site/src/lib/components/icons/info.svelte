<script lang="ts">
	let { ...props }: Record<string, unknown> = $props();
</script>

<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" {...props}>
	<circle cx="12" cy="12" r="11" />
	<line x1="12" y1="11" x2="12" y2="17" />
	<line x1="12" y1="7.5" x2="12" y2="7.5" />
</svg>
