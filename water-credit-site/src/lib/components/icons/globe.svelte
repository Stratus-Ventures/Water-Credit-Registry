<script lang="ts">
	let { ...props }: Record<string, unknown> = $props();
</script>

<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" {...props}>
	<ellipse
		cx="12"
		cy="12"
		rx="11"
		ry="10.75"
	/>
	<ellipse
		cx="12"
		cy="12"
		rx="4.5"
		ry="10.65"
	/>
	<line
		x1="1"
		y1="12"
		x2="23"
		y2="12"
	/>
</svg>
