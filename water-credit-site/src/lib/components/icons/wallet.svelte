<script lang="ts">
	let { ...props }: Record<string, unknown> = $props();
</script>

<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" {...props}>
	<rect x="1" y="4" width="22" height="16" rx="2" />
	<line x1="1" y1="8" x2="23" y2="8" />
	<path d="M1 12H8a4 4 0 0 0 8 0h7" />
</svg>
