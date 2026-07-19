<script lang="ts">
	let { ...props }: Record<string, unknown> = $props();
</script>

<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" {...props}>
	<circle cx="12" cy="12" r="11" />
	<line x1="2" y1="16" x2="22" y2="16"/>
	<line x1="12" y1="15" x2="16" y2="8"/>
</svg>
